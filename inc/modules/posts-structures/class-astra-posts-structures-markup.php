<?php
/**
 * Hero section layout for Astra theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2022, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Breadcrumbs Markup Initial Setup
 *
 * @since x.x.x
 */
class Astra_Posts_Strctures_Markup {

	/**
	 *  Constructor
	 */
	public function __construct() {
		add_action( 'astra_content_before', array( $this, 'astra_add_hero_section_markup' ), 99 );
	}

	/**
	 * Check eligibility to override default entry header.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function astra_add_hero_section_markup() {
		if ( apply_filters( 'astra_apply_hero_header_banner', true ) ) {
			$this->override_entry_header();
		}
	}

	/**
	 * Check if current page is latest posts page or blog page.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function is_blog_latest_posts_page() {
		if ( ! is_front_page() && is_home() ) {
			return true;
		}
		return false;
	}

	/**
	 * Override default entry header.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function override_entry_header() {
		global $post;
		if ( is_null( $post ) ) {
			return;
		}

		$post_type = $post->post_type;
		$type      = is_singular( $post_type ) ? 'single' : 'archive';

		$supported_post_types = Astra_Posts_Strctures_Loader::get_supported_post_types();
		if ( ! in_array( $post_type, $supported_post_types ) ) {
			return;
		}

		// If banner title section is disabled then halt further processing.
		if ( 'single' === $type ) {
			if ( false === astra_get_option( 'ast-single-' . $post_type . '-title', true ) ) {
				add_filter( 'astra_display_single_layout1_header_banner', '__return_false' );
				return;
			}
		} else {
			if ( false === astra_get_option( 'ast-archive-' . $post_type . '-title', true ) ) {
				add_filter( 'astra_the_title_enabled', '__return_false' );
				return;
			}
		}

		$layout_type = ( 'single' === $type ) ? astra_get_option( 'ast-dynamic-single-' . $post_type . '-layout', 'layout-1' ) : astra_get_option( 'ast-dynamic-archive-' . $post_type . '-layout', 'default' );

		if ( 'single' === $type && 'layout-2' === $layout_type ) {

			do_action( 'astra_before_single_' . $post_type . '_banner_content' );

			get_template_part( 'template-parts/single-banner' );

			do_action( 'astra_after_single_' . $post_type . '_banner_content' );

			add_filter( 'astra_remove_entry_header_content', '__return_true' );
			add_filter( 'astra_display_single_layout1_header_banner', '__return_false' );

		} elseif ( $this->is_blog_latest_posts_page() ) {

			if ( true === astra_get_option( 'ast-dynamic-archive-post-banner-on-blog', false ) ) {

				do_action( 'astra_before_archive_' . $post_type . '_banner_content' );

				get_template_part( 'template-parts/archive-banner' );

				do_action( 'astra_after_archive_' . $post_type . '_banner_content' );
			}
		} elseif ( class_exists( 'WooCommerce' ) && ( is_shop() || is_product_taxonomy() ) ) {

			add_filter( 'woocommerce_show_page_title', '__return_false' );

			remove_action(
				'woocommerce_before_main_content',
				'woocommerce_breadcrumb',
				20
			);

			remove_action(
				'woocommerce_archive_description',
				'woocommerce_taxonomy_archive_description'
			);

			remove_action(
				'woocommerce_archive_description',
				'woocommerce_product_archive_description'
			);

			do_action( 'astra_before_archive_' . $post_type . '_banner_content' );

			get_template_part( 'template-parts/archive-banner' );

			do_action( 'astra_after_archive_' . $post_type . '_banner_content' );

		} elseif ( 'archive' === $type ) {

			do_action( 'astra_before_archive_' . $post_type . '_banner_content' );

			get_template_part( 'template-parts/archive-banner' );

			do_action( 'astra_after_archive_' . $post_type . '_banner_content' );
		}
	}
}

new Astra_Posts_Strctures_Markup();
