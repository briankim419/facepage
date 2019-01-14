import React from 'react';

const Message = ({message , firstName}) => {
  return(
    <p>
      <strong>{firstName}: </strong>
      {message}
    </p>
  );
};

export default Message;
