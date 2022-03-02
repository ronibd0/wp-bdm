import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon spacing should apply correctly', async () => {
		const socialIconSpacing = {
			'header-social-1-space': {
				desktop: '48',
				tablet: '38',
				mobile: '28',
			},
			'header-desktop-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].desktop.left } ` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].desktop.right } ` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].tablet.left } ` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].tablet.right } ` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].mobile.left } ` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconSpacing[ 'header-social-1-space' ].mobile.right } ` );
	} );
} );
