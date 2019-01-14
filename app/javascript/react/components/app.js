import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import HomeTile from '../components/HomeTile';
import PostFormContainer from '../containers/PostFormContainer';
import PostIndexContainer from '../containers/PostIndexContainer';
import UserShowContainer from '../containers/UserShowContainer';
import ChatContainer from '../containers/ChatContainer';
import GroupShowContainer from '../containers/GroupShowContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PostIndexContainer} />
      <Route path='posts' component={PostIndexContainer} />
      <Route path='posts/new' component={PostFormContainer} />
      <Route path='users/:id' component={UserShowContainer} />
      <Route path='groups/:id' component={GroupShowContainer} />
    </Router>
  );
}


export default App
