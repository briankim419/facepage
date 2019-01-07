import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router'
import HomeTile from '../components/HomeTile';


export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomeTile} />
    </Router>
  );
}


export default App
