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
class Astra_Posts_Strctures_Configs extends Astra_Customizer_Config_Base {

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

		if ( ! empty( $post_types ) ) {

			$_configs = array(
				array(
					'name'     => 'section-posts-structure',
					'type'     => 'section',
					'priority' => 69,
					'title'    => __( 'Custom Posts Types', 'astra' ),
				),
			);

			/**
			 * Individual post types main section.
			 */
			foreach ( $post_types as $index => $slug ) {
				$post_type_object = get_post_type_object( $slug );
				$parent_section   = 'section-posts-structure';

				if ( 'download' === $slug ) {
					$parent_section = 'section-edd-group';
				}

				if ( 'llms_membership' === $slug ) {
					$parent_section = 'section-lifterlms';
				}

				if ( 'groups' === $slug || 'sfwd-topic' === $slug || 'sfwd-lessons' === $slug || 'sfwd-courses' === $slug ) {
					$parent_section = 'section-learndash';
				}

				$_configs[] = array(
					'name'     => 'section-posttype-' . $slug,
					'type'     => 'section',
					'section'  => $parent_section,
					'title'    => isset( $post_type_object->labels->name ) ? $post_type_object->labels->name : ucfirst( $slug ),
					'priority' => 69,
				);

			}

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Strctures_Configs();
