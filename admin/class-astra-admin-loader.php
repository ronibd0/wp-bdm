<?php
/**
 * Astra Admin Loader
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Astra_Admin_Loader
 *
 * @since x.x.x
 */
class Astra_Admin_Loader {

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class object.
	 * @since x.x.x
	 */
	private static $instance;

	/**
	 * Option name
	 *
	 * @access private
	 * @var string $option_name DB option name.
	 * @since x.x.x
	 */
	private static $option_name = 'astra_admin_settings';

	/**
	 * Admin settings dataset
	 *
	 * @access private
	 * @var array $astra_admin_settings Settings array.
	 * @since x.x.x
	 */
	private static $astra_admin_settings = array();

	/**
	 * Initiator
	 *
	 * @since x.x.x
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		self::$astra_admin_settings = get_option( self::$option_name, array() );

		define( 'ASTRA_THEME_ADMIN_DIR', ASTRA_THEME_DIR . 'admin/' );
		define( 'ASTRA_THEME_ADMIN_URL', ASTRA_THEME_URI . 'admin/' );

		$this->includes();
	}

	/**
	 * Include required classes.
	 *
	 * @since x.x.x
	 */
	public function includes() {
		if ( is_admin() ) {
			/* Ajax init */
			require_once ASTRA_THEME_ADMIN_DIR . 'includes/class-astra-admin-ajax.php';

			/* Setup Menu */
			require_once ASTRA_THEME_ADMIN_DIR . 'includes/class-astra-menu.php';
		}
	}

	/**
	 * Returns an value,
	 * based on the settings database option for the admin settings page.
	 *
	 * @param  string  $key     The sub-option key.
	 * @param  mixed   $default Option default value if option is not available.
	 * @return mixed            Return the option value based on provided key
	 * @since x.x.x
	 */
	public static function get_admin_settings_option( $key, $default = false ) {
		$value = isset( self::$astra_admin_settings[ $key ] ) ? self::$astra_admin_settings[ $key ] : $default;
		return $value;
	}

	/**
	 * Update an value of a key,
	 * from the settings database option for the admin settings page.
	 *
	 * @param string $key       The option key.
	 * @param mixed  $value     The value to update.
	 * @return mixed            Return the option value based on provided key
	 * @since x.x.x
	 */
	public static function update_admin_settings_option( $key, $value ) {
		$astra_admin_updated_settings = get_option( self::$option_name, array() );
		$astra_admin_updated_settings[ $key ] = $value;
		update_option( self::$option_name, $astra_admin_updated_settings );
	}
}

Astra_Admin_Loader::get_instance();
