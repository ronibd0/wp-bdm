import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Below footer vertical alignment setting in customizer', () => {
	it( 'verical alignment top should apply correctly', async () => {
		const verticalAlignment = {
			'hbb-footer-vertical-alignment': 'flex-start',
		};
		await setCustomize( verticalAlignment );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );

		await scrollToElement( '#colophon' );

		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hbb-footer-vertical-alignment' ] }`,

		);
	} );
	it( 'verical alignment center should apply correctly', async () => {
		const verticalAlignment = {
			'hbb-footer-vertical-alignment': 'center',
		};
		await setCustomize( verticalAlignment );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );

		await scrollToElement( '#colophon' );

		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hbb-footer-vertical-alignment' ] }`,

		);
	} );
	it( 'verical alignment bottom should apply correctly', async () => {
		const verticalAlignment = {
			'hbb-footer-vertical-alignment': 'flex-end',
		};
		await setCustomize( verticalAlignment );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );

		await scrollToElement( '#colophon' );

		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .site-footer-section',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hbb-footer-vertical-alignment' ] }`,

		);
	} );
} );
