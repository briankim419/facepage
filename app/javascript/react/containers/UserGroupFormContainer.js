import React, { Component } from 'react'
import swal from 'sweetalert';

class UserGroupFormContainer extends Component {
  constructor(props) {
   super(props);
   this.state = {
     user: "",
     followers: this.props.followers
    }

   this.handleSubmit = this.handleSubmit.bind(this)
   this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(event) {
    this.setState({ user: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()

    let formPayLoad = { user: {
      user: this.state.user,
      tripId: this.props.tripId
    }}

    if(this.state.user.trim() != "") {
      this.props.addMembers(formPayLoad)
      this.setState({
        user: ""
      })
    } else {
      swal('Please select a friend!')
    }
  }

 render() {
   let followers = this.state.followers.map((follower) => {
     return(
       <option key={follower.id} value={follower.email}>{follower.first_name} {follower.last_name}</option>
     )
   })

   return (
     <div className="tile cell">
       <form onSubmit={this.handleSubmit}>
        <label>
          Select a friend:
          <select value={this.state.value} onChange={this.handleOnChange}>
            <option value="">Choose a Friend</option>
            {followers}
          </select>
        </label>
        <input type="submit" value="Submit" />
       </form>
     </div>
   );
 }
}

export default UserGroupFormContainer
