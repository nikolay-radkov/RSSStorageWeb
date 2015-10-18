var React = require('react');
import SubscriptionStore from '../stores/subscriptionStore';
import SubscriptionActions from '../actions/subscriptionActions';
import { Link } from 'react-router';

var Subscriptions = React.createClass({
	getInitialState: function() {
		var subscriptions = SubscriptionStore.getAll();
		return { 
			subscriptions: subscriptions
		}
	},

	componentWillMount: function () {
		SubscriptionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		SubscriptionStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ subscriptions: SubscriptionStore.getAll() });
	},

	deleteSubscription: function (id) {
		SubscriptionActions.remove(id);
	},

  	refresh: function(event) {
  		event.preventDefault();

		SubscriptionActions.updateAll();
  	},

	render: function(argument) {
		var content;
		var self = this;
		if (this.state.subscriptions && this.state.subscriptions.length > 0) {
			content = this.state.subscriptions.map(function (subscription) {
				return <h1 key={subscription.id} className="wix">
					<Link to={'/entries/' + subscription.id}>
						{subscription.title}
					</Link>
					<strong>Last Updated: { subscription.entries[0].publishedDate }</strong>
					<button onClick={self.deleteSubscription.bind(self, subscription.id)}>Delete</button>
				</h1>;
			})
		} else {
			content = <h1>No elements added yest</h1>;
		}

		return (
			<div>
				<button onClick={this.refresh}>Refresh</button>
				{content}
			</div>
		);
	}
});

module.exports = Subscriptions;