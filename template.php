<?php
/**
 * Theme includes
 */
$theme_path = drupal_get_path('theme', 'minim');
require_once($theme_path . '/includes/base.inc');
require_once($theme_path . '/includes/views.inc');
require_once($theme_path . '/includes/components.inc');

function minim_theme($existing, $type, $theme, $path) {
  return array(
    'video_bg' => array(
      'template' => 'video_bg',
      'path' => $path . '/templates/components',
       'variables' => array('video' => $path . '/videos/landing-1920x815', 'text' => '', 'subtext' => '')
    ),
    'featured_project' => array(
      'template' => 'featured_project',
      'path' => $path . '/templates/components',
      'variables' => array('project' => '', 'images' => '', 'thumbnails' => '')
    ),
    'static_left_slideshow_right' => array(
      'template' => 'static_left_slideshow_right',
      'path' => $path . '/templates/components',
      'variables' => array('project' => '', 'images' => '')
    ),
    'project_grid' => array(
      'template' => 'project_grid',
      'path' => $path . '/templates/components',
      'variables' => array('items' => '')
    ),
  );
}
