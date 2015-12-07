<?php
/**
 * Preprocess and Helper Functions for Views
 **/
function minim_preprocess_views_view(&$variables) {
  $sub_functions = array();
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name;
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name . '__' . $variables['view']->current_display;
  foreach ($sub_functions AS $function) {
    if (function_exists($function)) {
      $function($variables);
    }
  }
}

/**
 * Implements hook_preprocess_HOOK
 */
function minim_preprocess_views_view_unformatted(&$variables) {
  $rows_rendered = array();
  if (!empty($variables['rows'])) {
    foreach ($variables['rows'] AS $id => $row) {
      $complete_row = "<div class='" . $variables['classes_array'][$id] . "'>";
      $complete_row .= $row;
      $complete_row .= "</div>";
      $rows_rendered[] = array('row' => $complete_row);
    }
  }
  $variables['rows_rendered'] = $rows_rendered;
  $sub_functions = array();
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name;
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name . '__' . $variables['view']->current_display;
  foreach ($sub_functions AS $function) {
    if (function_exists($function)) {
      $function($variables);
    }
  }
}

/**
 * Implements hook_preprocess_HOOK
 */
function minim_preprocess_views_view_fields(&$variables) {
  $fields_rendered = '';
  if (!empty($variables['fields'])) {
    foreach ($variables['fields'] AS $id => $field) {
      // Seperator
      if (!empty($field->separator)) {
        $fields_rendered .= $field->separator;
      }
      $fields_rendered .= $field->wrapper_prefix; 
      $fields_rendered .= $field->label_html; 
      $fields_rendered .= $field->content;
      $fields_rendered .= $field->wrapper_suffix;
    }
  }
  $variables['fields_rendered'] = $fields_rendered;
  // Allow for more granular preproces_functions
  $sub_functions = array();
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name;
  $sub_functions[] = __FUNCTION__ . '__' . $variables['view']->name . '__' . $variables['view']->current_display;
  foreach ($sub_functions AS $function) {
    if (function_exists($function)) {
      $function($variables);
    }
  }
}


function minim_preprocess_views_view_fields__services(&$v) {
  $row = $v['row'];

  // Title
  $v['title'] = $row->node_title;
  $v['nid'] = $row->nid;
  $id = strtolower($row->node_title);
  $id = str_replace(' ', '-', $id);
  $v['link'] = '/our-services#'.$id;


  // Body 
  if (!empty($row->field_body[0]['raw']['summary'])) {
    $v['body'] = $row->field_body[0]['raw']['summary'];
  }
}


function minim_preprocess_views_view_fields__services_list(&$v) {
  $row = $v['row'];
  $v['title'] = $row->field_field_full_title;
  $v['body'] = $row->field_body;
  $v['nid'] = $row->nid;
  $id = strtolower($row->node_title);
  $id = str_replace(' ', '-', $id);
  $v['id'] = $id;
  $v['tagline'] = $row->field_field_tagline;
}


function minim_preprocess_views_view_fields__page_banner(&$v) {
  $row = $v['row'];
 // dsm($row);
 // var_dump($row);
  global $base_path;
// var_dump(); 
  $icon = $base_path . drupal_get_path('theme', 'minim') . '/images/icons/scroll-down-arrow.png';
  $video = $base_path . drupal_get_path('theme', 'minim') . '/videos/'.drupal_render($row->field_field_header_video);
  // Title
  $v['title'] = $row->node_title;
  
  // Banner text
  $v['banner_text'] = $row->field_field_header_text;

  // Banner image
  $v['banner_image'] = $row->field_field_header_image;
  $v['banner_video'] = $video;

  $v['scroll_icon'] = $icon;

}

function minim_preprocess_views_view_fields__our_team(&$v) {
  $row = $v['row'];
  // Title
  $v['first_name'] = $row->field_field_first_name;
  $v['last_name'] = $row->field_field_last_name;
  $v['job_title'] = $row->field_field_job_title;
  $v['body'] = $row->field_body;
  $v['image'] = $row->field_field_image;

  global $base_path;
  $icon = $base_path . drupal_get_path('theme', 'minim') . '/images/icons/scroll-right-arrow.png';
  $v['scroll_icon'] = $icon;
}

function minim_preprocess_views_view_fields__restoration_process(&$v) {
  $row = $v['row'];

  $count = &drupal_static(__FUNCTION__);
  if(!is_int($count))
  {
    $count = 0;
  }
  $count++;
  $v['title'] = $row->node_title;
  $v['bullets'] = $row->field_body;
  $v['body'] = $row->field_body[0]['raw']['summary'];
  $v['step'] = 'Step '.$count;
  $v['nid'] = $row->nid;
 
}