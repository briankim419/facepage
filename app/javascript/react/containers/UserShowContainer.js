import React, { Component } from 'react'
import UserShowTile from '../components/UserShowTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followers: [],
      followeds: [],
      followersLength: "",
      followedsLength: "",
      firstName: "",
      lastName: "",
      email: "",
      currentUserId: "",
      currentUser: [],
      following: null
    }
    this.toggleFollow = this.toggleFollow.bind(this)
    this.addFollower = this.addFollower.bind(this)
    this.deleteFollower = this.deleteFollower.bind(this)
  }

  componentDidMount() {
    let userId = this.props.params.id
    fetch(`/api/v1/users/${userId}`,
    {
      credentials: 'same-origin',
    })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          followers: data.followers,
          followeds: data.followeds,
          followersLength: data.followers.length,
          followedsLength: data.followeds.length,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          currentUserId: data.current_user.id,
          currentUser: data.current_user
         })

        if(JSON.stringify(data.followers).includes(JSON.stringify(data.current_user))) {
          this.setState({following: true})
        } else {
          this.setState({following: false})
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  addFollower(follower) {
    follower.followedId = this.props.params.id
    fetch(`/api/v1/users`, {
      method: 'POST',
      body: JSON.stringify(follower),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
     })
     .then(response => {
      if (response.ok) {
        return response
      }
      else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
     })
     .then(response => response.json())
     .then(body => {
       this.setState({followersLength: body.followers.length})
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  deleteFollower() {
    fetch(`/api/v1/users/${this.props.params.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
     })
     .then(response => {
      if (response.ok) {
        return response
      }
      else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
     })
     .then(response => response.json())
     .then(body => {
       let length = body.followers.length
       this.setState({followersLength: length})
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  toggleFollow() {
    let following = this.state.following
    if(this.state.following == false) {
      this.addFollower(this.state.currentUser)
    } else {
      this.deleteFollower()
    }
    this.setState({following: !following})
  }

  render() {
    return(
      <div>
        <div className="grid-x">
          <UserShowTile
            followers={this.state.followers}
            followeds={this.state.followeds}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            followersLength={this.state.followersLength}
            followedsLength={this.state.followedsLength}
            currentUserId={this.state.currentUserId}
            following={this.state.following}
            toggleFollow={this.toggleFollow}
          />
        </div>
      </div>
      )
  }
}

export default UserShowContainer
