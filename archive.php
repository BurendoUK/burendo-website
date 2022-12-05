<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */
$context = Timber::get_context();
$context['posts'] = new Timber\PostQuery();

// Template
$template = array('index.twig');

// Hero
$context['hero'] = Timber::get_post(55);

// Back
$context['back'] = get_permalink(55);

// Categories
$context['categories'] = Timber::get_terms( 'category', array(
    'hide_empty' => false,
    'exclude' => 1
));

// Current 
$context['active'] =  get_query_var( 'cat' );


Timber::render( $template, $context );