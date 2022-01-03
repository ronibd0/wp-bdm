import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'footer builder backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const footerBuilder = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

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
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( footerBuilder );
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
			`url("${ footerBuilder[ 'footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilder[ 'footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilder[ 'footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
