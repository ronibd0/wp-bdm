import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { scrollToElement } from '../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'social icons in the customizer', () => {
	it( 'social icon hide on devices should apply correctly', async () => {
		const hideOnDevices = {
			'section-fb-social-icons-1-hide-desktop': {
				desktop: 'none',
			},
			'section-fb-social-icons-1-hide-tablet': {
				tablet: 'none',
			},
			'section-fb-social-icons-1-hide-mobile': {
				mobile: 'none',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( hideOnDevices );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]' );
		await expect( {
			selector: '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `${ hideOnDevices[ 'section-fb-social-icons-1-hide-desktop' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `${ hideOnDevices[ 'section-fb-social-icons-1-hide-tablet' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `${ hideOnDevices[ 'section-fb-social-icons-1-hide-mobile' ].mobile }` );
	} );
} );
