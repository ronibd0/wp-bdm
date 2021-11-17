import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'html2 block settings in the customizer', () => {
	it( 'html2 font size for desktop should apply correctly', async () => {
		const htmlfontSize = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'font-size-section-hb-html-2': {
				desktop: '50',
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlfontSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe(
			`${ htmlfontSize[ 'font-size-section-hb-html-2' ].desktop }${ htmlfontSize[ 'font-size-section-hb-html-2' ][ 'desktop-unit' ] }`,
		);
	} );
	it( 'html2 font size for tablet should apply correctly', async () => {
		const htmlfontSize = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'font-size-section-hb-html-2': {
				tablet: '30',
				'tablet-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlfontSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element' );
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				htmlfontSize[ 'font-size-section-hb-html-2' ].tablet,
			) }${
				htmlfontSize[ 'font-size-section-hb-html-2' ][ 'tablet-unit' ]
			}`,
		);
	} );

	it( 'html2 font size for mobile should apply correctly', async () => {
		const htmlfontSize = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'font-size-section-hb-html-2': {
				mobile: '30',
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlfontSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element' );
		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize(
			htmlfontSize[ 'font-size-section-hb-html-2' ].mobile,
		) }${
			htmlfontSize[ 'font-size-section-hb-html-2' ][ 'mobile-unit' ]
		}`,
		);
	} );
} );
