<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package 	WordPress
 * @subpackage 	Timber
 * @since 		Timber 0.1
 */


$templates = array('search.twig', 'archive.twig', 'index.twig');
$context = Timber::get_context();


$results = new SWP_Query(array(
	's' => get_search_query()
));

$output = array();

if ( $results->have_posts() ) {
	while ( $results->have_posts() ) : 
		$results->the_post();
		
		array_push($output, array(
			'title' => get_the_title(),
			'link' => get_permalink(),
			'excerpt' => get_the_excerpt()
		));

	endwhile; 
	
	wp_reset_postdata();
}

$context['title'] = get_search_query();
$context['results'] = $output;

Timber::render($templates, $context);