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
	 * Override default entry header.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function override_entry_header() {
		global $post;
		if( is_null( $post ) ) {
			return;
		}

		$post_type = $post->post_type;

		$type = 'archive';
		$layout_type = astra_get_option( 'ast-archive-' . $post_type . '-layout', 'default' );
		if( is_single() ) {
			$type = 'single';
			$layout_type = astra_get_option( 'ast-single-' . $post_type . '-layout', 'layout-1' );
		}

		if ( 'single' === $type && 'layout-2' === $layout_type ) {

			do_action( 'astra_before_single_' . $post_type . '_banner_content' );

			get_template_part( 'template-parts/single-banner' );

			do_action( 'astra_after_single_' . $post_type . '_banner_content' );

			add_filter( 'astra_remove_entry_header_content', '__return_true' );

		} elseif ( 'archive' === $type && 'default' !== $layout_type ) {

			do_action( 'astra_before_archive_' . $post_type . '_banner_content' );

			get_template_part( 'template-parts/archive-banner' );

			do_action( 'astra_after_archive_' . $post_type . '_banner_content' );

			remove_action( 'astra_archive_header', 'astra_archive_page_info' );
		}
	}
}

new Astra_Posts_Strctures_Markup();
