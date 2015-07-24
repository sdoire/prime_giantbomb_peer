var apikey = '3ce9c787e57ca42e61b85ba9c89abf198a78684d'; // Put your API key here

$(document).ready(function() {

	// Start the search here

	$('#search').on('click', function(event) {
		event.preventDefault();

		var $input = $("#search :input");
		console.log("This is inputs:" + $input);
		
		var values = {};
		
		console.log($input.val());
	
		search ($input.val());
	});


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
	

    for (var i = 0; i < results.length; i++) {
		var $el = $('body').children().last();
    	if (results) {
    	var image = results[i].image.medium_url.replace(/\"/g, "");
		$el.append("<div class='sortable'>" + results[i].name + "</div>" + "<button id='info'>Click for more info!</button>");

		$el.append("<div class='img'>" + "<img src=\"" + image + "\" \/>" + "</div>");
		
		

		$el.append("<div>" + '<p>' + 'Description: ' + results[i].deck + '</p>' + '<p>' + 'Release Date: ' + results[i].original_release_date + '</p>');


		for (var j = 0; j < results[i].platforms.length; j++) {
			$el.append('<p>' + 'Platform: ' + results[i].platforms[j].name + '</p>');
		}

		}
		else  {
		$el.append("<div><p> 'No results found!'</p></div>");
		}

	}
	// $('body').on('click', '#info', function() {
	// 	$(this).parent().removeClass("hidden");
	// });





}


// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.

function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    },

	    error: function(errorThrown) { 
                    alert("Status: ERROR"); alert("Error: " + errorThrown);
	}
});
}
});