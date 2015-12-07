<?php
/**
 * Preprocess and Helper Functions for core
 **/

/**
 * Implements hook_preprocess_hook
 */
function minim_preprocess_html(&$variables) {
  // Suggest seperate header and footer script variables in addition to scripts if needed.
  $variables['header_scripts'] = drupal_get_js('header');
  $variables['footer_scripts'] = drupal_get_js('footer');

  // Add css fonts to head
  $css_options = array('type' => 'external', 'group' => CSS_THEME);
  $viewport = array(
   '#tag' => 'meta',
   '#attributes' => array(
     'name' => 'viewport',
     'content' => 'width=device-width, initial-scale=1, maximum-scale=1',
   ),
  );
  drupal_add_html_head($viewport, 'viewport');
  drupal_add_css('https://fonts.googleapis.com/css?family=Oswald:300,400,700', $css_options); 
  drupal_add_css('https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700', $css_options);
  drupal_add_css('https://fonts.googleapis.com/css?family=Raleway:400,300,700,800', $css_options);
}



function minim_preprocess_page(&$variables) {
	$js_options = array('type' => 'file', 'group' => JS_THEME);
    drupal_add_js(drupal_get_path('theme', 'minim') . '/js/min/modernizr.min.js', $js_options);
    drupal_add_js(drupal_get_path('theme', 'minim') . '/js/waypoint.js', $js_options);
    drupal_add_js(drupal_get_path('theme', 'minim') . '/js/common.js', $js_options);
    
    if(drupal_is_front_page() === true) {
      drupal_add_js(drupal_get_path('theme', 'minim') . '/js/home.js', $js_options);
    } else {

      $menu = $_GET['q']; 
      //echo $menu;
      switch(true) {
        // About Us
        case strstr($menu, 'node/9'): 
          drupal_add_js(drupal_get_path('theme', 'minim') . '/js/about.js', $js_options);
          break;
        // Services  
        case strstr($menu, 'node/42'):
        case strstr($menu, 'node/10'):
          drupal_add_js(drupal_get_path('theme', 'minim') . '/js/services.js', $js_options);
          break;

          drupal_add_js(drupal_get_path('theme', 'minim') . '/js/services.js', $js_options);
          break;

        case strstr($menu, 'projects'):
          drupal_add_js(drupal_get_path('theme', 'minim') . '/js/projects.js', $js_options);
        break;
    }
  }
  if (!empty($variables['node']) && isset($variables['node']->type) && $variables['node']->type == 'page') {
    // Unset title on page nodes because we have banner view block.
    $variables['title'] = FALSE;
  }
}

function minim_preprocess_block(&$variables) {
  if ($variables['block_html_id'] == 'block-views-our-team-block') {
    $variables['title_suffix'] = variable_get('our_team_text', '');
  }
}

function minim_preprocess_node(&$variables) {
  $node = $variables['node'];

 //var_dump($node);
  if ($node->type == 'page') { 
    $l = $node->language;
    // Jump Nav
    if (!empty($node->field_jump_navigation[$l])) {
      $links = array();
      foreach ($node->field_jump_navigation[$l] AS $field) {
        $links[] = l($field['first'], $_GET['q'], array('fragment' => $field['second']));
      }
      $variables['jump_links'] = theme('item_list', array('items' => $links));
    }
    // Node body
    $node_view = node_view($node);
    $variables['body'] = drupal_render($node_view['body']);
    // Node Image
    if (!empty($node->field_image[$l]) && $node->nid != 9) {
      $variables['image'] = theme('image', array('path' => $node->field_image[$l][0]['uri']));
    }
    // About Us Page
    if($node->nid == 9) {
      $variables['image'] =  array(
        '#type' => 'container',
        '#attributes' => array(
        'class' => array('about-background'),
        ),
      );
    }
  }
}
