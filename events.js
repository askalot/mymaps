$(function() { // onload handler
  var melbourne = new google.maps.LatLng(-37.813611, 144.963056);
  var mapOptions = {
	zoom:      12,
	center:    melbourne,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map($("#map_canvas")[0], mapOptions);

  var places = loadPlaces();
  drawPlaces(places, map);
});

function loadPlaces() {
	return [
	  {
		"title": "Woodfire BBQ - Meet other students from Honk Kong!",
		"description": "Come join the Hong Kong students association... for an evening of socialising!",
		"thumbnail": "gvrv.jpg",
		"position": [
		  -37.818078,
		  144.966811
		]
	  },
	  {
		"title": "Let's play chess",
		"description": "Have a passion for chess? Can you beat the clock? Join our club!",
		"thumbnail": "andre.jpg",
		"position": [
		  -37.818358,
		  144.952417
		]
	  }
	];
}

function drawPlaces(places, map) {
  var currentPlace = null;
  var info = $('#placeDetails');
  var icons = {
	//'train':          'http://blogs.sitepoint.com/wp-content/uploads/2011/04/train.png',
	'train': 'images/party.png',
	'train-selected': 'images/party-selected.png'
  }


  //$.getJSON('places.json', function(places) {
	$(places).each(function() {
	  var place = this;
	  var marker = new google.maps.Marker({
		position: new google.maps.LatLng(place.position[0], place.position[1]),
		map:      map,
		title:    place.title,
		icon:     icons['train']
	  });

	  google.maps.event.addListener(marker, 'click', function() {
		var hidingMarker = currentPlace;
		var slideIn = function(marker) {
		  $('h1', info).text(place.title);
		  $('p',  info).text(place.description);
		  $('img', info).attr("src","images/"+place.thumbnail);

		  info.animate({right: '0'});
		}

		marker.setIcon(icons['train-selected']);

		if (currentPlace) {
		  currentPlace.setIcon(icons['train']);

		  info.animate(
			{ right: '-320px' },
			{ complete: function() {
			  if (hidingMarker != marker) {
				slideIn(marker);
			  } else {
				currentPlace = null;
			  }
			}}
		  );
		} else {
		  slideIn(marker);
		}
		currentPlace = marker;
	  });
  });
}

