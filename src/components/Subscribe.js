import React from 'react';
import { History } from 'react-router';
import { 
	Input, 
	ButtonInput
} from 'react-bootstrap';

import { 
	StorageService, 
	HttpService 
} from '../services';

import SubscriptionStore from '../stores/subscriptionStore';
import SubscriptionActions from '../actions/subscriptionActions';

var Subscribe = React.createClass({
	getInitialState: function() {
		return {url: ''};
  	},
  	mixins: [History],
  	handleChange: function() {
	    this.setState({
	      url: this.refs.input.getValue()
	    });
  	},
  	componentWillMount: function() {
  		SubscriptionStore.addChangeListener(this._onCreate);
  	},
  	componentWillUnmount: function() {
  		SubscriptionStore.removeChangeListener(this._onCreate);
  	},
  	_onCreate: function() {
  		this.history.pushState(null, '/');
  	},
  	submit: function(event) {
  		event.preventDefault();

		SubscriptionActions.create(this.state.url);
  	},
	render: function(argument) {
		return (
			 <form>
				<Input
			        type="text"
			        value={this.state.url}
			        placeholder="http://your-web-site.com/rss"
			        label="Enter the url of rss you want to store"
			        bsStyle="success"
			        ref="input"
			        groupClassName="group-class"
			        labelClassName="label-class"
			        onChange={this.handleChange} 
			    />
		      	<ButtonInput 
		      		type="submit" 
		      		value="Add" 
		      		bsStyle="success" 
		      		bsSize="large"
					onClick={this.submit}
		      		/>
		     </form>
		);
	}
});

module.exports = Subscribe;