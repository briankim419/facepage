import React from 'react'

const PastMessagesTile = (props) => {

  let pastMessages
  if(props.pastMessage != [] ) {
    pastMessages = props.pastMessages.map((message) => {
      return(
        <p key={message.id} className="tile chat-text">
          <strong>{message.user.first_name}: </strong>
          {message.body}
        </p>
      )
    })
  }

  return(
    <div> {pastMessages} </div>
  );
};

export default PastMessagesTile
