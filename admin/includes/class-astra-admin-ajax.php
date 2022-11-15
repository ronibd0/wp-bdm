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

		add_action( 'wp_ajax_ast_disable_pro_notices', array( $this, 'disable_astra_pro_notices' ) );
		add_action( 'wp_ajax_astra_recommended_plugin_install', 'wp_ajax_install_plugin' );
		add_action( 'wp_ajax_ast_migrate_to_builder', array( $this, 'migrate_to_builder' ) );
		add_action( 'wp_ajax_astra_update_admin_setting', array( $this, 'astra_update_admin_setting' ) );
		add_action( 'wp_ajax_astra_recommended_plugin_activate', array( $this, 'required_plugin_activate' ) );
		add_action( 'wp_ajax_astra_recommended_plugin_deactivate', array( $this, 'required_plugin_deactivate' ) );
	}

	/**
	 * Return boolean settings for admin dashboard app.
	 *
	 * @return array
	 * @since x.x.x
	 */
	public function astra_admin_settings_typewise() {
		return apply_filters(
			'astra_admin_settings_datatypes',
			array(
				'self_hosted_gfonts'    => 'bool',
				'preload_local_fonts'   => 'bool',
				'use_old_header_footer' => 'bool',
			)
		);
	}

	/**
	 * Disable pro upgrade notice from all over in Astra.
	 *
	 * @since x.x.x
	 */
	public function disable_astra_pro_notices() {

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

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( __( 'You don\'t have the access', 'astra' ) );
		}

		$migrate = isset( $_POST['status'] ) ? sanitize_key( $_POST['status'] ) : '';
		$migrate = ( 'true' === $migrate ) ? true : false;
		astra_update_option( 'ast-disable-upgrade-notices', $migrate );

		wp_send_json_success();
	}

	/**
	 * Migrate to New Header Builder
	 */
	public function migrate_to_builder() {

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

		$migrate = isset( $_POST['status'] ) ? sanitize_key( $_POST['status'] ) : '';
		$migrate = ( 'true' === $migrate ) ? true : false;
		/** @psalm-suppress InvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$migration_flag = astra_get_option( 'v3-option-migration', false );
		astra_update_option( 'is-header-footer-builder', $migrate );

		if ( $migrate && false === $migration_flag ) {
			require_once ASTRA_THEME_DIR . 'inc/theme-update/astra-builder-migration-updater.php';  // phpcs:ignore WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
			astra_header_builder_migration();
		}

		wp_send_json_success();
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
		$sub_option_key    = isset( $_POST['key'] ) ? sanitize_text_field( wp_unslash( $_POST['key'] ) ) : '';
		$sub_option_value  = '';

		if ( isset( $get_bool_settings[ $sub_option_key ] ) ) {
			if ( 'bool' === $get_bool_settings[ $sub_option_key ] ) {
				$sub_option_value = 'true' === sanitize_text_field( $_POST['value'] ) ? true : false;
			} else {
				$sub_option_value = sanitize_text_field( wp_unslash( $_POST['value'] ) );
			}
		}

		Astra_API_Init::update_admin_settings_option( $sub_option_key, $sub_option_value );

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

	/**
	 * Required Plugin Activate
	 *
	 * @since 1.2.4
	 */
	public function required_plugin_activate() {

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
		if ( ! check_ajax_referer( 'astra_plugin_manager_nonce', 'security', false ) ) {
			$response_data = array( 'messsage' => $this->get_error_msg( 'nonce' ) );
			wp_send_json_error( $response_data );
		}

		if ( ! current_user_can( 'install_plugins' ) || ! isset( $_POST['init'] ) || ! sanitize_text_field( wp_unslash( $_POST['init'] ) ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => __( 'No plugin specified', 'astra' ),
				)
			);
		}

		$plugin_init = ( isset( $_POST['init'] ) ) ? sanitize_text_field( wp_unslash( $_POST['init'] ) ) : '';

		$activate = activate_plugin( $plugin_init, '', false, true );

		if ( is_wp_error( $activate ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $activate->get_error_message(),
				)
			);
		}

		wp_send_json_success(
			array(
				'success' => true,
				'message' => __( 'Plugin Successfully Activated', 'astra' ),
			)
		);
	}

	/**
	 * Required Plugin Activate
	 *
	 * @since 1.2.4
	 */
	public function required_plugin_deactivate() {

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
		if ( ! check_ajax_referer( 'astra_plugin_manager_nonce', 'security', false ) ) {
			$response_data = array( 'messsage' => $this->get_error_msg( 'nonce' ) );
			wp_send_json_error( $response_data );
		}

		if ( ! current_user_can( 'install_plugins' ) || ! isset( $_POST['init'] ) || ! sanitize_text_field( wp_unslash( $_POST['init'] ) ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => __( 'No plugin specified', 'astra' ),
				)
			);
		}

		$plugin_init = ( isset( $_POST['init'] ) ) ? sanitize_text_field( wp_unslash( $_POST['init'] ) ) : '';

		$deactivate = deactivate_plugins( $plugin_init, '', false );

		if ( is_wp_error( $deactivate ) ) {
			wp_send_json_error(
				array(
					'success' => false,
					'message' => $deactivate->get_error_message(),
				)
			);
		}

		wp_send_json_success(
			array(
				'success' => true,
				'message' => __( 'Plugin Successfully Deactivated', 'astra' ),
			)
		);
	}
}

Astra_Admin_Ajax::get_instance();
