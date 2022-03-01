import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon background color should apply correctly', async () => {
		const BackgroundColor= {
			'header-social-1-bg-color': {
				desktop: 'rgb(213, 132, 234)',
				tablet: 'rgb(180, 230, 100)',
				mobile: 'rgb(180, 230, 100)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( BackgroundColor);

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ BackgroundColor[ 'header-social-1-bg-color' ].desktop }` );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ BackgroundColor[ 'header-social-1-bg-color' ].tablet }` );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ BackgroundColor[ 'header-social-1-bg-color' ].mobile }` );
	} );
} );
