import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon color should apply correctly', async () => {
		const socialIconColor = {
			'header-social-1-color': {
				desktop: 'rgb(215, 57, 57)',
				tablet: 'rgb(57, 119, 7)',
				mobile: 'rgb(232, 26, 127)',
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
		await setCustomize( socialIconColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom svg' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case

	// it( 'social icon hover color should apply correctly', async () => {
	// 	const socialIconColor = {
	// 		'header-social-1-h-color': {
	// 			desktop: 'rgb(114, 15, 132)',
	// 			tablet: 'rgb(179, 132, 5)',
	// 			mobile: 'rgb(11, 143, 75)',
	// 		},
	// 		'header-desktop-items': {
	// 			primary: {
	// 				primary_center: {
	// 					0: 'social-icons-1',

	// 				},
	// 			},
	// 		},
	// 		'header-mobile-items': {
	// 			primary: {
	// 				primary_center: {
	// 					0: 'social-icons-1',

	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( socialIconColor );

	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );

	// 	await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-h-color' ].desktop }` );

	// 	await setBrowserViewport( 'medium' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-h-color' ].tablet }` );

	// 	await setBrowserViewport( 'small' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-h-color' ].mobile }` );
	// } );
} );
