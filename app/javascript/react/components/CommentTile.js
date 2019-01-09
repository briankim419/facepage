import React from 'react';
import { Link } from 'react-router'

const CommentTile = props => {
  return(
    <div>
      <p>{props.text}</p>
    </div>
  )
}

export default CommentTile;
