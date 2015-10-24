var React = require('react');
import SubscriptionStore from '../stores/subscriptionStore';
import SubscriptionActions from '../actions/subscriptionActions';
import { Link } from 'react-router';
import { 
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
	Button
} from 'react-bootstrap';

import { PullDownLayout } from './common';

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

	componentDidMount:function() {
        WebPullToRefresh.init({
            loadingFunction: this.refresh
        });
	},

	_onChange: function () {
		this.setState({ subscriptions: SubscriptionStore.getAll() });
	},

	deleteSubscription: function (id) {
		toastr.error('RSS deleted successfully');
		SubscriptionActions.remove(id);
	},

  	refresh: function() {
  		return new Promise( function( resolve, reject ) {

			SubscriptionActions.updateAll();

			resolve();
		});
  	},

	render: function(argument) {
		var content;
		var self = this;
		if (this.state.subscriptions && this.state.subscriptions.length > 0) {
			content = this.state.subscriptions.map(function (subscription) {
				var index = subscription.feedUrl.indexOf('//') + 2;
				index = subscription.feedUrl.indexOf('/', index);
				var url = subscription.feedUrl.substring(0, index);

				return <div key={subscription.id} className="list-item">
					<div className="info">
						<img src={ url + "/favicon.ico" } className="favicon"/>
						<Link to={'/entries/' + subscription.id} className="title">
							{subscription.title}
						</Link>
						<div className="link">
							<i>Link:</i> <a href={subscription.feedUrl}>{subscription.feedUrl}</a>		
						</div>
						<div className="date">
							<i>Updated at: { new Date(subscription.entries[0].publishedDate).toLocaleString() }</i>
						</div>
					</div>
					<div className="buttons">
					 	<Button bsStyle="danger" onClick={self.deleteSubscription.bind(self, subscription.id)}>Delete</Button>
					</div>
				</div>;
			})
		} else {
			content = <h1>No elements added yet</h1>;
		}

		return (
			<PullDownLayout 
				content={content} 
				toRoute='/subscribe'
				message='Add subscription'
				title='Subscriptions'/>
		);
	}
});

module.exports = Subscriptions;