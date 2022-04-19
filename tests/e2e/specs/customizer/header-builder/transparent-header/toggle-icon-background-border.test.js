import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Transparent header settings in the customizer', () => {
	it( 'toggle icon color setting should apply correctly', async () => {
		const toggleIconColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-toggle-btn-color': 'rgb(129, 73, 9)',
		};
		await setCustomize( toggleIconColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg',
			property: 'fill',
		} ).cssValueToBe( `${ toggleIconColor[ 'transparent-header-toggle-btn-color' ] }` );
	} );
} );
