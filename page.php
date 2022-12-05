<?php

$context = Timber::get_context();
$post = new TimberPost();
$template = array('page-' . $post->post_name . '.twig', 'page.twig');
$context['post'] = $post;


// Contact 
if (is_page(10)) {
	$template = 'page-contact.twig';
} 

Timber::render($template, $context);