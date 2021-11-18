import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'html2 block settings in the customizer', () => {
	it( 'html2 margin for desktop should apply correctly', async () => {
		const htmlMargin = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'section-hb-html-2-margin': {
				desktop: {
					top: 60,
					right: 60,
					bottom: 60,
					left: 65,
				},
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
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2' );
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].desktop.top }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].desktop.right }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].desktop.bottom }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].desktop.left }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'html2 margin for tablet should apply correctly', async () => {
		const htmlMargin = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'section-hb-html-2-margin': {
				tablet: {
					top: 60,
					right: 60,
					bottom: 60,
					left: 65,
				},
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
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].tablet.top }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].tablet.right }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].tablet.bottom }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].tablet.left }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'tablet-unit' ] }`,
		);
	} );

	it( 'html2 margin for mobile should apply correctly', async () => {
		const htmlMargin = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'section-hb-html-2-margin': {
				mobile: {
					top: 60,
					right: 60,
					bottom: 60,
					left: 65,
				},
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
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].mobile.top }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].mobile.right }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].mobile.bottom }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-2',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-2-margin' ].mobile.left }${ htmlMargin[ 'section-hb-html-2-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );

