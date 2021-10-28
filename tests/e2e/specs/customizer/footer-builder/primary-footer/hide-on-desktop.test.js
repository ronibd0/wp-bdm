import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Primary footer hide on desktop setting in customizer', () => {
	it( 'hide on desktop should apply correctly', async () => {
		const hideondesktop = {
			'section-primary-footer-builder-hide-desktop': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideondesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'display',
		} ).cssValueToBe( `${ hideondesktop[ 'section-primary-footer-builder-hide-desktop' ] }` );
	} );

	it( 'hide on tablet should apply correctly', async () => {
		const hideontablet = {
			'section-primary-footer-builder-hide-tablet': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideontablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'display',
		} ).cssValueToBe( `${ hideontablet[ 'section-primary-footer-builder-hide-tablet' ] }` );
	} );

	it( 'hide on mobile should apply correctly', async () => {
		const hideonmobile = {
			'section-primary-footer-builder-hide-mobile': 'grid',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideonmobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: ' .site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row ',
			property: 'display',
		} ).cssValueToBe( `${ hideonmobile[ 'section-primary-footer-builder-hide-mobile' ] }` );
	} );
} );
