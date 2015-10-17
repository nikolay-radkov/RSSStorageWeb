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

		var content;
		if (this.state.subscriptions) {
			content = this.state.subscriptions.map(function (subscription) {
				return <h1 className="wix">{subscription.text}</h1>;
			})
		} else {
			content = <h1>No elements added yest</h1>;
		}


		return (
			<div>{content}</div>
		);
	}
} 

module.exports = Subscriptions;