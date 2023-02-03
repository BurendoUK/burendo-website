<?php
if ( class_exists( 'Timber' ) ){
	Timber::$cache = false;
}

// Child theme settings
$addedlovely = (object) array(
	'version' 				=> 	1.0,
	'is_woocommerce'    	=> 	false,
	'has_press' 			=> 	false,
	'has_testimonials'		=>	false,
	'has_events'			=>	false,
	'has_blog'				=>	false,
	'has_sidebar'			=>	false,
	'has_search'			=>	false,
	'has_ingredients'		=>	false,
	'has_designers'			=>	false,
	'has_secondary_menu'	=>	false,
	'load_google_fonts'		=>	false,
	'load_pinterest'		=>	false,
	'ga_tracking_code'		=>	1234,
	'google_conversion_id'	=>	false,
	'google_maps_api_key'	=>	'AIzaSyA-9sCCe0-I6upuidqx5T1BvGZELfXhlfY',
	'instgram_userId'		=>	1543748188,
	'instagram_clientId'	=>	false,
	'instagram_accessToken'	=>	false,
	'logo_width'			=>	400,
	'logo_height'			=>	141
);

// Load Child Styles
function addedlovely_child_styles() {

	$dependencies = array('jquery', 'lazyload', 'headroom', 'scrollreveal');

	/* Scripts : Lazy Load */
	wp_enqueue_script( 'lazyload',  get_stylesheet_directory_uri() . '/js/vendor/lazyload.min.js',false, '13.0.1', true );		
	
	// Headroom
	wp_enqueue_script( 'headroom',  get_stylesheet_directory_uri() . '/js/vendor/headroom.min.js',false, '0.12.0', true );	
	
	// ScrollReveal
	wp_enqueue_script( 'scrollreveal',  get_stylesheet_directory_uri() . '/js/vendor/scrollreveal.min.js',false, '4.0.9', true );	
								
	// Load Child JS
	wp_enqueue_script( 'child-init', get_stylesheet_directory_uri() . '/js/custom.js',$dependencies, false, true );			
	wp_enqueue_style( 'child-css', get_stylesheet_directory_uri() . '/style.css', '');
	
	if (is_page(10)) {
		wp_enqueue_script( 'google-maps', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9sCCe0-I6upuidqx5T1BvGZELfXhlfY&callback=page_contact&v=weekly',false, '4.0.9', true );	
		array_push($dependencies, 'google-maps');
	}
	
	// Remove unneeded scripts
	wp_dequeue_script('wp-polyfill');
	wp_dequeue_script('wp-dom-ready');
	wp_dequeue_script('wp-hooks');
	wp_dequeue_script('wp-a11y');
	wp_dequeue_script('regenerator-runtime');
	wp_dequeue_script('wp-block-library');
	wp_dequeue_style( 'global-styles' );
	
	// Remove unneeded styles
	wp_dequeue_style( 'wp-block-library');
}

add_action( 'wp_enqueue_scripts', 'addedlovely_child_styles', 100000 );


// ACF : Load JSON from parent
function addedlovely_child_acf_json_load_point( $paths ) {

	// return
	return $paths;   
}
add_filter('acf/settings/load_json', 'addedlovely_child_acf_json_load_point');



function addedlovely_load_languages() {
	$path = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'addedlovely', $path );
}
add_action( 'after_setup_theme', 'addedlovely_load_languages' );

// Add menus to context
function addedlovely_child_add_to_context($context) {
	
	$context['options'] = array(
		'header' => array(
			'menu' => new Timber\Menu(2),
		),
		'footer' => array(
			'social'  => new Timber\Menu(3),		
			'company_policies' => new Timber\Menu(4),	
			'useful_links'  => new Timber\Menu(5),	
			'address' => get_field('address', 'options', true),
			'phone' => get_field('phone', 'options', false),
			'email' => get_field('email', 'options', false),
			'map' => get_field('map_link', 'options', true),
			'logos' => get_field('logos', 'options', true),
			'copyright' => get_field('copyright', 'options', true),
		)
	);

	return $context;
}
add_filter('addedlovely_add_to_context', 'addedlovely_child_add_to_context');

// Site Specific 
add_filter('addedlovely_jquery_footer', '__return_false');


// Body Class
function addedlovely_body_class() {

	global $post;

	$bodyClass = '';

	if (is_404()) {
		$bodyClass = 'page-404';
	} else if ( is_front_page() ) {
		$bodyClass = 'page-home has-hero';
	} else if (is_page(10)) {
		$bodyClass = 'page-contact';
	}
	
	return $bodyClass;
}


// Login Logo
function addedlovely_login_logo() {
	echo '<style type="text/css">
		h1 a { background-image:url('.get_stylesheet_directory_uri().'/images/logo.svg) !important; background-size:auto!important; width:100% !important;}
	</style>';
}

// Gravity Forms : Loading graphic
add_filter( 'gform_ajax_spinner_url', 'addedlovely_gform_ajax_spinner_url', 10, 2 );
function addedlovely_gform_ajax_spinner_url( $image_src, $form ) {
	return get_stylesheet_directory_uri()  . '/images/loading.svg';
}

// Gravity Forms : Change input to submit
add_filter( 'gform_submit_button', 'addedlovely_gravity_form_submit_button', 10, 2 );
function addedlovely_gravity_form_submit_button( $button, $form ) {
	$button = str_replace("<input type='submit'", "<button", $button);
	$button = str_replace("/>", ">Send<svg class='icon icon-right'><use xlink:href='#icon-right'></use></svg></button>", $button);
	return $button;    
}
	
// Register Image sizes
function addedlovely_register_image_sizes() {
 	// Mobile
	add_image_size('mobile',750, 0, false);
}
