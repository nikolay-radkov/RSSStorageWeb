var React = require('react');
var { StorageService } = require('../services');


class Subscriptions extends React.Component {
	constructor(props) {
		super(props);
		var subscriptions = StorageService.getAll();
		this.state = { 
			subscriptions: subscriptions
		}
	}
	render (argument) {
		var content = this.state.subscriptions.map(function (subscription) {
			return <h1 className="wix">{subscription.text}</h1>;
		})

		return (
			<div>{content}</div>
		);
	}
} 

module.exports = Subscriptions;