import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Primary footer hide on desktop setting in customizer', () => {
	it( 'should be hide on desktop', async () => {
		const hideOnDesktop = {
			'section-primary-footer-builder-hide-desktop': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'display',
		} ).cssValueToBe( `${ hideOnDesktop[ 'section-primary-footer-builder-hide-desktop' ] }` );
	} );

	it( 'should be hide on tablet', async () => {
		const hideOnTablet = {
			'section-primary-footer-builder-hide-tablet': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'display',
		} ).cssValueToBe( `${ hideOnTablet[ 'section-primary-footer-builder-hide-tablet' ] }` );
	} );

	it( 'should be hide on mobile', async () => {
		const hideOnMobile = {
			'section-primary-footer-builder-hide-mobile': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: ' .site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row ',
			property: 'display',
		} ).cssValueToBe( `${ hideOnMobile[ 'section-primary-footer-builder-hide-mobile' ] }` );
	} );
} );
