<?php
/**
 * Class Astra_Menu.
 *
 * @package Astra
 * @since 4.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Astra_Menu.
 *
 * @since x.x.x
 */
class Astra_Menu {

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
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			self::$instance = new self();
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		}
		return self::$instance;
	}

	/**
	 * Page title
	 *
	 * @since 4.0.0
	 * @var string $page_title
	 */
	public static $page_title = 'Astra';

	/**
	 * Plugin slug
	 *
	 * @since 4.0.0
	 * @var string $plugin_slug
	 */
	public static $plugin_slug = 'astra';

	/**
	 * Constructor
	 *
	 * @since 4.0.0
	 */
	public function __construct() {
		$this->initialize_hooks();
	}

	/**
	 * Init Hooks.
	 *
	 * @since 4.0.0
	 * @return void
	 */
	public function initialize_hooks() {

		self::$page_title  = apply_filters( 'astra_page_title', __( 'Astra', 'astra' ) );
		self::$plugin_slug = self::get_theme_page_slug();

		add_action( 'admin_menu', array( $this, 'setup_menu' ) );
		add_action( 'admin_init', array( $this, 'settings_admin_scripts' ) );

		add_action( 'after_setup_theme', array( $this, 'init_admin_settings' ), 99 );
	}

	/**
	 * Admin settings init.
	 *
	 * @since 4.0.0
	 */
	public function init_admin_settings() {
		if ( ! is_customize_preview() ) {
			add_action( 'admin_head', array( $this, 'admin_submenu_css' ) );
		}
	}

	/**
	 * Add custom CSS for admin area sub menu icons.
	 *
	 * @since 4.0.0
	 */
	public function admin_submenu_css() {
		echo '<style class="astra-menu-appearance-style">
				#toplevel_page_' . esc_attr( self::$plugin_slug ) . ' .wp-menu-image.svg {
					background-size: 18px auto !important;
				}
			</style>';
	}

	/**
	 * Theme options page Slug getter including White Label string.
	 *
	 * @since 4.0.0
	 * @return string Theme Options Page Slug.
	 */
	public static function get_theme_page_slug() {
		return apply_filters( 'astra_theme_page_slug', self::$plugin_slug );
	}

	/**
	 *  Initialize after Astra gets loaded.
	 *
	 * @since 4.0.0
	 */
	public function settings_admin_scripts() {
		// Enqueue admin scripts.
		/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		if ( ! empty( $_GET['page'] ) && ( self::$plugin_slug === $_GET['page'] || false !== strpos( $_GET['page'], self::$plugin_slug . '_' ) ) ) { //phpcs:ignore
			/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			add_action( 'admin_enqueue_scripts', array( $this, 'styles_scripts' ) );
			add_filter( 'admin_footer_text', array( $this, 'astra_admin_footer_link' ), 99 );
		}
	}

	/**
	 * Add submenu to admin menu.
	 *
	 * @since 4.0.0
	 */
	public function setup_menu() {
		global $submenu;

		$capability = 'manage_options';

		if ( ! current_user_can( $capability ) ) {
			return;
		}

		$astra_icon = apply_filters( 'astra_menu_icon', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2E3YWFhZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAyMEMxNS41MjI4IDIwIDIwIDE1LjUyMjggMjAgMTBDMjAgNC40NzcxNSAxNS41MjI4IDAgMTAgMEM0LjQ3NzE1IDAgMCA0LjQ3NzE1IDAgMTBDMCAxNS41MjI4IDQuNDc3MTUgMjAgMTAgMjBaTTUuODczMDQgMTEuMTY0MUM3LjIwMjM0IDguNDQyNzggOC41MzE4MSA1LjcyMTEyIDkuODYxMjcgMy4wMDAzOEwxMS4yNTUyIDUuNzA3NTlDMTAuMjA2NCA3Ljc2MjQ0IDkuMTU3NSA5LjgxNjg1IDguMTA4NzggMTEuODcwOEw2LjUxMTkgMTQuOTk4NUg0TDUuODczMDQgMTEuMTY0MVpNMTAuMDQ2NCAxMi44MzM5TDEyLjQ2NTUgNy45NjE2NUMxMi45OTMzIDkuMDEyOTIgMTMuNTIxMyAxMC4wNjQyIDE0LjA0OTQgMTEuMTE1NkMxNC42OTk2IDEyLjQxMDEgMTUuMzQ5OSAxMy43MDQ4IDE2IDE1SDEzLjMwMjVMMTIuODM5MyAxMy45NjY2TDEyLjM3MjIgMTIuOTI0NUgxMC4wNDY0SDkuOTk5NzZMMTAuMDQ2NCAxMi44MzM5WiIgZmlsbD0iI2E3YWFhZCIvPgo8L3N2Zz4K' );
		$priority   = apply_filters( 'astra_menu_priority', 59 );

		add_menu_page( // phpcs:ignore WPThemeReview.PluginTerritory.NoAddAdminPages.add_menu_pages_add_menu_page -- Taken the menu on top level
			self::$page_title,
			self::$page_title,
			$capability,
			self::$plugin_slug,
			array( $this, 'render_admin_dashboard' ),
			$astra_icon,
			$priority
		); 

		// Add Customize submenu.
		add_submenu_page( // phpcs:ignore WPThemeReview.PluginTerritory.NoAddAdminPages.add_menu_pages_add_submenu_page -- Taken the menu on top level
			self::$plugin_slug,
			__( 'Customize', 'astra' ),
			__( 'Customize', 'astra' ),
			$capability,
			'customize.php'
		);

		// Add Custom Layout submenu.
		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$show_custom_layout_submenu = ( defined( 'ASTRA_EXT_VER' ) && ! Astra_Ext_Extension::is_active( 'advanced-hooks' ) ) ? false : true;
		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		if ( $show_custom_layout_submenu ) {
			add_submenu_page( // phpcs:ignore WPThemeReview.PluginTerritory.NoAddAdminPages.add_menu_pages_add_submenu_page -- Taken the menu on top level
				self::$plugin_slug,
				__( 'Custom Layouts', 'astra' ),
				__( 'Custom Layouts', 'astra' ),
				$capability,
				/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
				( defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'advanced-hooks' ) ) ? 'edit.php?post_type=astra-advanced-hook' : 'admin.php?page=' . self::$plugin_slug . '&path=custom-layouts'
				/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			);
		}

		if ( ! astra_is_white_labelled() ) {
			// Add Spectra submenu.
			add_submenu_page( // phpcs:ignore WPThemeReview.PluginTerritory.NoAddAdminPages.add_menu_pages_add_submenu_page -- Taken the menu on top level
				self::$plugin_slug,
				__( 'Spectra', 'astra' ),
				__( 'Spectra', 'astra' ),
				$capability,
				defined( 'UAGB_VER' ) ? admin_url( 'options-general.php?page=' . UAGB_SLUG ) : 'admin.php?page=' . self::$plugin_slug . '&path=spectra'
			);
		}

		// Rename to Home menu.
		$submenu[ self::$plugin_slug ][0][0] = __( 'Dashboard', 'astra' ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Required to rename the home menu.
	}

	/**
	 * Renders the admin settings.
	 *
	 * @since 4.0.0
	 * @return void
	 */
	public function render_admin_dashboard() {
		$page_action = '';

		if ( isset( $_GET['action'] ) ) { //phpcs:ignore
			/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$page_action = sanitize_text_field( wp_unslash( $_GET['action'] ) ); //phpcs:ignore
			/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$page_action = str_replace( '_', '-', $page_action );
		}

		?>
		<div class="ast-menu-page-wrapper">
			<div id="ast-menu-page">
				<div class="ast-menu-page-content">
					<div id="astra-dashboard-app" class="astra-dashboard-app"> </div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Enqueues the needed CSS/JS for the builder's admin settings page.
	 *
	 * @since 4.0.0
	 */
	public function styles_scripts() {

		if ( is_customize_preview() ) {
			return;
		}

		wp_enqueue_style( 'astra-admin-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap', array(), ASTRA_THEME_VERSION ); // Styles.

		wp_enqueue_style( 'wp-components' );

		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$show_self_branding = defined( 'ASTRA_EXT_VER' ) && is_callable( 'Astra_Ext_White_Label_Markup::show_branding' ) ? Astra_Ext_White_Label_Markup::show_branding() : true;
		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$user_firstname = wp_get_current_user()->user_firstname;
		$localize       = array(
			'current_user'           => ! empty( $user_firstname ) ? ucfirst( $user_firstname ) : ucfirst( wp_get_current_user()->display_name ),
			'admin_base_url'         => admin_url(),
			'plugin_dir'             => ASTRA_THEME_URI,
			'plugin_ver'             => defined( 'ASTRA_EXT_VER' ) ? ASTRA_EXT_VER : '',
			'version'                => ASTRA_THEME_VERSION,
			'pro_available'          => defined( 'ASTRA_EXT_VER' ) ? true : false,
			'pro_installed_status'   => 'installed' === self::get_plugin_status( 'astra-addon/astra-addon.php' ) ? true : false,
			'spectra_plugin_status'  => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
			'theme_name'             => astra_get_theme_name(),
			'plugin_name'            => astra_get_addon_name(),
			'quick_settings'         => self::astra_get_quick_links(),
			'ajax_url'               => admin_url( 'admin-ajax.php' ),
			'is_whitelabel'          => astra_is_white_labelled(),
			'show_self_branding'     => $show_self_branding,
			'admin_url'              => admin_url( 'admin.php' ),
			'home_slug'              => self::$plugin_slug,
			'upgrade_url'            => ASTRA_PRO_UPGRADE_URL,
			'customize_url'          => admin_url( 'customize.php' ),
			'astra_base_url'         => admin_url( 'admin.php?page=' . self::$plugin_slug ),
			'astra_changelog_data'   => self::astra_get_theme_changelog_feed_data(),
			'logo_url'               => apply_filters( 'astra_admin_menu_icon', ASTRA_THEME_URI . 'inc/assets/images/astra-logo.svg' ),
			'update_nonce'           => wp_create_nonce( 'astra_update_admin_setting' ),
			'integrations'           => self::astra_get_integrations(),
			'show_plugins'           => apply_filters( 'astra_show_free_extend_plugins', true ), // Legacy filter support.
			'useful_plugins'         => self::astra_get_useful_plugins(),
			'extensions'             => self::astra_get_pro_extensions(),
			'plugin_manager_nonce'   => wp_create_nonce( 'astra_plugin_manager_nonce' ),
			'plugin_installer_nonce' => wp_create_nonce( 'updates' ),
			'free_vs_pro_link'       => admin_url( 'admin.php?page=' . self::$plugin_slug . '&path=free-vs-pro' ),
			'show_builder_migration' => Astra_Builder_Helper::is_new_user() ? false : true,
			'plugin_installing_text' => __( 'Installing', 'astra' ),
			'plugin_installed_text'  => __( 'Installed', 'astra' ),
			'plugin_activating_text' => __( 'Activating', 'astra' ),
			'plugin_activated_text'  => __( 'Activated', 'astra' ),
			'plugin_activate_text'   => __( 'Activate', 'astra' ),
			'starter_templates_data' => self::get_starter_template_plugin_data(),
			'astra_docs_data'        => get_option( 'astra_docs_data', Astra_API_Init::astra_get_knowledge_base_data() ),
			'upgrade_notice'         => astra_showcase_upgrade_notices(),
		);

		$this->settings_app_scripts( apply_filters( 'astra_react_admin_localize', $localize ) );
	}

	/**
	 * Get customizer quick links for easy navigation.
	 *
	 * @return array
	 * @since 4.0.0
	 */
	public static function astra_get_quick_links() {
		return apply_filters(
			'astra_quick_settings',
			array(
				'logo-favicon' => array(
					'title'     => __( 'Site Identity', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[control]=site_icon' ),
				),
				'header'       => array(
					'title'     => __( 'Header Settings', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[panel]=panel-header-group' ),
				),
				'footer'       => array(
					'title'     => __( 'Footer Settings', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-footer-group' ),
				),
				'colors'       => array(
					'title'     => __( 'Color', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-colors-background' ),
				),
				'typography'   => array(
					'title'     => __( 'Typography', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-typography' ),
				),
				'button'       => array(
					'title'     => __( 'Button', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-buttons' ),
				),
				'blog-options' => array(
					'title'     => __( 'Blog Options', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-blog-group' ),
				),
				'layout'       => array(
					'title'     => __( 'Layout', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-container-layout' ),
				),
				'menus'        => array(
					'title'     => __( 'Menus', 'astra' ),
					'quick_url' => admin_url( 'nav-menus.php' ),
				),
			)
		);
	}

	/**
	 * Get Starter Templates plugin data.
	 *
	 * @return array
	 * @since 4.0.0
	 */
	public static function get_starter_template_plugin_data() {

		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_data = array(
			'title'        => is_callable( 'Astra_Ext_White_Label_Markup::get_whitelabel_string' ) ? Astra_Ext_White_Label_Markup::get_whitelabel_string( 'astra-sites', 'name', __( 'Starter Templates', 'astra' ) ) : __( 'Starter Templates', 'astra' ),
			'description'  => is_callable( 'Astra_Ext_White_Label_Markup::get_whitelabel_string' ) ? Astra_Ext_White_Label_Markup::get_whitelabel_string( 'astra-sites', 'description', __( 'Create professional designed pixel perfect websites in minutes. Get access to 280+ pre-made full website templates for your favorite page builder.', 'astra' ) ) : __( 'Create professional designed pixel perfect websites in minutes. Get access to 280+ pre-made full website templates for your favorite page builder.', 'astra' ),
			'is_available' => defined( 'ASTRA_PRO_SITES_VER' ) || defined( 'ASTRA_SITES_VER' ) ? true : false,
			'redirection'  => admin_url( 'themes.php?page=starter-templates' ),
		);
		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		$skip_free_version = false;
		$pro_plugin_status = self::get_plugin_status( 'astra-pro-sites/astra-pro-sites.php' );

		if ( 'installed' === $pro_plugin_status || 'activated' === $pro_plugin_status ) {
			$skip_free_version = true;
			$st_data['slug']   = 'astra-pro-sites';
			$st_data['status'] = $pro_plugin_status;
			$st_data['path']   = 'astra-pro-sites/astra-pro-sites.php';
		}

		$free_plugin_status = self::get_plugin_status( 'astra-sites/astra-sites.php' );
		if ( ! $skip_free_version ) {
			$st_data['slug']   = 'astra-sites';
			$st_data['status'] = $free_plugin_status;
			$st_data['path']   = 'astra-sites/astra-sites.php';
		}

		return $st_data;
	}

	/**
	 * Get plugin status
	 *
	 * @since 4.0.0
	 *
	 * @param  string $plugin_init_file Plguin init file.
	 * @return mixed
	 */
	public static function get_plugin_status( $plugin_init_file ) {

		$installed_plugins = get_plugins();

		if ( ! isset( $installed_plugins[ $plugin_init_file ] ) ) {
			return 'install';
		} elseif ( is_plugin_active( $plugin_init_file ) ) {
			return 'activated';
		} else {
			return 'installed';
		}
	}

	/**
	 * Get Astra's pro extension list.
	 *
	 * @since 4.0.0
	 * @return array
	 * @access public
	 */
	public static function astra_get_pro_extensions() {
		return apply_filters(
			'astra_addon_list',
			array(
				'colors-and-background' => array(
					'title'     => __( 'Colors & Background', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/colors-background-module/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/colors-background-module/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'typography'            => array(
					'title'     => __( 'Typography', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/typography-module/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/typography-module/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'spacing'               => array(
					'title'     => __( 'Spacing', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/spacing-addon-overview/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/spacing-addon-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'blog-pro'              => array(
					'title'     => __( 'Blog Pro', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/blog-pro-overview/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/blog-pro-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'mobile-header'         => array(
					'title'     => __( 'Mobile Header', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/mobile-header-with-astra/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/mobile-header-with-astra/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'header-sections'       => array(
					'title'     => __( 'Header Sections', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/header-sections-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/header-sections-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'sticky-header'         => array(
					'title'     => __( 'Sticky Header', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/sticky-header-pro/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/sticky-header-pro/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'site-layouts'          => array(
					'title'     => __( 'Site Layouts', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/site-layout-overview/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/site-layout-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-footer'       => array(
					'title'     => __( 'Footer Widgets', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/footer-widgets-astra-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/footer-widgets-astra-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'nav-menu'              => array(
					'title'     => __( 'Nav Menu', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/nav-menu-addon/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/nav-menu-addon/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-hooks'        => array(
					'title'           => __( 'Custom Layouts', 'astra' ),
					'description'     => __( 'Add content conditionally in the various hook areas of the theme.', 'astra' ),
					'manage_settings' => true,
					'class'           => 'ast-addon',
					'title_url'       => astra_get_pro_url( 'https://wpastra.com/docs/custom-layouts-pro/', 'wp', 'dashboard' ),
					'links'           => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/custom-layouts-pro/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-headers'      => array(
					'title'           => __( 'Page Headers', 'astra' ),
					'description'     => __( 'Make your header layouts look more appealing and sexy!', 'astra' ),
					'manage_settings' => true,
					'class'           => 'ast-addon',
					'title_url'       => astra_get_pro_url( 'https://wpastra.com/docs/page-headers-overview/', 'wp', 'dashboard' ),
					'links'           => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/page-headers-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'woocommerce'           => array(
					'title'     => __( 'WooCommerce', 'astra' ),
					'class'     => 'ast-addon',
					'condition' => defined( 'ASTRA_EXT_VER' ) && class_exists( 'WooCommerce' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/woocommerce-module-overview/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/woocommerce-module-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'edd'                   => array(
					'title'     => __( 'Easy Digital Downloads', 'astra' ),
					'class'     => 'ast-addon',
					'condition' => defined( 'ASTRA_EXT_VER' ) && class_exists( 'Easy_Digital_Downloads' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/easy-digital-downloads-module-overview/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/easy-digital-downloads-module-overview/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'learndash'             => array(
					'title'       => __( 'LearnDash', 'astra' ),
					'condition'   => defined( 'ASTRA_EXT_VER' ) && class_exists( 'SFWD_LMS' ) ? true : false,
					'description' => __( 'Supercharge your LearnDash website with amazing design features.', 'astra' ),
					'class'       => 'ast-addon',
					'title_url'   => astra_get_pro_url( 'https://wpastra.com/docs/learndash-integration-in-astra-pro/', 'wp', 'dashboard' ),
					'links'       => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/learndash-integration-in-astra-pro/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'lifterlms'             => array(
					'title'     => __( 'LifterLMS', 'astra' ),
					'class'     => 'ast-addon',
					'condition' => defined( 'ASTRA_EXT_VER' ) && class_exists( 'LifterLMS' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/lifterlms-module-pro/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/lifterlms-module-pro/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'white-label'           => array(
					'title'     => __( 'White Label', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/how-to-white-label-astra/', 'wp', 'dashboard' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/how-to-white-label-astra/', 'wp', 'dashboard' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
			)
		);
	}



	/**
	 * Get Astra's useful plugins.
	 * Extend this in following way -
	 *
	 * //  array(
	 * //         'title' => "Plugin Name",
	 * //         'subtitle' => "Plugin description goes here.",
	 * //         'path' => 'plugin-slug/plugin-slug.php',
	 * //         'redirection' => admin_url( 'admin.php?page=sc-dashboard' ),
	 * //         'status' => self::get_plugin_status( 'plugin-slug/plugin-slug.php' ),
	 * //         'logoPath' => array(
	 * //             'internal_icon' => true, // true = will take internal Astra's any icon. false = provide next custom icon link.
	 * //             'icon_path' => "spectra", // If internal_icon false then - example custom SVG URL: ASTRA_THEME_URI . 'inc/assets/images/astra.svg'.
	 * //         ),
	 * //     ),
	 *
	 * @since 4.0.0
	 * @return array
	 * @access public
	 */
	public static function astra_get_useful_plugins() {
		$st_plugin_data = self::get_starter_template_plugin_data();

		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_plugin_title = isset( $st_plugin_data['title'] ) ? $st_plugin_data['title'] : '';
		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_plugin_status = isset( $st_plugin_data['status'] ) ? $st_plugin_data['status'] : '';
		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_plugin_slug = isset( $st_plugin_data['slug'] ) ? $st_plugin_data['slug'] : '';
		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_plugin_path = isset( $st_plugin_data['path'] ) ? $st_plugin_data['path'] : '';
		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$st_plugin_redirection = isset( $st_plugin_data['redirection'] ) ? $st_plugin_data['redirection'] : '';
		/** @psalm-suppress PossiblyUndefinedStringArrayOffset */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		
		$sc_api_token         = get_option( 'sc_api_token', '' );
		$surecart_redirection = empty( $sc_api_token ) ? 'sc-getting-started' : 'sc-dashboard';

		// Making useful plugin section dynamic.
		if ( class_exists( 'WooCommerce' ) ) {
			$setup_type = 'woocommerce';
		} elseif ( class_exists( 'SFWD_LMS' ) ) {
			$setup_type = 'learndash';
		} else {
			$setup_type = 'default';
		}

		switch ( $setup_type ) {
			case 'woocommerce':
				$useful_plugins = array(
					array(
						'title'       => __( 'CartFlows', 'astra' ),
						'subtitle'    => __( '#1 Sales Funnel WordPress Builder.', 'astra' ),
						'status'      => self::get_plugin_status( 'cartflows/cartflows.php' ),
						'slug'        => 'cartflows',
						'path'        => 'cartflows/cartflows.php',
						'redirection' => ( false === get_option( 'wcf_setup_complete', false ) && ! get_option( 'wcf_setup_skipped', false ) ) ? admin_url( 'index.php?page=cartflow-setup' ) : admin_url( 'admin.php?page=cartflows' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'cart-flows',
						),
					),
					array(
						'title'       => __( 'Stripe Payments For Woo', 'astra' ),
						'subtitle'    => __( 'Simple, secure way to accept credit card payments.', 'astra' ),
						'status'      => self::get_plugin_status( 'checkout-plugins-stripe-woo/checkout-plugins-stripe-woo.php' ),
						'slug'        => 'checkout-plugins-stripe-woo',
						'path'        => 'checkout-plugins-stripe-woo/checkout-plugins-stripe-woo.php',
						'redirection' => ( false === get_option( 'cpsw_setup_status', false ) ) ? admin_url( 'index.php?page=cpsw-onboarding' ) : admin_url( 'admin.php?page=wc-settings&tab=cpsw_api_settings' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'stripe-checkout',
						),
					),
					array(
						'title'       => __( 'Cart Abandonment Recovery', 'astra' ),
						'subtitle'    => __( 'Recover lost revenue automatically.', 'astra' ),
						'status'      => self::get_plugin_status( 'woo-cart-abandonment-recovery/woo-cart-abandonment-recovery.php' ),
						'slug'        => 'woo-cart-abandonment-recovery',
						'path'        => 'woo-cart-abandonment-recovery/woo-cart-abandonment-recovery.php',
						'redirection' => admin_url( 'admin.php?page=woo-cart-abandonment-recovery' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'cart-abandonment',
						),
					),
					array(
						'title'       => __( 'Variations by CartFlows', 'astra' ),
						'subtitle'    => __( 'Beautiful store variation swatches.', 'astra' ),
						'status'      => self::get_plugin_status( 'variation-swatches-woo/variation-swatches-woo.php' ),
						'slug'        => 'variation-swatches-woo',
						'path'        => 'variation-swatches-woo/variation-swatches-woo.php',
						'redirection' => admin_url( 'admin.php?page=cfvsw_settings' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'variation-swatches',
						),
					),
					array(
						'title'       => __( 'SureTriggers', 'astra' ),
						'subtitle'    => __( 'Automate your WordPress setup.', 'astra' ),
						'status'      => self::get_plugin_status( 'suretriggers/suretriggers.php' ),
						'slug'        => 'suretriggers',
						'path'        => 'suretriggers/suretriggers.php',
						'redirection' => admin_url( 'admin.php?page=suretriggers' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'suretriggers',
						),
					),
				);
				break;

			case 'learndash':
				$useful_plugins = array(
					array(
						'title'       => __( 'SureCart', 'astra' ),
						'subtitle'    => __( 'The new way to sell on WordPress.', 'astra' ),
						'status'      => self::get_plugin_status( 'surecart/surecart.php' ),
						'slug'        => 'surecart',
						'path'        => 'surecart/surecart.php',
						'redirection' => admin_url( 'admin.php?page=' . esc_attr( $surecart_redirection ) ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'surecart',
						),
					),
					array(
						'title'       => __( 'Presto Player', 'astra' ),
						'subtitle'    => __( 'Ultimate Video Player For WordPress.', 'astra' ),
						'status'      => self::get_plugin_status( 'presto-player/presto-player.php' ),
						'slug'        => 'presto-player',
						'path'        => 'presto-player/presto-player.php',
						'redirection' => admin_url( 'edit.php?post_type=pp_video_block' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'presto-player',
						),
					),
					array(
						'title'       => __( 'Spectra', 'astra' ),
						'subtitle'    => __( 'Free WordPress Page Builder.', 'astra' ),
						'status'      => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
						'slug'        => 'ultimate-addons-for-gutenberg',
						'path'        => 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php',
						'redirection' => admin_url( 'options-general.php?page=spectra' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'spectra',
						),
					),
					array(
						'title'       => __( 'SureTriggers', 'astra' ),
						'subtitle'    => __( 'Automate your WordPress setup.', 'astra' ),
						'status'      => self::get_plugin_status( 'suretriggers/suretriggers.php' ),
						'slug'        => 'suretriggers',
						'path'        => 'suretriggers/suretriggers.php',
						'redirection' => admin_url( 'admin.php?page=suretriggers' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'suretriggers',
						),
					),
				);
				break;

			default:
				$useful_plugins = array(
					array(
						'title'       => $st_plugin_title,
						'subtitle'    => __( '280+ Ready to Import Templates.', 'astra' ),
						'status'      => $st_plugin_status,
						'slug'        => $st_plugin_slug,
						'path'        => $st_plugin_path,
						'redirection' => $st_plugin_redirection,
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'starter-logo',
						),
					),
					array(
						'title'       => __( 'Spectra', 'astra' ),
						'subtitle'    => __( 'Free WordPress Page Builder.', 'astra' ),
						'status'      => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
						'slug'        => 'ultimate-addons-for-gutenberg',
						'path'        => 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php',
						'redirection' => admin_url( 'options-general.php?page=spectra' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'spectra',
						),
					),
					array(
						'title'       => __( 'SureCart', 'astra' ),
						'subtitle'    => __( 'The new way to sell on WordPress.', 'astra' ),
						'status'      => self::get_plugin_status( 'surecart/surecart.php' ),
						'slug'        => 'surecart',
						'path'        => 'surecart/surecart.php',
						'redirection' => admin_url( 'admin.php?page=' . esc_attr( $surecart_redirection ) ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'surecart',
						),
					),
					array(
						'title'       => __( 'SureTriggers', 'astra' ),
						'subtitle'    => __( 'Automate your WordPress setup.', 'astra' ),
						'status'      => self::get_plugin_status( 'suretriggers/suretriggers.php' ),
						'slug'        => 'suretriggers',
						'path'        => 'suretriggers/suretriggers.php',
						'redirection' => admin_url( 'admin.php?page=suretriggers' ),
						'logoPath'    => array(
							'internal_icon' => true,
							'icon_path'     => 'suretriggers',
						),
					),
				);
				break;
		}

		return apply_filters( 'astra_useful_plugins', $useful_plugins );
	}

	/**
	 * Get Astra's recommended integrations.
	 * Extend this in following way -
	 *
	 * // array(
	 * //    'title' => "Plugin Name",
	 * //    'subtitle' => "Plugin description goes here.",
	 * //     'isPro' => false,
	 * //     'status' => self::get_plugin_status( 'plugin-slug/plugin-slug.php' ),
	 * //     'path' => 'plugin-slug/plugin-slug.php',
	 * //     'redirection' => admin_url( 'admin.php?page=sc-dashboard' ),
	 * //     'logoPath' => array(
	 * //         'internal_icon' => true, // true = will take internal Astra's any icon. false = provide next custom icon link.
	 * //         'icon_path' => "spectra", // If internal_icon false then - example custom SVG URL: ASTRA_THEME_URI . 'inc/assets/images/astra.svg'.
	 * //     ),
	 * // ),
	 *
	 * @since 4.0.0
	 * @return array
	 * @access public
	 */
	public static function astra_get_integrations() {
		$sc_api_token         = get_option( 'sc_api_token', '' );
		$surecart_redirection = empty( $sc_api_token ) ? 'sc-getting-started' : 'sc-dashboard';
		return apply_filters(
			'astra_integrated_plugins',
			array(
				array(
					'title'       => __( 'Spectra', 'astra' ),
					'subtitle'    => __( 'Free WordPress Page Builder Plugin.', 'astra' ),
					'isPro'       => false,
					'status'      => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
					'slug'        => 'ultimate-addons-for-gutenberg',
					'path'        => 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php',
					'redirection' => admin_url( 'options-general.php?page=spectra' ),
					'logoPath'    => array(
						'internal_icon' => true,
						'icon_path'     => 'spectra',
					),
				),
				array(
					'title'       => __( 'SureCart', 'astra' ),
					'subtitle'    => __( 'Simplifying selling online with WordPress.', 'astra' ),
					'isPro'       => false,
					'status'      => self::get_plugin_status( 'surecart/surecart.php' ),
					'redirection' => admin_url( 'admin.php?page=' . esc_attr( $surecart_redirection ) ),
					'slug'        => 'surecart',
					'path'        => 'surecart/surecart.php',
					'logoPath'    => array(
						'internal_icon' => true,
						'icon_path'     => 'surecart',
					),
				),
				array(
					'title'       => __( 'CartFlows', 'astra' ),
					'subtitle'    => __( '#1 Sales Funnel Builder for WordPress.', 'astra' ),
					'isPro'       => false,
					'status'      => self::get_plugin_status( 'cartflows/cartflows.php' ),
					'slug'        => 'cartflows',
					'path'        => 'cartflows/cartflows.php',
					'redirection' => ( false === get_option( 'wcf_setup_complete', false ) && ! get_option( 'wcf_setup_skipped', false ) ) ? admin_url( 'index.php?page=cartflow-setup' ) : admin_url( 'admin.php?page=cartflows' ),
					'logoPath'    => array(
						'internal_icon' => true,
						'icon_path'     => 'cart-flows',
					),
				),
			)
		);
	}

	/**
	 * Get Changelogs from API.
	 *
	 * @since 4.0.0
	 * @return array $changelog_data Changelog Data.
	 */
	public static function astra_get_theme_changelog_feed_data() {
		$changelog_data = array();
		$posts          = json_decode( wp_remote_retrieve_body( wp_remote_get( 'https://wpastra.com/wp-json/wp/v2/changelog?product=97&per_page=3' ) ) ); // Astra theme.

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
	 * Settings app scripts
	 *
	 * @since 4.0.0
	 * @param array $localize Variable names.
	 */
	public function settings_app_scripts( $localize ) {
		$handle            = 'astra-admin-dashboard-app';
		$build_path        = ASTRA_THEME_ADMIN_DIR . 'assets/build/';
		$build_url         = ASTRA_THEME_ADMIN_URL . 'assets/build/';
		$script_asset_path = $build_path . 'dashboard-app.asset.php';

		/** @psalm-suppress MissingFile */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$script_info = file_exists( $script_asset_path ) ? include $script_asset_path : array(  // phpcs:ignore WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound -- Not a template file so loading in a normal way.
			'dependencies' => array(),
			'version'      => ASTRA_THEME_VERSION,
		);
		/** @psalm-suppress MissingFile */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		$script_dep = array_merge( $script_info['dependencies'], array( 'updates', 'wp-hooks' ) );

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
	 * @since 4.0.0
	 */
	public function astra_admin_footer_link() {
		return '<span id="footer-thankyou"> Thank you for using <span class="focus:text-astra-hover active:text-astra-hover hover:text-astra-hover"> ' . esc_html( astra_get_theme_name() ) . '.</span></span>';
	}
}

Astra_Menu::get_instance();
