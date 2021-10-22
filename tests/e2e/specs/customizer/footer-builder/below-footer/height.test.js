import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';

describe( 'Below footer height setting in customizer', () => {
	it( 'height should apply correctly', async () => {
		const BelowfooterHeight = {
			'hbb-footer-height': '200',
		};
		await setCustomize( BelowfooterHeight );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'min-height',
		} ).cssValueToBe( `${ BelowfooterHeight[ 'hbb-footer-height' ] + 'px' }`,
		);
	} );
} );
