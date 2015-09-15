<?php
/**
 * @file
 * content_type.webform.inc
 */

$api = '2.0.0';

$data = (object) array(
  'type' => 'webform',
  'name' => 'Webform',
  'description' => 'Create a new form or questionnaire accessible to users. Submission results and statistics are recorded and accessible to privileged users.',
  'has_title' => '1',
  'title_label' => 'Title',
  'base' => 'node_content',
  'help' => '',
);

$dependencies = array();

$optional = array(
  'permission.create_webform_content' => 'permission.create_webform_content',
  'permission.edit_own_webform_content' => 'permission.edit_own_webform_content',
  'permission.edit_any_webform_content' => 'permission.edit_any_webform_content',
  'permission.delete_own_webform_content' => 'permission.delete_own_webform_content',
  'permission.delete_any_webform_content' => 'permission.delete_any_webform_content',
);

$modules = array(
  0 => 'node',
);
