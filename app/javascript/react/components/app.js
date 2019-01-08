import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import HomeTile from '../components/HomeTile';
import PostFormContainer from '../containers/PostFormContainer'



export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomeTile} />
      <Route path='/posts/new' component={PostFormContainer} />
    </Router>
  );
}


export default App
