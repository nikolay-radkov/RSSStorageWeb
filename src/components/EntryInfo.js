var React = require('react');
import { Link } from 'react-router';
import EntryStore from '../stores/entryStore';

var EntryInfo = React.createClass({
	getInitialState: function() {
		var ids = this.props.params.entryId.split('|');
		var subscriptionId = parseInt(ids[0], 10);
		var entryId = parseInt(ids[1], 10);
		var entry = EntryStore.getById(subscriptionId,entryId);
		return {
			entry: entry,
			__html: entry.content
		}
	},
	render: function() {
		return (
			<div>
				<h1><a href={ this.state.entry.link} >
					{ this.state.entry.title}
					</a>
				</h1>
				<div>{ this.state.entry.author}</div>
				<div>{ this.state.entry.publishedDate}</div>
				
				<a href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}>Share</a>
				<div dangerouslySetInnerHTML={this.state} />
			</div>
		);
	}
}); 

module.exports = EntryInfo;