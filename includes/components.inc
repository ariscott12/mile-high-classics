  <?php

function minim_preprocess_featured_project(&$v) {
  // Libraries
  //drupal_add_library('mhc_libraries', 'jquery_cycle');

  // Sidebar
  $node = $v['project'];
  $l = $node->language;

  $sidebar = array();
  $nav_links = array();
  $nav_pagers = array();

  $sidebar['title'] = array('#theme' => 'html_tag', '#value' => $node->title, '#tag' => 'h2');
  if ($node->body[$l][0]) {
    $body = $node->body[$l][0]['summary'];
  }
  else {
    $body = view_trim_text(array('max_length' => 155, 'html' => TRUE), $node->body[$l][0]['value']);
  }
  $sidebar['body'] = array('#theme' => 'html_tag', '#value' => $body, '#tag' => 'p');
  $cnt = 0;
  // Images -- Actualy divs with three images inside.
  foreach ($v['images'] AS $term => $images) {
    
    // Sidebar navigation, only add active class to first pager and term
    if($cnt === 0) {
      $class = "active";
    } else {
      $class = "";
    }

    $nav_pagers['pagers'][$term] =   array('#theme' => 'html_tag', '#value' => '', '#tag' => 'a', '#attributes' => array('data-project-type' => $term, 'class' => $class));
    $nav_links['links'][$term] =   array('#theme' => 'html_tag', '#value' => $term, '#tag' => 'li', '#attributes' => array('data-project-type' => $term, 'class' => $class));
    
    // Wrapper
    $images_render[$term] = array(
      '#type' => 'container',
      '#attributes' => array(
        'class' => array('project-slide'),
        'data-project-type' =>  $term ,
      ),
    );
    // Three images
    foreach ($images AS $key => $image_row) {
      if (!empty($v['thumbnails'])) {
        $image = array(
          '#theme' => 'image_style',
          '#style_name' => 'project_detail',
          '#path' => $image_row->uri,
          '#attributes' => array('data-image-large' => file_create_url($image_row->uri))
        );
      }
      else {
        $image = array(
          '#theme' => 'image',
          '#path' => $image_row->uri
        );
      }
      if (!empty($image_row->field_feature_large_value)) {
         $image['#attributes']['class'] = array('feature-image-large', 'feature-image-' . $key);
      }
      else {
          $image['#attributes']['class'] = array('feature-image-small', 'feature-image-' . $key);
         
      }
      $images_render[$term][$key] = $image;
      $cnt++;
    }
  }
  $v['rows'] = drupal_render($images_render);
  $v['sidebar'] = drupal_render($sidebar);
  $v['nav_pagers'] = drupal_render($nav_pagers);
  $v['nav_links'] = drupal_render($nav_links);
}

function minim_preprocess_static_left_slideshow_right(&$variables) {
  $node = $variables['project'];
  $l = $node->language;
  $pagers = array();
  // body
  $node_view = node_view($node);
  $variables['body'] = drupal_render($node_view['body']);
  // images
  $slides = array();
  $cnt = 0;
  foreach ($variables['images'] AS $key => $image) {
    if($cnt === 0) {
      $pagers['pagers'][$key] =   array('#theme' => 'html_tag', '#value' => '&nbsp;', '#tag' => 'li', '#attributes' => array('class' => 'active'));
    } else {
      $pagers['pagers'][$key] =   array('#theme' => 'html_tag', '#value' => '&nbsp;', '#tag' => 'li');
    }

    $cnt++;
    $slides[$key] = array(
      // '#type' => 'container',
      // '#attributes' => array(
      //   'class' => array('slide'),
      // ),
      'image' => array(
        '#theme' => 'image',
        '#path' => $image->uri,
      )
    );
  }
  $variables['slides'] = drupal_render($slides);
  $variables['pagers'] = drupal_render($pagers);
}

function minim_preprocess_project_grid(&$variables) {
  if (!empty($variables['items'])) {
    $rows = array();
    foreach ($variables['items'] AS $item) {
      $image = theme('image_style', array('style_name' => 'project_grid', 'path' => $item['image_uri']));
      $rows[] = l($image . '<div class = "overlay"></div><h3>' . $item['title'] . '</h3>', $item['url'], array('html' => TRUE));
    //  $rows[] = l('<h3>test</h3>', array('html' => TRUE));
    }
    $rows = array_chunk($rows, 3);
    $final_rows = array();
    foreach ($rows AS $row_set) {
      $final_rows[] = implode($row_set, '');
    }
    $variables['rows'] = $final_rows;
  }
}
