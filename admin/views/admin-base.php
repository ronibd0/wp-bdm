<?php
/**
 * Admin Base HTML.
 *
 * @package Astra
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="uag-menu-page-wrapper">
	<div id="uag-menu-page">
		<div class="uag-menu-page-content uag-clear">
			<?php
				do_action( 'astra_render_admin_page_content', $menu_page_slug, $page_action );
			?>
		</div>
	</div>
</div>
