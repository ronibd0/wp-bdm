import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'social icons show label in the customizer', () => {
	it( 'icon label color should apply correctly', async () => {
		const socialIconLabelColor = {
			'footer-social-1-label-toggle': '1',
			'footer-social-1-label-color': {
				desktop: 'rgb(191, 28, 28)',
				tablet: 'rgb(74, 129, 11)',
				mobile: 'rgb(127, 26, 194)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconLabelColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'icon label hover color should apply correctly', async () => {
	// 	const socialIconLabelColor = {
	// 		'footer-social-1-label-toggle': '1',
	// 		'footer-social-1-label-h-color': {
	// 			desktop: 'rgb(175, 138, 5)',
	// 			tablet: 'rgb(28, 156, 136)',
	// 			mobile: 'rgb(35, 135, 14)',
	// 		},
	// 		'footer-desktop-items': {
	// 			primary: {
	// 				primary_2: {
	// 					0: 'social-icons-1',
	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( socialIconLabelColor );
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await setBrowserViewport( 'large' );
	// 	await scrollToElement( '#colophon' );
	// 	await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element:hover .social-item-label' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-h-color' ].desktop }` );

	// 	await setBrowserViewport( 'medium' );
	// 	await scrollToElement( '#colophon' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-h-color' ].tablet }` );

	// 	await setBrowserViewport( 'small' );
	// 	await scrollToElement( '#colophon' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-h-color' ].mobile }` );
	// } );
} );
