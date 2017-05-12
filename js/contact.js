jQuery(function($) {'use strict',

//	var form = $('.contact-form');
    
	$(".contact-form").submit(function () {'use strict',
		$this = $(this);
             
        alert('contact info:' + $(".contact-form").serialize());                                
                                           
		/*$.post("sendemail.php", $(".contact-form").serialize(),function(result){
			if(result.type == 'success'){
				$this.prev().text(result.message).fadeIn().delay(3000).fadeOut();
			}
		});*/
		return false;
	});

});

// Google Map Customization


jQuery(function ($) {
        function init_map1() {
            var myLocation = new google.maps.LatLng(43.593513,-79.638208);
            var mapOptions = {
                center: myLocation,
                zoom: 17
                };
            var marker = new google.maps.Marker({
                position: myLocation,
                title: "Property Location"
                });
            
            var map = new google.maps.Map(document.getElementById("map1"),
                mapOptions);
            marker.setMap(map);
        }
        init_map1();
    });



/*(function(){

//	var map;

	map = new GMaps({
		el: '#gmap',
		lat: 43.1580159,
		lng: -77.6030777,
		scrollwheel:false,
		zoom: 14,
		zoomControl : false,
		panControl : false,
		streetViewControl : false,
		mapTypeControl: false,
		overviewMapControl: false,
		clickable: false
	});

	var image = 'images/map-icon.png';
	map.addMarker({
		lat: 43.1580159,
		lng: -77.6030777,
		// icon: image,
		animation: google.maps.Animation.DROP,
		verticalAlign: 'bottom',
		horizontalAlign: 'center',
		backgroundColor: '#ffffff',
	});

	var styles = [ 

	{
		"featureType": "road",
		"stylers": [
		{ "color": "" }
		]
	},{
		"featureType": "water",
		"stylers": [
		{ "color": "#A2DAF2" }
		]
	},{
		"featureType": "landscape",
		"stylers": [
		{ "color": "#ABCE83" }
		]
	},{
		"elementType": "labels.text.fill",
		"stylers": [
		{ "color": "#000000" }
		]
	},{
		"featureType": "poi",
		"stylers": [
		{ "color": "#2ECC71" }
		]
	},{
		"elementType": "labels.text",
		"stylers": [
		{ "saturation": 1 },
		{ "weight": 0.1 },
		{ "color": "#111111" }
		]
	}

	];

	map.addStyle({
		styledMapName:"Styled Map",
		styles: styles,
		mapTypeId: "map_style"  
	});

	map.setStyle("map_style");
}());*/

