var React = require('react');
import { Link } from 'react-router';
import EntryStore from '../stores/entryStore';
import { NormalLayout } from './common';

import { 
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
	Button,
	Jumbotron
} from 'react-bootstrap';
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
		var content = <div>
				<Jumbotron>
					<h1>
						<a href={ this.state.entry.link} >
						{ this.state.entry.title}
						</a>
					</h1>
					<div>Author: { this.state.entry.author}</div>
					<div>Published Date: { this.state.entry.publishedDate}</div>
					
					<Button bsStyle="success" bsSize="large"><a href={"https://www.facebook.com/sharer/sharer.php?u=" + this.state.entry.link} target="_blank">Share on Facebook</a>
					</Button>
				</Jumbotron>
				<div dangerouslySetInnerHTML={this.state} />
			</div>;

		return (
			<NormalLayout content={content}/>
		);
	}
}); 

module.exports = EntryInfo;