import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { responsiveFontSize } from '../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Copyright Margin setting in customizer', () => {
	it( 'copyright margin style should apply correctly', async () => {
		const copyrightmargin = {
			'section-footer-copyright-margin': {
				desktop: {
					top: 50,
					right: 50,
					bottom: 50,
					left: 50,
				},
				tablet: {
					top: 50,
					right: 50,
					bottom: 50,
					left: 50,
				},
				mobile: {
					top: 50,
					right: 50,
					bottom: 50,
					left: 50,
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

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.ast-footer-copyright' );

		//for Desktop
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }` );

		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }` );

		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }` );

		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-left',
		} ).cssValueToBe( `${ copyrightmargin[ 'section-footer-copyright-margin' ].desktop }${ copyrightmargin[ 'section-footer-copyright-margin' ][ 'desktop-unit' ] }` );

		//for Tablet
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-lrft',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		//for Mobile
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
		await expect( {
			selector: '.ast-footer-copyright',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrightmargin[ 'section-footer-copyright-margin' ].tablet,
			) }${
				copyrightmargin[ 'section-footer-copyright-margin' ][ 'tablet-unit' ]
			}`,
		);
	} );
} );
