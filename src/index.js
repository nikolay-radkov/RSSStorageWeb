import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';
import InitializeActions from './actions/initializeActions';

InitializeActions.initApp();

ReactDOM.render((
  <Router>
    {routes}
  </Router>
), document.getElementById('root'))