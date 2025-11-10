<?php
/**
 * Disable Openverse.
 *
 * @param array $settings The current block editor settings.
 * @param array $context  The current editor context, including post information.
 * @return array          The modified block editor settings.
 */
function example_disable_openverse( $settings, $context ) {
	$settings['enableOpenverseMediaCategory'] = false;
	return $settings;
}
add_filter( 'block_editor_settings_all', 'example_disable_openverse', 10, 2 );