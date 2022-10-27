<?php
/**
 * Astra Builder Admin Loader.
 *
 * @package astra-builder
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Astra_Builder_Admin.
 */
final class Astra_Builder_Admin {

	/**
	 * Member Variable
	 *
	 * @var instance
	 */
	private static $instance = null;

	/**
	 *  Initiator
	 */
	public static function get_instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'astra_welcome_page_content', array( $this, 'migrate_to_builder_box' ), 5 );
	}

	/**
	 * Migrate to New Header Builder
	 *
	 * @since 3.0.0
	 * @return void
	 */
	public function migrate_to_builder_box() {
		if ( Astra_Builder_Helper::is_new_user() ) {
			add_filter( 'astra_quick_settings', array( $this, 'update_customizer_header_footer_link' ) );
		}
	}

	/**
	 * Update Customizer Header Footer quick links from options page.
	 *
	 * @since 3.0.0
	 * @param array $args default Header Footer quick links.
	 * @return array updated Header Footer quick links.
	 */
	public function update_customizer_header_footer_link( $args ) {
		if ( isset( $args['header']['quick_url'] ) ) {
			$args['header']['quick_url'] = admin_url( 'customize.php?autofocus[panel]=panel-header-builder-group' );
		}
		if ( isset( $args['footer']['quick_url'] ) ) {
			$args['footer']['quick_url'] = admin_url( 'customize.php?autofocus[panel]=panel-footer-builder-group' );
		}
		return $args;
	}
}

/**
 *  Prepare if class 'Astra_Builder_Admin' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
Astra_Builder_Admin::get_instance();
