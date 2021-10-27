import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Below footer inner element layout setting in customizer', () => {
	it( 'stack layout should apply correctly', async () => {
		const innerelemetLayout = {
			'hbb-stack': {
				desktop: 'stack',
				tablet: 'stack',
				mobile: 'stack',
			},
		};
		await setCustomize( innerelemetLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap',
			property: '',
		} ).cssValueToBe( ``,
		);
	} );

	it( 'inline layout should apply correctly', async () => {
		const innerelemetLayout = {
			'hbb-stack': {
				desktop: 'inline',
				tablet: 'inline',
				mobile: 'inline',
			},
		};
		await setCustomize( innerelemetLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap',
			property: '',
		} ).cssValueToBe( ``,
		);
	} );
} );
