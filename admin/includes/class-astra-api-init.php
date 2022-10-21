<?php
/**
 * Class Astra_API_Init.
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Bail if WP_REST_Controller class does not exist.
if ( ! class_exists( 'WP_REST_Controller' ) ) {
	return;
}

class Astra_API_Init extends WP_REST_Controller {

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
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		// REST API extensions init.
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register API routes.
	 *
	 * @since x.x.x
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
	 * @since x.x.x
	 */
	public function get_admin_settings( $request ) {
		$db_option = get_option( 'astra_admin_settings', array() );

		$defaults = array(
			'self_hosted_gfonts' => false,
			'preload_local_fonts' => false,
			'enable_white_label'	=> false,
			'enable_beta'		=> false,
			'plugin_description' => '',
			'plugin_name' => '',
			'theme_screenshot_url' => '',
			'theme_description' => '',
			'theme_name' => '',
			'agency_license_link' => '',
			'agency_author_url' => '',
			'agency_author_name' => '',
		);

		$updated_option = wp_parse_args( $db_option, $defaults );
		return $updated_option;
	}

	/**
	 * Check whether a given request has permission to read notes.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 * @since x.x.x
	 */
	public function get_permissions_check( $request ) {

		if ( ! current_user_can( 'edit_theme_options' ) ) {
			// return new WP_Error( 'astra_rest_cannot_view', __( 'Sorry, you cannot list resources.', 'astra' ), array( 'status' => rest_authorization_required_code() ) );
		}

		return true;
	}
}

Astra_API_Init::get_instance();
