import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
describe( 'off canvas menu design settings in the customizer', () => {
	it( 'off canvas hide on tablet and mobile should apply corectly for after header', async () => {
		const Offcanvas = {
			'section-header-mobile-menu-hide-tablet': 1,
			'section-header-mobile-menu-hide-mobile': 1,
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
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation' );
		const hideonTablet = await page.$eval( '.ast-builder-menu-mobile .main-navigation', ( element ) => element.getAttribute( '.ast-hf-mobile-menu' ) );
		await expect( hideonTablet ).toBeNull( );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation' );
		const hideonMobile = await page.$eval( '.ast-builder-menu-mobile .main-navigation', ( element ) => element.getAttribute( '.ast-hf-mobile-menu' ) );
		await expect( hideonMobile ).toBeNull( );
	} );
} );
