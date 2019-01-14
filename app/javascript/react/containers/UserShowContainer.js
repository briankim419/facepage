import React, { Component } from 'react';
import UserShowTile from '../components/UserShowTile';
import GroupFormContainer from '../containers/GroupFormContainer';
import GroupTile from '../components/GroupTile';

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
      following: null,
      groups: []
    }
    this.toggleFollow = this.toggleFollow.bind(this)
    this.addFollower = this.addFollower.bind(this)
    this.deleteFollower = this.deleteFollower.bind(this)
    this.makeChat = this.makeChat.bind(this)
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
          followers: data.user.followers,
          followeds: data.user.followeds,
          followersLength: data.user.followers.length,
          followedsLength: data.user.followeds.length,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
          currentUserId: data.user.current_user.id,
          currentUser: data.user.current_user,
          groups: data.user.groups
         })

        if(JSON.stringify(data.user.followers).includes(JSON.stringify(data.user.current_user))) {
          this.setState({following: true})
        } else {
          this.setState({following: false})
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
  makeChat(follower) {
    follower.followedId = this.props.params.id
    fetch(`/api/v1/groups`, {
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
    let all_groups
    let group_form

    if(this.state.currentUser.id == this.props.params.id){
    group_form =
      <GroupFormContainer
        followers={this.state.followers}
        currentUserId={this.state.currentUserId}
        makeChat={this.makeChat}
      />
    all_groups = this.state.groups.map(group => {
      return(
        <GroupTile
          key={group.id}
          id={group.id}
          name={group.name}
        />
      )
    })};
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
        {group_form}
        {all_groups}
        </div>
      </div>
      )
  }
}

export default UserShowContainer
