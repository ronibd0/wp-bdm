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
class Astra_Posts_Single_Strctures_Configs extends Astra_Customizer_Config_Base {

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

			$section = 'single-' . $label;

			$_configs = array(

				/**
				 * Single Post section.
				 */
				array(
					'name'     => $section,
					'title'    => __( 'Single ', 'astra' ) .  $label,
					'section'  => 'section-posttype-' . $label,
					'type'     => 'section',
					'priority' => 5,
				),

				/**
				 * Layout option.
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
					'type'              => 'control',
					'control'           => 'ast-radio-image',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'           => $section,
					'default'           => astra_get_option( $section . '-layout', 'layout-1' ),
					'priority'          => 5,
					'context'           => Astra_Builder_Helper::$general_tab,
					'title'             => __( 'Banner Layout', 'astra-addon' ),
					'choices'           => array(
						'layout-1'            => array(
							'label' => __( 'Default', 'astra' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'disabled' ),
						),
						'layout-2' => array(
							'label' => __( 'Banner', 'astra-addon' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'blog-layout-1', false ),
						),
					),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
				),

				/**
				 * Option: Display Post Structure
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'section'           => $section,
					'context'   		=> Astra_Builder_Helper::$general_tab,
					'default'           => astra_get_option( $section . '-structure', array( $section . '-title' ) ),
					'priority'          => 10,
					'title'             => __( 'Structure', 'astra' ),
					'choices'           => array(
						$section . '-title'      => __( 'Title', 'astra' ),
						$section . '-breadcrumb' => __( 'Breadcrumb', 'astra' ),
						$section . '-meta' 		 => __( 'Meta', 'astra' ),
						$section . '-excerpt' 	 => __( 'Excerpt', 'astra' ),
					),
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-metadata]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'default'           => astra_get_option( $section . '-metadata', array( 'comments', 'category', 'author', ) ),
					'context'           => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
							'operator' => 'contains',
							'value'    => $section . '-meta',
						),
					),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
					'section'           => $section,
					'priority'          => 15,
					'title'             => __( 'Meta', 'astra' ),
					'choices'           => array(
						'comments' => __( 'Comments', 'astra' ),
						'category' => __( 'Category', 'astra' ),
						'author'   => __( 'Author', 'astra' ),
						'date'     => __( 'Publish Date', 'astra' ),
						'tag'      => __( 'Tag', 'astra' ),
					),
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
new Astra_Posts_Single_Strctures_Configs();
