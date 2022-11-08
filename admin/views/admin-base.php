<?php
/**
 * Admin Base HTML.
 *
 * @package Astra
 * @since x.x.x
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="ast-menu-page-wrapper">
	<div id="ast-menu-page">
		<div class="ast-menu-page-content">
			<?php
				do_action( 'astra_render_admin_page_content', $menu_page_slug, $page_action );
			?>
		</div>
	</div>
</div>
