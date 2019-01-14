import React, { Component } from 'react';
import ChatContainer from '../containers/ChatContainer';

class GroupShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/groups/${this.props.params.id}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ body:body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>
        <ChatContainer
          id={this.props.params.id}
         />
      </div>
    );
  }
}

export default GroupShowContainer;
