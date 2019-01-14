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
     button = <button onClick={props.toggleFollow} className="panel cell small-10 medium-12 large-12"> Follow </button>
   } else {
     button = <button onClick={props.toggleFollow} className="panel cell small-10 medium-12 large-12"> Unfollow </button>
   }
  return(
    <div className="tile cell small-10 small-offset-1 large-6 large-offset-3">
      <div className="callout">
        <div>
          <div className="right">
            <div className="grid-x">
              {button}
            </div>
            <span className="text-right"> {followersTitle} {followers} | {followedsTitle} {followeds} </span>
          </div>
          <br/>
          <br/>
          <br/>
          <h1> {props.firstName} {props.lastName}</h1>
          <p> email: {props.email} </p>
        </div>
      </div>
    </div>
  )
}

export default UserShowTile
