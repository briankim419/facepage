import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import PostContainer from '../containers/PostContainer'
import PostFormContainer from '../containers/PostFormContainer'

class PostIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.addNewPost = this.addNewPost.bind(this)
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

  addNewPost(postPayload) {
    debugger;
   let newPosts = this.state.posts.concat(postPayload)
   debugger;
   this.setState({ posts: newPosts })
  }

  render(){
    let postx = this.state.posts
    let all_posts = postx.map(post => {
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
        <PostFormContainer
          addNewPost={this.addNewPost}
        />
        {all_posts}
      </div>
    );
  }
};

export default PostIndexContainer
