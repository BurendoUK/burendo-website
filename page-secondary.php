<?php
/**
* Template Name: Secondary
*/

$context = Timber::get_context();
$post = new TimberPost();
$template = array('page-secondary.twig');
$context['post'] = $post;

Timber::render($template, $context);