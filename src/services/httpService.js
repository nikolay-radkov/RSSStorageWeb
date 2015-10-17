var $ = require('jquery-browserify');
var parseString = require('xml2js').parseString;;
		var FeedMe = require('feedme')
		  , parser = new FeedMe(true)
		  , fs = require('browserify-fs')

class HttpService { 
	static get(url, callback) {



		parser.on('title', function(title) {
		  console.log('title of feed is', title);
		});

		parser.on('item', function(item) {
		  console.log(item);
		});
	
	
		// sax-js and clarinet allow streaming
		// which means faster parsing for larger feeds!
		 // fs.readFile(url, function(error,data){
   //          console.log("error: " + error);
   //          console.log("data: " + data);
   //          debugger;
   //          if (error){
   //          	return;
   //          }


		

   //      });


	/*	$.ajax({
            type:"GET",
            dataType:"jsonp",
            url:url,
            success: callback
        });
*/
		$.get(url,function (rss) {
				debugger;
			fs.createReadStream(rss).pipe(parser);
		      
			parser.on('title', function(title) {
			  console.log('title of feed is', title);
			});

			parser.on('item', function(item) {
			  console.log(item);
			});
		})
	}
}

module.exports = HttpService;