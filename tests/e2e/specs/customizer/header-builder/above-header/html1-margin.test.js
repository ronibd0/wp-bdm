import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'HTML1 widget margin in the above header section under the customizer', () => {
	it( 'html1 widget margin for desktop should apply correctly', async () => {
		const htmlMargin = {
			'header-html-1': '<p>HTML Text color |<a href="https://wpastra.com/" rel="nofollow noopener" target="_blank">Astra QA</a></p>',
			'section-hb-html-1-margin': {
				desktop: {
					top: 50,
					right: 60,
					bottom: 50,
					left: 65,
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'html-1',

					},
				},
			},
		};
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-1' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'html1 widget margin for tablet should apply correctly', async () => {
		const htmlMargin = {
			'header-html-1': '<p>HTML Text color |<a href="https://wpastra.com/" rel="nofollow noopener" target="_blank">Astra QA</a></p>',
			'section-hb-html-1-margin': {
				tablet: {
					top: 30,
					right: 60,
					bottom: 30,
					left: 60,
				},
				'tablet-unit': 'px',
			},
			'header-mobile-items': {
				above: {
					above_left: {
						0: 'html-1',

					},
				},
			},
		};
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-1' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }`,
		);
	} );

	it( 'html1 widget margin for mobile should apply correctly', async () => {
		const htmlMargin = {
			'header-html-1': '<p>HTML Text color |<a href="https://wpastra.com/" rel="nofollow noopener" target="_blank">Astra QA</a></p>',
			'section-hb-html-1-margin': {
				mobile: {
					top: 30,
					right: 60,
					bottom: 30,
					left: 60,
				},
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				above: {
					above_left: {
						0: 'html-1',

					},
				},
			},
		};
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-1' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
