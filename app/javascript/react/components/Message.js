import React from 'react';

const Message = ({message , firstName}) => {
  return(
    <p className="tile chat-text">
      <strong>{firstName}: </strong>
      {message}
    </p>
  );
};

export default Message;
