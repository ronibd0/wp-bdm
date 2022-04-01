import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Below footer hide on desktop setting in customizer', () => {
	it( 'below footer should hide on desktop', async () => {
		const hideOnDesktop = {
			'section-below-footer-builder-hide-desktop': 1,
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		const desktop = await page.$eval( '.site-footer', ( element ) => element.getAttribute( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' ) );
		await expect( desktop ).toBeNull( );
	} );

	it( 'below footer should hide on tablet', async () => {
		const hideOnTablet = {
			'section-below-footer-builder-hide-tablet': 1,
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		const tablet = await page.$eval( '.site-footer', ( element ) => element.getAttribute( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' ) );
		await expect( tablet ).toBeNull( );
	} );

	it( 'below footer should hide on mobile', async () => {
		const hideOnMobile = {
			'section-below-footer-builder-hide-mobile': 1,
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		const tablet = await page.$eval( '.site-footer', ( element ) => element.getAttribute( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' ) );
		await expect( tablet ).toBeNull( );
	} );
} );
