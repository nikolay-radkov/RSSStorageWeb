var React = require('react');
var { Header } = require('./common')

const App = React.createClass({
	render: function (argument) {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

module.exports = App;