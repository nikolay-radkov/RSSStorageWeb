var $ = require('jquery-browserify');
var parseString = require('xml2js').parseString;;

class HttpService { 
	static get(url, callback) {
		$.get(url,function (rss) {

			  parseString(xml, function(err, result) {
		        callback(null, result);
		      });
		})
	}
}

module.exports = HttpService;