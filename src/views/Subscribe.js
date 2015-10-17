var React = require('react');
var { 
	Input, 
	ButtonInput
} = require('react-bootstrap');

var { StorageService, HttpService } = require('../services');

class Subscribe extends React.Component {
	constructor(props) {
		 super(props);
	     this.state  = {value: ''};
  	}
  	handleChange() {
	    this.setState({
	      value: this.refs.input.getValue()
	    });
  	}
  	submit() {
	  	HttpService.get(this.state.value, function (rss) {
	  		debugger;
	  		StorageService.add(rss);
	  	});
		
  	}
	render(argument) {
		return (
			 <form>
				<Input
			        type="text"
			        value={this.state.value}
			        placeholder="http://your-web-site.com/rss"
			        label="Enter the url of rss you want to store"
			        bsStyle="success"
			        ref="input"
			        groupClassName="group-class"
			        labelClassName="label-class"
			        onChange={this.handleChange.bind(this)} 
			    />
		      	<ButtonInput 
		      		type="submit" 
		      		value="Add" 
		      		bsStyle="success" 
		      		bsSize="large" 
		      		disabled={this.state.disabled} 
					onClick={this.submit.bind(this)}
		      		/>
		     </form>
		);
	}
} 

module.exports = Subscribe;