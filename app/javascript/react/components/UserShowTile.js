import React from 'react';
import { Link } from 'react-router';

 const UserShowTile = (props) => {
   let followers = props.followersLength
   let followersTitle = "Followers: "
   let followeds = props.followedsLength
   let followedsTitle = "Following: "
   let button

   if(props.following == null) {
     button
   } else if(props.following == false) {
     button = <button onClick={props.toggleFollow} className="panel cell small-4 follow-button"> Follow </button>
   } else {
     button = <button onClick={props.toggleFollow} className="panel cell small-4 follow-button"> Unfollow </button>
   }
  return(
    <div>
      <div className="small-6 row devise user-show">
        <span> {followersTitle} {followers} | {followedsTitle} {followeds} </span>
        <h1>{props.firstName} {props.lastName}</h1>
        <p>email: {props.email}</p>
        {button}
      </div>
    </div>
  )
}

export default UserShowTile
