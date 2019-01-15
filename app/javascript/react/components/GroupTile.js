import React from 'react';
import { Link } from 'react-router';

const GroupTile = props => {
  return(
    <div className="group-tile small-8 row devise">
      <Link to={`/groups/${props.id}`}><h3>{props.name}</h3></Link>
    </div>
  )
}

export default GroupTile;
