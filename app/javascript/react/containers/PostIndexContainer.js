import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import PostContainer from '../containers/PostContainer';
import PostFormContainer from '../containers/PostFormContainer';

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
        this.setState({posts:body.posts});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewPost(postPayload) {
    let newPosts
    let fixPayload
    if(postPayload.post_photo != undefined){
      fixPayload = {body: postPayload.body, post_photo: {url: postPayload.post_photo.preview}}
      newPosts = this.state.posts.concat(fixPayload)
      this.setState({ posts: newPosts })
    } else {
      fixPayload = {body: postPayload.body, post_photo: {url: ""}}
      newPosts = this.state.posts.concat(fixPayload)
      this.setState({ posts: newPosts })
    }
  }

  render(){
    let postx = this.state.posts.reverse()
    let all_posts = postx.map(post => {
      return(
        <PostContainer
          key={post.id}
          id={post.id}
          body={post.body}
          photo={post.post_photo.url}
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
