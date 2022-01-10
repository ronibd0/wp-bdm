import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
describe( 'off canvas menu item divider settings in the customizer', () => {
	it( 'off canvas menu item divider size and color should apply corectly for after header', async () => {
		const Offcanvas = {
			'header-mobile-menu-submenu-item-border': 1,

		};
		await setCustomize( Offcanvas );
		await createNewPost( { postType: 'page', title: 'test-1' } );
		await publishPost();
		await createNewPost( { postType: 'page', title: 'test-2' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu' );
		const hideonTablet = await page.$eval( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu', ( element ) => element.getAttribute( '.ast-hf-mobile-menu' ) );
		await expect( hideonTablet ).toBeNull( );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu' );
		const hideonMobile = await page.$eval( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu', ( element ) => element.getAttribute( '.ast-hf-mobile-menu' ) );
		await expect( hideonMobile ).toBeNull( );
	} );
} );
