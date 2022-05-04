<?php
/**
 * Styling Options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since       Astra 3.7.0
 */

/** @psalm-suppress ParadoxicalCondition **/ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Customizer Sanitizes Initial setup
 */
class Astra_Global_Typo_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Body Typography Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since 1.4.3
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_configs = array(

			/**
			 * Option: Font Family
			 */
			array(
				'name'      => 'astra-typography-presets',
				'type'      => 'control',
				'control'   => 'ast-typography-presets',
				'default'   => astra_get_typography_presets(),
				'options'   => Astra_Font_Families::astra_typo_preset_options(),
				'section'   => astra_has_gcp_typo_preset_compatibility() ? 'section-typography' : 'section-body-typo',
				'transport' => 'postMessage',
				'priority'  => 5,
				'title'     => __( 'Presets', 'astra' ),
				'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
			),

		);

		return array_merge( $configurations, $_configs );
	}
}

new Astra_Global_Typo_Configs();
