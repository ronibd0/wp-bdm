<?php
/**
 * WooCommerce Options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Woo_Shop_Single_Layout_Configs' ) ) {


	/**
	 * Customizer Sanitizes Initial setup
	 */
	class Astra_Woo_Shop_Single_Layout_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Astra-WooCommerce Shop Single Layout Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$product_divider_title = defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'woocommerce' ) ? __( 'Product Structure Options', 'astra' ) : __( 'Product Options', 'astra' );


			$clonning_attr    = array();
			$add_to_cart_attr = array();

			/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			if ( defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'woocommerce' ) ) {

				/**
				 * Single product payment control.
				 */

				$clonning_attr['single-product-payments'] = array(
					'clone'       => false,
					'is_parent'   => true,
					'main_index'  => 'single-product-payments',
					'clone_limit' => 2,
					'title'       => __( 'Payments', 'astra' ),
				);

				/**
				 * Single product extras control.
				 */
				$clonning_attr['summary-extras'] = array(
					'clone'       => false,
					'is_parent'   => true,
					'main_index'  => 'summary-extras',
					'clone_limit' => 2,
					'title'       => __( 'Extras', 'astra' ),
				);

			}

			/**
			 * Single product add to cart control.
			 */
			$add_to_cart_attr['add_cart'] = array(
				'clone'       => false,
				'is_parent'   => true,
				'main_index'  => 'add_cart',
				'clone_limit' => 2,
				'title'       => __( 'Add To Cart', 'astra' ),
			);

			$_configs = array(

				/**
				 * Option: Divider.
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[woo-single-product-structure-divider]',
					'section'  => 'section-woo-shop-single',
					'title'    => __( 'Single Product Structure', 'astra' ),
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 15,
					'settings' => array(),
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),

				
				/**
				 * Option: Single Post Meta
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[single-product-structure]',
					'default'           => astra_get_option( 'single-product-structure' ),
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'section'           => 'section-woo-shop-single',
					'priority'          => 15,
					'choices'           => array_merge(
						array(
							'title'   => __( 'Title', 'astra' ),
							'price'   => __( 'Price', 'astra' ),
							'ratings' => __( 'Ratings', 'astra' ),
						),
						$add_to_cart_attr,
						array(
							'short_desc' => __( 'Short Description', 'astra' ),
							'meta'       => __( 'Meta', 'astra' ),
							'category'   => __( 'Category', 'astra' ),
						),
						$clonning_attr
					),
					'divider'           => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				 * Option: Divider.
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[woo-single-product-structure-fields-divider]',
					'section'  => 'section-woo-shop-single',
					'title'    => $product_divider_title,
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 16,
					'settings' => array(),
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				* Option: Disable Breadcrumb
				*/
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[single-product-breadcrumb-disable]',
					'section'  => 'section-woo-shop-single',
					'type'     => 'control',
					'control'  => 'ast-toggle-control',
					'default'  => astra_get_option( 'single-product-breadcrumb-disable' ),
					'title'    => __( 'Enable Breadcrumb', 'astra' ),
					'priority' => 16,
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				 * Option: Enable free shipping
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[single-product-enable-shipping]',
					'default'     => astra_get_option( 'single-product-enable-shipping' ),
					'type'        => 'control',
					'section'     => 'section-woo-shop-single',
					'title'       => __( 'Enable Shipping Text', 'astra' ),
					'description' => __( 'Adds shipping text next to the product price.', 'astra' ),
					'control'     => 'ast-toggle-control',
					'priority'    => 16,
				),

				/**
				* Option: Single page variation tab layout.
				*/
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[single-product-variation-tabs-layout]',
					'default'     => astra_get_option( 'single-product-variation-tabs-layout' ),
					'type'        => 'control',
					'section'     => 'section-woo-shop-single',
					'title'       => __( 'Product Variation Layout', 'astra' ),
					'description' => __( 'Changes single product variation layout to be displayed inline or stacked.', 'astra' ),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
					),
					'control'     => 'ast-selector',
					'priority'    => 17,
					'choices'     => array(
						'horizontal' => __( 'Inline', 'astra' ),
						'vertical'   => __( 'Stack', 'astra' ),
					),
					'renderAs'    => 'text',
					'responsive'  => false,
				),


				/**
				 * Option: Disable Transparent Header on WooCommerce Product pages
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[transparent-header-disable-woo-products]',
					'default'  => astra_get_option( 'transparent-header-disable-woo-products' ),
					'type'     => 'control',
					'section'  => 'section-transparent-header',
					'title'    => __( 'Disable on WooCommerce Product Pages?', 'astra' ),
					'context'  => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[transparent-header-enable]',
							'operator' => '==',
							'value'    => '1',
						),
					),
					'priority' => 26,
					'control'  => 'ast-toggle-control',
				),

				/**
				 * Option: Free shipping text
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[single-product-shipping-text]',
					'default'  => astra_get_option( 'single-product-shipping-text' ),
					'type'     => 'control',
					'section'  => 'section-woo-shop-single',
					'title'    => __( 'Shipping Text', 'astra' ),
					'context'  => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[single-product-enable-shipping]',
							'operator' => '==',
							'value'    => true,
						),
					),
					'control'  => 'text',
					'priority' => 16,
					'divider'  => array( 'ast_class' => 'ast-bottom-spacing' ),
				),
			);

			/**
			* Option: Button width option
			*/

			$_configs[] = array(
				'name'        => 'single-product-cart-button-width',
				'parent'      => ASTRA_THEME_SETTINGS . '[single-product-structure]',
				'default'     => astra_get_option( 'single-product-cart-button-width' ),
				'linked'      => 'add_cart',
				'type'        => 'sub-control',
				'control'     => 'ast-responsive-slider',
				'responsive'  => true,
				'section'     => 'section-woo-shop-single',
				'priority'    => 11,
				'title'       => __( 'Button Width', 'astra' ),
				'transport'   => 'postMessage',
				'suffix'      => '%',
				'input_attrs' => array(
					'min'  => 1,
					'step' => 1,
					'max'  => 100,
				),
			);

			return array_merge( $configurations, $_configs );

		}
	}
}

new Astra_Woo_Shop_Single_Layout_Configs();


