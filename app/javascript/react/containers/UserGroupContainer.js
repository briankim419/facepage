import React, { Component } from 'react'
import { Link } from 'react-router'
import UserGroupFormContainer from '../containers/UserGroupFormContainer'

class UserGroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      isHidden: true,
      followers: []
    }
    this.addMembers = this.addMembers.bind(this)
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.props.currentUserId}`,
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
        this.setState( {
          followers: data.followers
         } )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  addMembers(formPayLoad) {
   fetch(`/api/v1/usergroups`, {
     method: 'POST',
     body: JSON.stringify(formPayLoad),
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
     let newMembers = this.state.members.concat(body)
     this.setState( {
       members: newMembers,
      } )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let members = this.state.members.map((member) => {
      return(
        <li key={member.id}> {member.first_name} {member.last_name}</li>
      )
    })

    return(
      <div className="tile cell small-10 small-offset-1 medium-8 medium-offset-2 large-6 large-offset-3">
        <div className="callout">
          <div>
            <h5>members: </h5>
            <ul>
              {members}
            </ul>
          </div>
          <button className="panel" onClick={this.toggleHidden.bind(this)}>
            <span> Invite a Friend</span>
          </button>
            {!this.state.isHidden &&
              <UserGroupFormContainer
                addMembers={this.addMembers}
                followers={this.state.followers}
                userGroupId={this.props.userGroupId}
              />}

        </div>
      </div>
      )
  }
}

export default UserGroupContainer
