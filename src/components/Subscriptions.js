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

import PullDownToRefresh from './common/PullDownToRefresh';

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
				return <div key={subscription.id} className="wix">
					<div>
						<Link to={'/entries/' + subscription.id}>
							{subscription.title}
						</Link>
						<div>
							<i>Last Updated: { subscription.entries[0].publishedDate }</i>
						</div>
					</div>
					<div>
					 	<Button bsStyle="danger" bsSize="large" onClick={self.deleteSubscription.bind(self, subscription.id)}>Delete</Button>
					</div>
				</div>;
			})
		} else {
			content = <h1>No elements added yet</h1>;
		}

		return (
			<PullDownToRefresh content={content} toRoute='/subscribe' message='Add subscription'/>
		);
	}
});

module.exports = Subscriptions;