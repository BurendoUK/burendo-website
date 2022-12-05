<?php


$context = Timber::get_context();
$post = new TimberPost();

$context['post'] = $post;

// Template
$template = array('single-' . $post->post_type . '.twig', 'single.twig');

// Hero
$context['hero'] = Timber::get_post(55);

// Back
$context['back'] = get_permalink(55);

// Categories
$context['categories'] = Timber::get_terms( 'category', array(
	'hide_empty' => false,
	'exclude' => 1
));

Timber::render($template, $context);