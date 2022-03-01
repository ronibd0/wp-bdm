import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'Footer builder backgeround image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const FooterBuilder = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pxhere.com/en/photo/9381',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pxhere.com/en/photo/937815',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pxhere.com/en/photo/1435825',

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
		await setCustomize( FooterBuilder );
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
			`url("${ FooterBuilder[ 'footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ FooterBuilder[ 'footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ FooterBuilder[ 'footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
