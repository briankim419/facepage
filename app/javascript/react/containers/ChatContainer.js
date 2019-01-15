import React, { Component } from 'react';
import Message from '../components/Message';
import TextFieldWithSubmit from '../components/TextFieldWithSubmit';
import PastMessagesTile from '../components/PastMessagesTile';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      messages: [],
      message: '',
      pastMessages: []
    }

    this.handleMessageReceipt = this.handleMessageReceipt.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.getPastMessages = this.getPastMessages.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/groups/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      this.setState({user: data.current_user_id})
    })
    App.chatChannel = App.cable.subscriptions.create(
      // Info that is sent to the subscribed method
      {
        channel: "ChatChannel",
        chat_id: this.props.id
      },
      {
        connected: () => console.log("ChatChannel connected"),
        disconnected: () => console.log("ChatChannel disconnected"),
        received: data => {
          // Data broadcasted from the chat channel
          console.log(data)
          this.handleMessageReceipt(data)
        }
      }
    );
  }

  handleMessageReceipt(message) {
    this.setState({ messages: this.state.messages.concat(message) })
  }

  handleClearForm() {
    this.setState({ message: '' })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let prepMessage = this.state.message
    let user_info = this.state.user

    // Send info to the receive method on the back end
    App.chatChannel.send({
     message: prepMessage,
     user: user_info
    })

    this.handleClearForm();
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  getPastMessages() {
  let chatId = this.props.id
  fetch(`/api/v1/messages/${chatId}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    this.setState({pastMessages: data.messages})
  })
}

  render() {
    let messages = this.state.messages.map(message => {
      return(
        <Message
          key={message.messageId}
          message={message.message}
          firstName={message.user.first_name}
        />
      )
    }, this);

    return(
      <div className="tile cell small-10 small-offset-1 medium-6 medium-offset-3 chat-room">
      <input className="button post-button" type="submit" value="View Past Messages" onClick={this.getPastMessages} />
        <PastMessagesTile
          getPastMessages={this.getPastMessages}
          pastMessages={this.state.pastMessages}
        />
        {messages}
        <form onSubmit={this.handleFormSubmit}>
          <TextFieldWithSubmit
            content={this.state.message}
            name='message'
            handlerFunction={this.handleMessageChange}
          />
        </form>
      </div>
    );
  }
}

export default ChatContainer;
