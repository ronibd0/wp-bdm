<?php
/**
 * Class Astra_Menu.
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Astra_Menu {

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
	 * Menu page title
	 *
	 * @since 1.0
	 * @var array $menu_page_title
	 */
	public static $menu_page_title;

	/**
	 * Page title
	 *
	 * @since 1.0
	 * @var string $page_title
	 */
	public static $page_title = 'Astra';

	/**
	 * Plugin slug
	 *
	 * @since 1.0
	 * @var array $plugin_slug
	 */
	public static $plugin_slug = 'astra';

	/**
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->initialize_hooks();
	}

	/**
	 * Init Hooks.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function initialize_hooks() {

		self::$menu_page_title = apply_filters( 'astra_menu_page_title', __( 'Astra Options', 'astra' ) );
		self::$page_title      = apply_filters( 'astra_page_title', __( 'Astra', 'astra' ) );
		self::$plugin_slug     = self::get_theme_page_slug();

		add_action( 'admin_menu', array( $this, 'setup_menu' ) );
		add_action( 'admin_init', array( $this, 'settings_admin_scripts' ) );

		add_action( 'after_setup_theme', array( $this, 'init_admin_settings' ), 99 );

		/* Start dashboard view. */
		add_action( 'astra_render_admin_page_content', array( $this, 'render_content' ), 10, 2 );
	}

	/**
	 * Admin settings init.
	 *
	 * @since x.x.x
	 */
	public function init_admin_settings() {
		if ( ! is_customize_preview() ) {
			add_action( 'admin_head', array( $this, 'admin_submenu_css' ) );
		}
	}

	/**
	 * Add custom CSS for admin area sub menu icons.
	 *
	 * @since x.x.x
	 */
	public function admin_submenu_css() {
		echo '<style class="astra-menu-appearance-style">
				#toplevel_page_astra li a[href^="admin.php?page=astra&path=settings"]:after {
					border-bottom: 1px solid hsla(0,0%,100%,.2);
					display: block;
					float: left;
					margin: 13px -15px 8px;
					content: "";
					width: calc(100% + 26px);
				}
				#adminmenu #toplevel_page_astra ul.wp-submenu-wrap li {
					clear: both;
				}
				#toplevel_page_astra .wp-menu-image.svg {
					background-size: 18px auto !important;
				}
			</style>';
	}

	/**
	 * Theme options page Slug getter including White Label string.
	 *
	 * @since x.x.x
	 * @return string Theme Options Page Slug.
	 */
	public static function get_theme_page_slug() {
		return apply_filters( 'astra_theme_page_slug', self::$plugin_slug );
	}

	/**
	 *  Initialize after Astra gets loaded.
	 *
	 * @since x.x.x
	 */
	public function settings_admin_scripts() {
		// Enqueue admin scripts.
		if ( ! empty( $_GET['page'] ) && ( self::$plugin_slug === $_GET['page'] || false !== strpos( $_GET['page'], self::$plugin_slug . '_' ) ) ) { //phpcs:ignore
			add_action( 'admin_enqueue_scripts', array( $this, 'styles_scripts' ) );
			add_filter( 'admin_footer_text', array( $this, 'add_footer_link' ), 99 );
		}
	}

	/**
	 * Add submenu to admin menu.
	 *
	 * @since x.x.x
	 */
	public function setup_menu() {
		global $submenu;
		$capability = 'manage_options';

		if ( ! current_user_can( $capability ) ) {
			return;
		}

		$astra_icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDE4QzEzLjk3MDcgMTggMTggMTMuOTcwNyAxOCA5QzE4IDQuMDI5MyAxMy45NzA3IDAgOSAwQzQuMDI5MyAwIDAgNC4wMjkzIDAgOUMwIDEzLjk3MDcgNC4wMjkzIDE4IDkgMThaTTQgMTIuOTk4TDguMzk2IDRMOS40NDE0MSA2LjAzMTI1TDUuODgzNzkgMTIuOTk4SDRaTTguNTM0NjcgMTEuMzc1TDEwLjM0OTEgNy43MjA3TDEzIDEzSDEwLjk3NzFMMTAuMjc5MyAxMS40NDM0SDguNTM0NjdIOC41TDguNTM0NjcgMTEuMzc1WiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K';

		add_menu_page(
			self::$page_title,
			self::$page_title,
			$capability,
			self::$plugin_slug,
			array( $this, 'render_admin_dashboard' ),
			$astra_icon,
			2
		);

		// Add Customize submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Customize', 'astra' ),
			__( 'Customize', 'astra' ),
			$capability,
			'customize.php'
		);

		// Add Modules submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Modules', 'astra' ),
			__( 'Modules', 'astra' ),
			$capability,
			'admin.php?page=' . self::$plugin_slug . '&path=modules'
		);

		// Add Settings submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Settings', 'astra' ),
			__( 'Settings', 'astra' ),
			$capability,
			'admin.php?page=' . self::$plugin_slug . '&path=settings'
		);

		// Add Custom Layout submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Custom Layouts', 'astra' ),
			__( 'Custom Layouts', 'astra' ),
			$capability,
			'admin.php?page=' . self::$plugin_slug . '&path=custom-layouts'
		);

		// Add Page Header submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Page Header', 'astra' ),
			__( 'Page Header', 'astra' ),
			$capability,
			'admin.php?page=' . self::$plugin_slug . '&path=page-header'
		);

		// Add Starter Templates submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Starter Templates', 'astra' ),
			__( 'Starter Templates', 'astra' ),
			$capability,
			'admin.php?page=' . self::$plugin_slug . '&path=starter-templates'
		);

		// Rename to Home menu.
		$submenu[self::$plugin_slug][0][0] = __('Dashboard', 'astra');
	}

	/**
	 * Renders the admin settings.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function render_admin_dashboard() {
		$page_action    = '';
		$menu_page_slug = ( ! empty( $_GET['page'] ) ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : self::$plugin_slug; //phpcs:ignore

		if ( isset( $_GET['action'] ) ) { //phpcs:ignore
			$page_action = sanitize_text_field( wp_unslash( $_GET['action'] ) ); //phpcs:ignore
			$page_action = str_replace( '_', '-', $page_action );
		}

		include_once ASTRA_THEME_ADMIN_DIR . 'views/admin-base.php';
	}

	/**
	 * Renders the admin settings content.
	 *
	 * @since x.x.x
	 * @param sting $menu_page_slug current page name.
	 * @param sting $page_action current page action.
	 *
	 * @return void
	 */
	public function render_content( $menu_page_slug, $page_action ) {
		if ( self::$plugin_slug === $menu_page_slug ) {
			include_once ASTRA_THEME_ADMIN_DIR . 'views/dashboard-app.php';
		}
	}

	/**
	 * Enqueues the needed CSS/JS for the builder's admin settings page.
	 *
	 * @since x.x.x
	 */
	public function styles_scripts() {

		wp_enqueue_style( 'astra-admin-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap', array(), ASTRA_THEME_VERSION ); // Styles.

		wp_enqueue_style( 'wp-components' );

		$localize = apply_filters(
			'astra_react_admin_localize',
			array(
				'current_user'             => ! empty( wp_get_current_user()->user_firstname ) ? ucfirst( wp_get_current_user()->user_firstname ) : ucfirst( wp_get_current_user()->display_name ),
				'admin_base_url'           => admin_url(),
				'plugin_dir'               => ASTRA_THEME_URI,
				'plugin_ver'               => ASTRA_THEME_VERSION,
				'ajax_url'                 => admin_url( 'admin-ajax.php' ),
				'is_whitelabel'			   => astra_is_white_labelled(),

				'admin_url'                => admin_url( 'admin.php' ),
				'home_slug'                => self::$plugin_slug,
				'customize_url'                => admin_url( 'customize.php' ),
				'astra_base_url' => admin_url( 'admin.php?page=' . self::$plugin_slug ),
				'changelog_data' => self::get_changelog_feed_data(),
				'logo_url'       => ASTRA_THEME_URI . 'inc/assets/images/astra-logo.svg',
			)
		);

		$this->settings_app_scripts( $localize );
	}

	/**
	 * Get Changelogs from API.
	 *
	 * @since x.x.x
	 * @return array $changelog_data Changelog Data.
	 */
	public static function get_changelog_feed_data() {
		$posts          = json_decode( wp_remote_retrieve_body( wp_remote_get( 'https://wpastra.com/wp-json/wp/v2/changelog?per_page=3' ) ) );
		$changelog_data = array();

		if ( isset( $posts ) && is_array( $posts ) ) {
			foreach ( $posts as $post ) {

				$changelog_data[] = array(
					'title'       => $post->title->rendered,
					'date'        => gmdate( 'l F j, Y', strtotime( $post->date ) ),
					'description' => $post->content->rendered,
					'link'        => $post->link,
				);
			}
		}

		return $changelog_data;
	}

	/**
	 * Get plugin status
	 *
	 * @since x.x.x
	 *
	 * @param  string $plugin_init_file Plguin init file.
	 * @return mixed
	 */
	public function get_plugin_status( $plugin_init_file ) {

		$installed_plugins = get_plugins();

		if ( ! isset( $installed_plugins[ $plugin_init_file ] ) ) {
			return 'not-installed';
		} elseif ( is_plugin_active( $plugin_init_file ) ) {
			return 'active';
		} else {
			return 'inactive';
		}
	}

	/**
	 * Settings app scripts
	 *
	 * @since x.x.x
	 * @param array $localize Variable names.
	 */
	public function settings_app_scripts( $localize ) {
		$handle            = 'astra-admin-settings';
		$build_path        = ASTRA_THEME_ADMIN_DIR . 'assets/build/';
		$build_url         = ASTRA_THEME_ADMIN_URL . 'assets/build/';
		$script_asset_path = $build_path . 'dashboard-app.asset.php';

		$script_info       = file_exists( $script_asset_path ) ? include $script_asset_path : array(
			'dependencies' => array(),
			'version'      => ASTRA_THEME_VERSION,
		);

		$script_dep = array_merge( $script_info['dependencies'], array( 'updates' ) );

		wp_register_script(
			$handle,
			$build_url . 'dashboard-app.js',
			$script_dep,
			$script_info['version'],
			true
		);

		wp_register_style(
			$handle,
			$build_url . 'dashboard-app.css',
			array(),
			ASTRA_THEME_VERSION
		);

		wp_register_style(
			'astra-admin-google-fonts',
			'https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap',
			array(),
			ASTRA_THEME_VERSION
		);

		wp_enqueue_script( $handle );

		wp_set_script_translations( $handle, 'astra' );

		wp_enqueue_style( 'astra-admin-google-fonts' );
		wp_enqueue_style( $handle );

		wp_style_add_data( $handle, 'rtl', 'replace' );

		wp_localize_script( $handle, 'astra_admin', $localize );
	}

	/**
	 *  Add footer link.
	 *
	 * @since x.x.x
	 */
	public function add_footer_link() {
		echo '<span id="footer-thankyou"> Thank you for using <a href="#" class="focus:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover"> Astra.</a></span>';
	}
}

Astra_Menu::get_instance();
