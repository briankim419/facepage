import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import HomeTile from '../components/HomeTile';
import PostFormContainer from '../containers/PostFormContainer'
import PostIndexContainer from '../containers/PostIndexContainer'
import ChatContainer from '../containers/ChatContainer';



export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomeTile} />
      <Route path='/posts' component={PostIndexContainer} />
      <Route path='/posts/new' component={PostFormContainer} />
      <Route path="chats/:id" component={ChatContainer}/>
    </Router>
  );
}


export default App
