import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon hide on tablet should apply correctly', async () => {
		const hideonTablet = {
			'section-hb-social-icons-1-hide-tablet': {
				tablet: 'grid',
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideonTablet );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-break-point .ast-above-header-bar' );
		await expect( {
			selector: '.ast-header-break-point .ast-above-header-bar',
			property: 'display',
		} ).cssValueToBe(
			`${ hideonTablet[ 'section-hb-social-icons-1-hide-tablet' ].tablet }`,
		);
	} );

	it( 'social icon hide on mobile should apply correctly', async () => {
		const hideonMobile = {
			'section-hb-social-icons-1-hide-mobile': {
				mobile: 'grid',
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideonMobile );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-break-point .ast-above-header-bar' );
		await expect( {
			selector: '.ast-header-break-point .ast-above-header-bar',
			property: 'display',
		} ).cssValueToBe(
			`${ hideonMobile[ 'section-hb-social-icons-1-hide-mobile' ].mobile }`,
		);
	} );
} );
