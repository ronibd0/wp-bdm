import { createURL } from '@wordpress/e2e-test-utils';
export const createNewMenu = async () => {
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	//await page.waitForSelector( '#nav-menu-footer' );
	if ( await page.$( '.menu-delete' ) ) {
		await page.click( '.menu-delete' );
	}
	await page.focus( '#menu-name' );
	await page.type( '#menu-name', 'Menu' );
	await page.click( '#save_menu_footer' );
	await page.waitForSelector( '.accordion-section-content ' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );
	await page.focus( '#locations-footer_menu' );
	await page.click( '#locations-footer_menu' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
	await page.setDragInterception( true );
};
