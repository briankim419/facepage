import React, { Component } from 'react';
import swal from 'sweetalert';

class GroupFormContainer extends Component {
  constructor(props) {
   super(props);
   this.state = {
     selected_follower_id: null,
     followers: this.props.followers,
     chatName: ""
    }

   this.handleSubmit = this.handleSubmit.bind(this)
   this.handleOnChange = this.handleOnChange.bind(this)
   this.handleChange = this.handleChange.bind(this)
  }

  handleOnChange(event) {
    this.setState({ selected_follower_id: event.target.value });
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()

    let formPayLoad = {
      selected_follower_id: this.state.selected_follower_id,
      name: this.state.chatName
    }
    if(this.state.selected_follower_id != null) {
      this.props.makeChat(formPayLoad)
      this.setState({
        selected_follower_id: "",
        chatName: ""
      })
    } else {
      swal('Please select a friend!')
    }
  }

 render() {
   let followers = this.props.followers.map((follower) => {
     return(
       <option key={follower.id} value={follower.id}>{follower.first_name} {follower.last_name}</option>
     )
   })

   return (
     <div className="small-10-centered row devise group-form">
       <form onSubmit={this.handleSubmit}>
        <label>
          Select a follower to create a chat:
          <select onChange={this.handleChange} name='selected_follower_id'>
            <option value="">Choose a Follower</option>
            {followers}
          </select>
        </label>
        <label>
          Chat Name
        </label>
        <input name='chatName' type='text' value={this.state.body} onChange={this.handleChange} />
        <input className="button group-form-button" type="submit" value="Submit" />
        <h3>Chat Groups:</h3>
       </form>
     </div>
   );
 }
}

export default GroupFormContainer
