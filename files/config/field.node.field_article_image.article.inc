<?php
/**
 * @file
 * field.node.field_article_image.article.inc
 */

$api = '2.0.0';

$data = array(
  'field_config' => array(
    'translatable' => '0',
    'entity_types' => array(),
    'settings' => array(
      'uri_scheme' => 'public',
      'default_image' => 0,
    ),
    'storage' => array(
      'type' => 'field_sql_storage',
      'settings' => array(),
      'module' => 'field_sql_storage',
      'active' => '1',
      'details' => array(
        'sql' => array(
          'FIELD_LOAD_CURRENT' => array(
            'field_data_field_article_image' => array(
              'fid' => 'field_article_image_fid',
              'alt' => 'field_article_image_alt',
              'title' => 'field_article_image_title',
              'width' => 'field_article_image_width',
              'height' => 'field_article_image_height',
            ),
          ),
          'FIELD_LOAD_REVISION' => array(
            'field_revision_field_article_image' => array(
              'fid' => 'field_article_image_fid',
              'alt' => 'field_article_image_alt',
              'title' => 'field_article_image_title',
              'width' => 'field_article_image_width',
              'height' => 'field_article_image_height',
            ),
          ),
        ),
      ),
    ),
    'foreign keys' => array(
      'fid' => array(
        'table' => 'file_managed',
        'columns' => array(
          'fid' => 'fid',
        ),
      ),
    ),
    'indexes' => array(
      'fid' => array(
        0 => 'fid',
      ),
    ),
    'field_name' => 'field_article_image',
    'type' => 'image',
    'module' => 'image',
    'active' => '1',
    'locked' => '0',
    'cardinality' => '1',
    'deleted' => '0',
    'columns' => array(
      'fid' => array(
        'description' => 'The {file_managed}.fid being referenced in this field.',
        'type' => 'int',
        'not null' => FALSE,
        'unsigned' => TRUE,
      ),
      'alt' => array(
        'description' => 'Alternative image text, for the image\'s \'alt\' attribute.',
        'type' => 'varchar',
        'length' => 512,
        'not null' => FALSE,
      ),
      'title' => array(
        'description' => 'Image title text, for the image\'s \'title\' attribute.',
        'type' => 'varchar',
        'length' => 1024,
        'not null' => FALSE,
      ),
      'width' => array(
        'description' => 'The width of the image in pixels.',
        'type' => 'int',
        'unsigned' => TRUE,
      ),
      'height' => array(
        'description' => 'The height of the image in pixels.',
        'type' => 'int',
        'unsigned' => TRUE,
      ),
    ),
  ),
  'field_instance' => array(
    'label' => 'Article Image',
    'widget' => array(
      'weight' => '32',
      'type' => 'image_image',
      'module' => 'image',
      'active' => 1,
      'settings' => array(
        'progress_indicator' => 'throbber',
        'preview_image_style' => 'thumbnail',
      ),
    ),
    'settings' => array(
      'file_directory' => '',
      'file_extensions' => 'png gif jpg jpeg',
      'max_filesize' => '',
      'max_resolution' => '',
      'min_resolution' => '',
      'alt_field' => 1,
      'title_field' => 1,
      'default_image' => 0,
      'filefield_paths_enabled' => 1,
      'filefield_paths' => array(
        'file_path' => array(
          'value' => '',
          'options' => array(
            'pathauto' => 0,
            'transliterate' => 0,
          ),
        ),
        'retroactive_update' => 0,
        'active_updating' => 0,
        'file_name' => array(
          'value' => '[file:ffp-name-only-original].[file:ffp-extension-original]',
          'options' => array(
            'pathauto' => 0,
            'transliterate' => 0,
          ),
        ),
      ),
      'user_register_form' => FALSE,
    ),
    'display' => array(
      'default' => array(
        'label' => 'above',
        'type' => 'image',
        'settings' => array(
          'image_style' => '',
          'image_link' => '',
        ),
        'module' => 'image',
        'weight' => 1,
      ),
      'teaser' => array(
        'type' => 'hidden',
        'label' => 'above',
        'settings' => array(),
        'weight' => 0,
      ),
    ),
    'required' => 0,
    'description' => '',
    'fences_wrapper' => 'no_wrapper',
    'field_name' => 'field_article_image',
    'entity_type' => 'node',
    'bundle' => 'article',
    'deleted' => '0',
  ),
);

$dependencies = array(
  'content_type.article' => 'content_type.article',
);

$optional = array();

$modules = array(
  0 => 'field_sql_storage',
  1 => 'image',
);
