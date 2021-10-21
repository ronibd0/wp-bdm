import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'Copyright Margin setting in customizer', () => {
	it( 'copyright margin style should apply correctly', async () => {
		const copyrightmargin = {
			'section-footer-copyright-margin': {
				desktop: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				tablet: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				mobile: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',

			},

		};
		await setCustomize( copyrightmargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-footer-copyright' );

		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop.top }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop.right }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop.bottom }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-left',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop.left }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].tablet.top }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].tablet.right }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].tablet.bottom }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-left',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].tablet.left }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].mobile.top }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].mobile.right }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].mobile.bottom }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-left',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].mobile.left }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
