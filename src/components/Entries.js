var React = require('react');

import EntryStore from '../stores/entryStore';
import SubscriptionActions from '../actions/subscriptionActions';
import { Link } from 'react-router';

var Entries = React.createClass({
	getInitialState: function() {
		var id = parseInt(this.props.params.id, 10);
		var entries = EntryStore.getAllById(id);
		return { 
			id: id,
			entries: entries
		};
	},

	componentWillMount: function () {
		EntryStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		EntryStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		var entries = EntryStore.getAllById(this.state.id);
		this.setState({ entries: entries });
	},

	refresh: function(event) {
		debugger;
  		event.preventDefault();

		SubscriptionActions.update(this.state.id);
  	},
	render: function() {
		var content;
		var self = this;
		if (this.state.entries && this.state.entries.length > 0) {
			content = this.state.entries.map(function (entry) {
				return <h1 key={entry.id} className="wix">
					<Link to={`/entry/${self.state.id + '|' + entry.id}`}>
						{entry.title}
					</Link>
					<strong>{entry.publishedDate}</strong>
				</h1>
			})
		} else {
			content = <h1>No elements added yet</h1>;
		}

		return (
			<div>
				<button onClick={this.refresh}>Refresh</button>
				<div>{ content }</div>
			</div>
		);
	}
});

module.exports = Entries;