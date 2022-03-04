import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'below footer background color settings in the customizer', () => {
	it( 'background color should apply correctly', async () => {
		const backgroundColor = {
			'hbb-footer-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgba(217, 241, 188, 0.55)',
				},
				tablet: {
					'background-color': 'rgba(208, 185, 237, 0.66)',
				},
				mobile: {
					'background-color': 'rgba(153, 206, 232, 0.6)',
				},
			},
		};
		await setCustomize( backgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hbb-footer-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hbb-footer-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hbb-footer-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
