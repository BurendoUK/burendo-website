jQuery( document ).ready( function( $ ) {

	var $body = $('body');
	var breakpoint = 1200;
	
	// Lazy Load
	var lazyLoadImages = new LazyLoad({
		elements_selector: ".lazyload",   
		callback_loaded: (el)=>{
			if ($(el).hasClass('update-parent')) {
				$(el).parent().addClass('is-loaded');
			}
		}
		
	});
	
		
	init();
	layout_diagram();
	layout_accordion();
	layout_text();
	layout_workable();
	layout_news();
	
	function init() {
		
		// Header
		var $header = $('.header');
		var headerCondensed = false;
		
		// Headroom
		var header = document.querySelector('.header');
		var headroom = new Headroom(header, {
			offset : 40,
		});
		headroom.init();
		
		$('[data-toggle').on('click',function(e) {
			$body.toggleClass($(this).data('toggle'));
		});

		// Menu
		var $menuItems = $('.header-menu-item');
		
		// Menu : Button
		$('.button-menu').on('click', function(e) {
			if ($(window).width() <= breakpoint ) {
				if ($body.hasClass('show-menu')) {
					$body.removeClass('show-menu');
				} else {
					$body.addClass('show-menu')
				}
			} 
		});
		
		// Submenu 
		var $submenu = $('.has-submenu');
		
		$submenu.on('click', function(e) {
			if ($(window).width() <= breakpoint ) {
				if (!$(this).hasClass('is-open')) {
					$submenu.removeClass('is-open');
					$(this).addClass('is-open');
				} else {
					$submenu.removeClass('is-open');
				}
			}
		});
		
	}

	function layout_diagram() {	
		if ($('.layout-diagram').length > 0 ) {
			var $diagramLinks = $('.diagram-link');
			var $diagramCircles = $('.layout-diagram .circle');
			
			$diagramLinks.hover(function() {
				$diagramCircles.eq($diagramLinks.index($(this)) - 1).addClass('active');
			}, function() {
				$diagramCircles.removeClass('active');
			});
		}
	}

	function layout_accordion() {	
		if ($('.layout-accordion').length > 0 ) {
			var $accordion = $('.accordion');
			var $accordionTitle = $('.accordion-title');
			var $accordionText = $('.accordion-text');
			var headerOffset = 99;
			
			// Open on load
			if ($('.layout-accordion').hasClass('is-open-onload') && !window.location.hash) {
				$accordion.first().addClass('is-open');
				height = $accordion.first().find('.accordion-text-inner').outerHeight() + 50; // + 50 margin
				$accordion.first().find('.accordion-text').css('max-height', height);
			}
			
			// Open on title click
			$accordionTitle.on('click',function(e) {
				if ($(this).parent().hasClass('is-open')) {
					$accordion.removeClass('is-open');
					$accordionText.css('max-height', 0);
				} else {
					$accordion.removeClass('is-open');
					$accordionText.css('max-height', 0);
					$(this).parent().addClass('is-open');
					height = $(this).next().children('.accordion-text-inner').outerHeight() + 50; // + 50 margin
					$(this).next().css('max-height', height);		
				}
			});
			
			if (window.location.hash) {
				$target = $accordion.filter('[data-id="' + window.location.hash + '"]');
				
				if ($target.length > 0 ) {
					$('html, body').animate({
						scrollTop: $target.offset().top - headerOffset
					}, 1000, function(e) {
						$target.addClass('is-open');
						height = $target.find('.accordion-text-inner').outerHeight() + 50;
						$target.find('.accordion-text').css('max-height', height);
					});
				}
			}	
			
		}
	}
	
	function layout_text() {	
		if ($('.layout-text').length > 0 ) {
			
			var $text = $('.layout-text');
			var headerOffset = 90;
			
			if (window.location.hash) {
				$target = $text.filter('[data-id="' + window.location.hash + '"]');
				
				if ($target.length > 0 ) {
					$('html, body').animate({
						scrollTop: $target.offset().top - headerOffset
					}, 1000);
				}
			}	
			
		}
	}
	
	function layout_workable() {
		if ($('.layout-workable').length > 0 ) {
			$('body').on('click', 'li.whr-item', function(e) {
				window.location = $(this).find('a').attr('href');
			});
		}
	}
	
	function layout_news() {
		if ($('.layout-news').length > 0 ) {
			$('.button-menu').on('click', function(e){
				if ($body.hasClass('show-categories')) {
					$body.removeClass('show-categories');
				}
			})
		}
	}
	
});

function page_contact() {
	  const styledMapType = new google.maps.StyledMapType(
		[
		  {
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#f5f5f5"
			  }
			]
		  },
		  {
			"elementType": "labels.icon",
			"stylers": [
			  {
				"visibility": "off"
			  }
			]
		  },
		  {
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#616161"
			  }
			]
		  },
		  {
			"elementType": "labels.text.stroke",
			"stylers": [
			  {
				"color": "#f5f5f5"
			  }
			]
		  },
		  {
			"featureType": "administrative.land_parcel",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#bdbdbd"
			  }
			]
		  },
		  {
			"featureType": "landscape.man_made",
			"elementType": "geometry.fill",
			"stylers": [
			  {
				"color": "#dae2ec"
			  }
			]
		  },
		  {
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#eeeeee"
			  }
			]
		  },
		  {
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#e5e5e5"
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
			  {
				"color": "#d1d243"
			  },
			  {
				"lightness": 30
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "labels.text",
			"stylers": [
			  {
				"visibility": "simplified"
			  }
			]
		  },
		  {
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#ffffff"
			  }
			]
		  },
		  {
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#dadada"
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
			  {
				"color": "#8d3f89"
			  },
			  {
				"lightness": 10
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"elementType": "labels",
			"stylers": [
			  {
				"visibility": "simplified"
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#ffffff"
			  }
			]
		  },
		  {
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#9e9e9e"
			  }
			]
		  },
		  {
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#e5e5e5"
			  }
			]
		  },
		  {
			"featureType": "transit.station",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#eeeeee"
			  }
			]
		  },
		  {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#c9c9c9"
			  }
			]
		  },
		  {
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
			  {
				"color": "#299fda"
			  }
			]
		  },
		  {
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#ffffff"
			  }
			]
		  }
		],
		{ name: "Burendo" }
	  );
	  // Create a map object, and include the MapTypeId to add
	  // to the map type control.
	const map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 53.796183142988276, lng: -1.556859030150213 },
		zoom: 15,
		mapTypeControlOptions: {
			  mapTypeIds: [""],
		},
	});
	
	const image =
		"https://with.addedlovely.com/burendo/wp-content/themes/burendo/images/logo-marque.svg";
	const marker = new google.maps.Marker({
		position: { lat: 53.796183142988276, lng: -1.556859030150213   },
		map,
		icon: image,
	});

	const contentString = "10-12 East Parade,<br> Leeds,<br> LS1 2BH.";
	const infowindow = new google.maps.InfoWindow({
		content: contentString,
	});
	
	marker.addListener("click", () => {
		infowindow.open({
		  	anchor: marker,
		  	map,
		  	shouldFocus: false,
		});
	});
	  
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set("Burendo", styledMapType);
	map.setMapTypeId("Burendo");
}
