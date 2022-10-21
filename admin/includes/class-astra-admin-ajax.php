<?php
/**
 * Astra Admin Ajax Base.
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Astra_Admin_Ajax.
 *
 * @since x.x.x
 */
class Astra_Admin_Ajax {

	/**
	 * Ajax action prefix.
	 *
	 * @var string
	 * @since x.x.x
	 */
	private $prefix = 'astra';

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class object.
	 * @since x.x.x
	 */
	private static $instance;

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
	 * Erros class instance.
	 *
	 * @var object
	 * @since x.x.x
	 */
	private $errors = array();

	/**
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->errors = array(
			'permission' => __( 'Sorry, you are not allowed to do this operation.', 'astra' ),
			'nonce'      => __( 'Nonce validation failed', 'astra' ),
			'default'    => __( 'Sorry, something went wrong.', 'astra' ),
			'invalid'    => __( 'No post data found!', 'astra' ),
		);
		add_action( 'wp_ajax_astra_update_admin_setting', array( $this, 'astra_update_admin_setting' ) );
	}

	/**
	 * Return boolean settings for admin dashboard app.
	 *
	 * @return array
	 * @since x.x.x
	 */
	public function astra_admin_settings_typewise() {
		return array(
			'self_hosted_gfonts' => 'bool',
			'preload_local_fonts' => 'bool',
		);
	}

	/**
	 * Save settings.
	 *
	 * @return void
	 * @since x.x.x
	 */
	public function astra_update_admin_setting() {

		$response_data = array( 'messsage' => $this->get_error_msg( 'permission' ) );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( $response_data );
		}

		if ( empty( $_POST ) ) {
			$response_data = array( 'messsage' => $this->get_error_msg( 'invalid' ) );
			wp_send_json_error( $response_data );
		}

		/**
		 * Nonce verification.
		 */
		if ( ! check_ajax_referer( 'astra_update_admin_setting', 'security', false ) ) {
			$response_data = array( 'messsage' => $this->get_error_msg( 'nonce' ) );
			wp_send_json_error( $response_data );
		}

		$get_bool_settings = $this->astra_admin_settings_typewise();
		$sub_option_key = isset( $_POST['key'] ) ? sanitize_text_field( wp_unslash( $_POST['key'] ) ) : '';

		if ( isset( $get_bool_settings[$sub_option_key] ) && 'bool' === $get_bool_settings[$sub_option_key] ) {
			Astra_Admin_Loader::update_admin_settings_option( $sub_option_key, isset( $_POST['value'] ) ? (bool) sanitize_text_field( wp_unslash( $_POST['value'] ) ) : '' );
		} else {
			Astra_Admin_Loader::update_admin_settings_option( $sub_option_key, sanitize_text_field( wp_unslash( $_POST['value'] ) ) );
		}

		$response_data = array(
			'messsage' => __( 'Successfully saved data!', 'astra' ),
		);

		wp_send_json_success( $response_data );
	}

	/**
	 * Get ajax error message.
	 *
	 * @param string $type Message type.
	 * @return string
	 * @since x.x.x
	 */
	public function get_error_msg( $type ) {

		if ( ! isset( $this->errors[ $type ] ) ) {
			$type = 'default';
		}

		return $this->errors[ $type ];
	}
}

Astra_Admin_Ajax::get_instance();
