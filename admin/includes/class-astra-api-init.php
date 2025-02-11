<?php
/**
 * Class Astra_API_Init.
 *
 * @package Astra
 * @since 4.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Bail if WP_REST_Controller class does not exist.
if ( ! class_exists( 'WP_REST_Controller' ) ) {
	return;
}
/**
 * Astra_API_Init.
 *
 * @since x.x.x
 */
class Astra_API_Init extends WP_REST_Controller {

	/**
	 * Instance
	 *
	 * @access private
	 * @var null $instance
	 * @since 4.0.0
	 */
	private static $instance;

	/**
	 * Initiator
	 *
	 * @since 4.0.0
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'astra/v1';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = '/admin/settings/';

	/**
	 * Option name
	 *
	 * @access private
	 * @var string $option_name DB option name.
	 * @since 4.0.0
	 */
	private static $option_name = 'astra_admin_settings';

	/**
	 * Admin settings dataset
	 *
	 * @access private
	 * @var array $astra_admin_settings Settings array.
	 * @since 4.0.0
	 */
	private static $astra_admin_settings = array();

	/**
	 * Constructor
	 *
	 * @since 4.0.0
	 */
	public function __construct() {
		self::$astra_admin_settings = get_option( self::$option_name, array() );

		// REST API extensions init.
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );

		add_action( 'astra_get_knowledge_base_data', array( $this, 'astra_kb_data_scheduler' ) );
		add_action( 'init', array( $this, 'astra_run_scheduled_docs_job' ) );
	}

	/**
	 * Astra's REST knowledge base data.
	 *
	 * @since 4.0.0
	 * @return mixed
	 */
	public static function astra_get_knowledge_base_data() {
		return json_decode( wp_remote_retrieve_body( wp_remote_get( 'https://wpastra.com/wp-json/powerful-docs/v1/get-docs' ) ) );
	}

	/**
	 * Perform scheduler for Astra knowledge base data retriever for processing further in admin dashboard.
	 *
	 * @since 4.0.0
	 * @return void
	 */
	public function astra_kb_data_scheduler() {
		update_option( 'astra_docs_data', self::astra_get_knowledge_base_data() );
	}

	/**
	 * Run scheduled job for Astra knowledge base data.
	 *
	 * @since 4.0.0
	 * @return void
	 */
	public function astra_run_scheduled_docs_job() {
		if ( ! wp_next_scheduled( 'astra_get_knowledge_base_data' ) && ! wp_installing() ) {
			wp_schedule_event( time(), 'daily', 'astra_get_knowledge_base_data' ); // phpcs:ignore WPThemeReview.PluginTerritory.ForbiddenFunctions.cron_functionality_wp_schedule_event -- Needed for optimizing performance by avoiding data fetch for every reload.
		}
	}

	/**
	 * Register API routes.
	 *
	 * @since 4.0.0
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_admin_settings' ),
					'permission_callback' => array( $this, 'get_permissions_check' ),
					'args'                => array(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Get common settings.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return array $updated_option defaults + set DB option data.
	 *
	 * @since 4.0.0
	 */
	public function get_admin_settings( $request ) {
		$db_option = get_option( 'astra_admin_settings', array() );

		$defaults = apply_filters(
			'astra_dashboard_rest_options',
			array(
				'self_hosted_gfonts'    => self::get_admin_settings_option( 'self_hosted_gfonts', false ),
				'preload_local_fonts'   => self::get_admin_settings_option( 'preload_local_fonts', false ),
				'use_old_header_footer' => astra_get_option( 'is-header-footer-builder', false ),
				'use_upgrade_notices'   => astra_showcase_upgrade_notices(),
			)
		);

		$updated_option = wp_parse_args( $db_option, $defaults );
		return $updated_option;
	}

	/**
	 * Check whether a given request has permission to read notes.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 * @since 4.0.0
	 */
	public function get_permissions_check( $request ) {

		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new WP_Error( 'astra_rest_cannot_view', __( 'Sorry, you cannot list resources.', 'astra' ), array( 'status' => rest_authorization_required_code() ) );
		}

		return true;
	}

	/**
	 * Returns an value,
	 * based on the settings database option for the admin settings page.
	 *
	 * @param  string $key     The sub-option key.
	 * @param  mixed  $default Option default value if option is not available.
	 * @return mixed            Return the option value based on provided key
	 * @since 4.0.0
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
	 * @since 4.0.0
	 */
	public static function update_admin_settings_option( $key, $value ) {
		$astra_admin_updated_settings         = get_option( self::$option_name, array() );
		$astra_admin_updated_settings[ $key ] = $value;
		update_option( self::$option_name, $astra_admin_updated_settings );
	}
}

Astra_API_Init::get_instance();
