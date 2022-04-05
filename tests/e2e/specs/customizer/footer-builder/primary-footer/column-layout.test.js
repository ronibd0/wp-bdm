import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'primary footer column and layout setting in customizer', () => {
	it( 'column and dlayout should apply correctly', async () => {
		const Primaryfooter = {
			'hb-footer-column': '3',
			'hb-footer-layout': {
				desktop: '3-rheavy',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( Primaryfooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-grid-row-3-equal .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-builder-grid-row-3-equal .ast-builder-grid-row',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ Primaryfooter[ 'hb-footer-layout' ].desktop }`,
		);
	} );
} );
