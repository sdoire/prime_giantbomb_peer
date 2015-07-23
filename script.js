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
	var $el = $('body').children().last();

    for (var i = 0; i < results.length; i++) {

    	if (results) {

		$('body').append("<div class='sortable'><button id='info'>Click for more info!</button>" + results[i].name + "</div>");

		for (var k=0; k < results[i].images.length; k++) {

			$('body').append("<p><img src='results[i].images[k].XXX)'></p>");

		}

		}
		else  {
		$('body').append("<div><p> 'No results found!'</p></div>");
		}

	}

	$(this).on('click', '#info', function() {

		$(this).append('<p>' + 'Description: ' + this.description + '</p>');
			$(this).append('<p>' + 'Release Date: ' + this.original_release_date + '</p>');


				for (var j = 0; j < this.platforms.length; j++) {
			$(this).append('<p>' + 'Platform: ' + this.platforms[j].name + '</p>');
		}
	});


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