import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import PostContainer from '../containers/PostContainer'

class PostIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    fetch(`/api/v1/posts`)
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
        let temp = body
        this.setState({posts:temp.posts});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render(){
    let all_posts = this.state.posts.map(post => {
      return(
        <PostContainer
          key={post.id}
          id={post.id}
          body={post.body}
        />
      )
    });
    return(
      <div>
        {all_posts}
      </div>
    );
  }
};

export default PostIndexContainer
