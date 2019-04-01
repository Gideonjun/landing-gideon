
function getAPIdata() {

	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="721f113f8b6f6f151caba459a45ccd4d";
	var city = document.getElementById("city").value;

	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + "&#176;C <br>" + type;


}



function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

// init data stream
document.getElementById("getWeather").onclick = function(){
	getAPIdata();
};


//---------------------------------------------------------------------------------------------


// In the following example, markers appear when the user clicks on the map.
	      // Each marker is labeled with a single alphabetical character.
	      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	      var labelIndex = 0;

	      function initialize() {
	        var currentlocation = { lat: 52.070499, lng: 4.300700 };
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 12,
	          center: currentlocation
	        });

	        // This event listener calls addMarker() when the map is clicked.
	        google.maps.event.addListener(map, 'click', function(event) {
	          addMarker(event.latLng, map);
	        });

	        // Add a marker at the center of the map.
	        addMarker(currentlocation, map);
	      }

	      // Adds a marker to the map.
	      function addMarker(location, map) {
	        // Add the marker at the clicked location, and add the next-available label
	        // from the array of alphabetical characters.
	        var marker = new google.maps.Marker({
	          position: location,
	          label: labels[labelIndex++ % labels.length],
	          map: map
	        });
	      }

	      google.maps.event.addDomListener(window, 'load', initialize);
