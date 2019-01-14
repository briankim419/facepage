import React from 'react';
import { Link } from 'react-router';

const GroupTile = props => {
  return(
    <div>
      <Link to={`/groups/${props.id}`}><h1>{props.name}</h1></Link>
    </div>
  )
}

export default GroupTile;
