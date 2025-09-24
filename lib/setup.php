<?php

add_action( 'after_setup_theme','XXXX_setup');

function XXXX_setup() {

  register_nav_menus( array (
    'header_first'	=> esc_html__( 'Header-First', 'xxxx' ),
    'header_second'	=> esc_html__( 'Header-Second', 'xxxx' ),
    'language_switcher'	=> esc_html__( 'Language Switcher', 'xxxx' ),
    'footer' => esc_html__( 'Footer', ' ' )
  ) );

  add_theme_support( 'automatic-feed-links' );
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'menus' );
  add_theme_support(
    'html5', array(
      'gallery',
      'caption',
    )
  );

  
  // Gutenberg settings:
  // add theme support for editor styles
  // add_theme_support( 'align-wide' );
  add_theme_support( 'editor-styles' );
  add_theme_support( 'disable-layout-styles' );



  update_option( 'thumbnail_size_w', 600 );
  update_option( 'thumbnail_size_h', 0 );
  update_option( 'thumbnail_crop', 0 );
  update_option( 'medium_size_w', 800 );
  update_option( 'medium_size_h', 0 );
  update_option( 'medium_crop', 0 );
  update_option( 'medium_large_size_w', 1400 );
  update_option( 'medium_large_size_h', 0 );
  update_option( 'medium_large_crop', 0 );
  update_option( 'large_size_w', 1800 );
  update_option( 'large_size_h', 0 );
  update_option( 'large_crop', 0 );

  // Change Default WordPress Sizes
  add_image_size( 'xlarge_XXXX', 2400, 0 );
}
