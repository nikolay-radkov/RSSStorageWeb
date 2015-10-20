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
				return <ListGroupItem key={subscription.id} className="wix">
					<Grid>
						<Row>
							<Col xs={9} md={9} lg={9}>
								<Link to={'/entries/' + subscription.id}>
									{subscription.title}
								</Link>
								<div>
									<i>Last Updated: { subscription.entries[0].publishedDate }</i>
								</div>
							</Col>
							<Col xs={3} md={3} lg={3} className="text-center">
							 	<Button bsStyle="danger" bsSize="large" onClick={self.deleteSubscription.bind(self, subscription.id)}>Delete</Button>
							</Col>
						</Row>
					</Grid>
				</ListGroupItem>;
			})
		} else {
			content = <h1>No elements added yest</h1>;
		}

		return (
			<div>
				<Button bsStyle="success" bsSize="large" onClick={this.refresh}>Refresh</Button>
				<ListGroup>
					{content}
				</ListGroup>
			</div>
		);
	}
});

module.exports = Subscriptions;