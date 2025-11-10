<?php
/**
 * Nina Starter Theme
 */



require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/StarterSite.php';

Timber\Timber::init();

// Sets the directories to find the twig files
Timber::$dirname = 'templates';

new StarterSite();

require get_template_directory() . '/lib/setup.php';
require get_template_directory() . '/lib/assets.php';
require get_template_directory() . '/lib/cpt-ct.php';
require get_template_directory() . '/lib/acf.php';
require get_template_directory() . '/lib/acf-blocks.php';
require get_template_directory() . '/lib/acf-blocks-callbacks.php';
require get_template_directory() . '/lib/gutenberg-disable-fullscreen.php';
require get_template_directory() . '/lib/gutenberg-disable-pattern.php';
require get_template_directory() . '/lib/gutenberg-disable-heading-levels.php';
require get_template_directory() . '/lib/gutenberg-disable-openverse.php';
require get_template_directory() . '/lib/block-allowed.php';

require get_template_directory() . '/lib/login-branding.php';
require get_template_directory() . '/lib/dashboard.php';
require get_template_directory() . '/lib/disable-comments.php';



add_image_size( 'medium_large_xxxx', 1280, 900 );
add_image_size( 'xlarge_xxxx', 2400, 0 );

// move SEO Framework settings panel in editor to bottom
add_filter( 'wpseo_metabox_prio', function() { return 'low'; } );
