var React = require('react');
var ReactDOM = require('react-dom');

var { 
  Router,
	Route,
  IndexRoute
} = require('react-router');

var {
  App,
  Subscriptions,
  Subscribe,
  Entries,
  EntryInfo
} = require('./views');

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Subscriptions}/>
      <Route path="subscribe" component={Subscribe}/>
      <Route path="entries" component={Entries}/>
      <Route path="entry-info/:id" component={EntryInfo}/>
      <Route path="*" component={Subscriptions}/>
    </Route>
  </Router>
  ), document.getElementById('root'))