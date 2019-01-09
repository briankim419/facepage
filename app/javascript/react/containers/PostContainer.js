import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import CommentFormContainer from '../containers/CommentFormContainer'
import CommentTile from '../components/CommentTile'

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
    this.addNewReview = this.addNewReview.bind(this);
  }
  componentDidMount() {
    fetch(`/api/v1/posts/${this.props.id}/comments`)
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
        this.setState({ comments:body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  addNewReview(commentPayload) {
   let newComments = this.state.comments.concat(commentPayload)
   this.setState({ comments: newComments })
  }

  render(){
    let all_comments = this.state.comments.map(comment => {
      return(
        <CommentTile
          key={comment.id}
          id={comment.id}
          text={comment.text}
        />
      )
    });
    return(
      <div>
        <h1>{this.props.body}</h1>
        {all_comments}
        <CommentFormContainer
          key={this.props.id}
          id={this.props.id}
          addNewReview={this.addNewReview}
        />
      </div>
    );
  }
};

export default PostContainer
