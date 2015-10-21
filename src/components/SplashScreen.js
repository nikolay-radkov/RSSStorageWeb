"use strict"

import React from 'react';
import { History } from 'react-router';

var SplashScreen = React.createClass({
	mixins: [History],
	componentDidMount: function() {
		var self = this;

		setTimeout(function(){
  			self.history.pushState(null, 'subscriptions');
		}, 10999000);
	},

	render: function() {
		return (
			<div className="landing">
				<h1>R3S</h1>
				<img src="images/apple-icon.png"/>
			</div>
		);
	}
});

module.exports = SplashScreen;