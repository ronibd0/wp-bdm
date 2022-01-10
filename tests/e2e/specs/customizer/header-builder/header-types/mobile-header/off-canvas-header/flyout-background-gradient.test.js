import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout header background gradient for tablet should apply correctly', async () => {
		const offCanvas = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-background': {
				'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
				'background-repeat': 'no-repeat',
				'background-position': 'left top',
				'background-size': 'contain',
				'background-attachment': 'fixed',
				'background-type': 'gradient',
			},
		};
		await setCustomize( offCanvas );
		await createNewPost( { postType: 'page', title: 'test-1' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-image',
		} ).cssValueToBe( `${ offCanvas[ 'off-canvas-background' ][ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-image',
		} ).cssValueToBe( `${ offCanvas[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );
} );
