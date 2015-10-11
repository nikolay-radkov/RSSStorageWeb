var React = require('react');
var { Header } = require('./components')

const App = React.createClass({
	render: function (argument) {
		return (
			<div>
				<Header />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = App;