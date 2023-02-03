<?php
/**
* Template Name: Landing / Campaign Page
*/

$context = Timber::get_context();
$post = new TimberPost();
$template = array('page-landing.twig');
$context['post'] = $post;

Timber::render($template, $context);