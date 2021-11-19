import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Social Icons show label in the customizer', () => {
	it( 'social icon color for desktop should apply correctly', async () => {
		const socialiconlabelColor = {
			'footer-social-1-label-toggle': '1',
			'footer-social-1-label-color': {
				desktop: 'rgb(158, 50, 47)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabelColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element span.social-item-label' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element span.social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialiconlabelColor[ 'footer-social-1-label-color' ].desktop }`,
		);
	} );
} );
