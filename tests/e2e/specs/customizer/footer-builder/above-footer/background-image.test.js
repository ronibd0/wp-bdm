import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Above footer backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const aboveFooter = {
			'hba-footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pxhere.com/en/photo/967811',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pxhere.com/en/photo/667454',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pxhere.com/en/photo/670741',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooter[ 'hba-footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooter[ 'hba-footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooter[ 'hba-footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
