import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { scrollToElement } from '../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'footer social icon hide on desktop should apply correctly', async () => {
		const hideoDesktop = {
			'section-fb-social-icons-1-hide-desktop': {
				desktop: 'grid',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideoDesktop );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe(
			`${ hideoDesktop[ 'section-fb-social-icons-1-hide-desktop' ].desktop }`,
		);
	} );

	it( 'footer social icon hide on tablet should apply correctly', async () => {
		const hideoTablet = {
			'section-fb-social-icons-1-hide-tablet': {
				tablet: 'grid',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideoTablet );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe(
			`${ hideoTablet[ 'section-fb-social-icons-1-hide-tablet' ].tablet }`,
		);
	} );

	it( 'footer social icon hide on mobile should apply correctly', async () => {
		const hideoMobile = {
			'section-fb-social-icons-1-hide-mobile': {
				mobile: 'grid',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideoMobile );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe(
			`${ hideoMobile[ 'section-fb-social-icons-1-hide-mobile' ].mobile }`,
		);
	} );
} );
