import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from './publish-post';
import { scrollToElement } from './scroll-to-element';
export const createNewMenu = async () => {
	await createNewPost( { postType: 'page', title: 'Footer page 1' } );
	await publishPost();
	await createNewPost( { postType: 'page', title: 'Footer page 2' } );
	await publishPost();
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	await page.click( '.menu-delete' );
	await page.focus( '#menu-name' );
	await page.type( 'Footer Menu' );
	await page.focus( '#locations-footer_menu' );
	await page.click( '#locations-footer_menu' );
	await page.click( '#save_menu_footer' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );
	await scrollToElement( '#nav-menu-footer' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
};