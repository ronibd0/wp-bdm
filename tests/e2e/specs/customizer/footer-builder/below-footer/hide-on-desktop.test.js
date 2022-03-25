import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Below footer hide on desktop setting in customizer', () => {
	it( 'should hide on desktop', async () => {
		const hideOnDesktop = {
			'section-below-footer-builder-hide-desktop': 'none',
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `${ hideOnDesktop[ 'section-below-footer-builder-hide-desktop' ] }` );
	} );

	it( 'should hide on tablet', async () => {
		const hideOnTablet = {
			'section-below-footer-builder-hide-tablet': 'none',
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `${ hideOnTablet[ 'section-below-footer-builder-hide-tablet' ] }` );
	} );

	it( 'should hide on mobile', async () => {
		const hideOnMobile = {
			'section-below-footer-builder-hide-mobile': 'none',
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: ' .site-below-footer-wrap[data-section="section-below-footer-builder"] ',
			property: 'display',
		} ).cssValueToBe( `${ hideOnMobile[ 'section-below-footer-builder-hide-mobile' ] }` );
	} );
} );
