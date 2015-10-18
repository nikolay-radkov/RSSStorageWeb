import React from 'react';
import {
	Route,
  	IndexRoute,
  	DefaultRoute
} from 'react-router';

import { 
	App,
	Subscriptions,
	Subscribe,
	Entries,
	EntryInfo 
} from './components';

var routes =  (
    <Route path="/" component={App}>
      <IndexRoute component={Subscriptions}/>
      <Route path="subscribe" component={Subscribe}/>
      <Route path="entries/:id" component={Entries}/>
      <Route path="/entry/:entryId" component={EntryInfo}/>
      <Route path="*" component={Subscriptions}/>
    </Route>
);

module.exports = routes;