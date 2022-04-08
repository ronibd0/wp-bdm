import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'Footer builder backgeround image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const footerBuilderBgImage = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://c.pxhere.com/photos/b1/0b/sky_hot_air_balloon_air_balloon_float_fly-1392552.jpg!s1',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://c.pxhere.com/photos/b1/b0/flower_field_plant_nature-174602.jpg!s1',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://c.pxhere.com/photos/f0/a1/plant_leaf_palm-26883.jpg!s1',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'copyright',
					},
				},
			},
			'footer-mobile-items': {
				primary: {
					primary_1: {
						0: 'copyright',
					},
				},
			},
		};
		await setCustomize( footerBuilderBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
