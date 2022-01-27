<?php
/**
 * Posts Strctures Options for our theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2022, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

// Block direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bail if Customizer config base class does not exist.
if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Posts Strctures Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Posts_Archive_Strctures_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Posts Strctures Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$post_types = Astra_Posts_Strctures_Loader::get_supported_post_types();

		foreach ( $post_types as $index => $label ) {

			$section = 'archive-' . $label;

			$_configs = array(

				/**
				 * Archive Post section.
				 */
				array(
					'name'     => $section,
					'title'    => __( 'Archive ', 'astra' ) .  $label,
					'section'  => 'section-posttype-' . $label,
					'type'     => 'section',
					'priority' => 10,
				),

				/**
				 * Option: Dummy control.
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[enable-archive-' . $label . '-dummy-control]',
					'default'  => astra_get_option( 'enable-archive-' . $label . '-dummy-control', false ),
					'type'     => 'control',
					'control'  => 'ast-toggle-control',
					'title'    => __( 'Dummy Control', 'astra' ),
					'section'  => $section,
					'priority' => 10,
				),
			);

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Archive_Strctures_Configs();
