<?php
/**
 * @file
 * demo_content.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function demo_content_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => '1st Article',
  'log' => '',
  'status' => 1,
  'comment' => 0,
  'promote' => 1,
  'sticky' => 0,
  'type' => 'article',
  'language' => 'und',
  'created' => 1442446803,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '45e37d81-e89b-4b9a-b838-961d2e107716',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => 'This the first article.',
        'summary' => '',
        'format' => 'full_html',
        'safe_summary' => '',
      ),
    ),
  ),
  'field_article_image' => array(),
  'date' => '2015-09-16 23:40:03 +0000',
  'user_uuid' => '7be0aa2e-cca0-45f5-8673-60c07ac367a6',
);
  $nodes[] = array(
  'title' => 'Second Article',
  'log' => '',
  'status' => 1,
  'comment' => 0,
  'promote' => 1,
  'sticky' => 0,
  'type' => 'article',
  'language' => 'und',
  'created' => 1442446877,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '605c962a-18a8-4a3b-b156-54db22278d59',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => 'This the second article.',
        'summary' => '',
        'format' => 'full_html',
        'safe_summary' => '',
      ),
    ),
  ),
  'field_article_image' => array(
    'und' => array(
      0 => array(
        'uid' => 1,
        'filename' => 'foreveralone.jpg',
        'uri' => 'public://foreveralone.jpg',
        'filemime' => 'image/jpeg',
        'filesize' => 18826,
        'status' => 1,
        'origname' => 'foreveralone.jpg',
        'uuid' => '93c6702b-2c48-43e3-bd98-d1fbfef9cc22',
        'alt' => '',
        'title' => '',
        'width' => 127,
        'height' => 128,
        'uuid_features_packaged_file_path' => 'assets/foreveralone.jpg',
      ),
    ),
  ),
  'date' => '2015-09-16 23:41:17 +0000',
  'user_uuid' => '7be0aa2e-cca0-45f5-8673-60c07ac367a6',
);
  return $nodes;
}
