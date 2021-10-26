import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';

describe( 'Below footer column and layout setting in customizer', () => {
	it( 'column na dlayout should apply correctly', async () => {
		const Belowfooter = {
			'hbb-footer-column': '2',
			'hbb-footer-layout': {
				desktop: '2-rheavy',
				// tablet: '2-lheavy',
				// mobile: '2-lheavy',
			},
		};

		await setCustomize( Belowfooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-grid-row-2-rheavy .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );

		await expect( {
			selector: '.ast-builder-grid-row-2-rheavy .ast-builder-grid-row',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ Belowfooter[ 'hbb-footer-layout' ].desktop }`,
		);
	} );
} );
