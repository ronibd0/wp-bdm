import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon margin for desktop should apply correctly', async () => {
		const socialiconMargin = {
			'section-hb-social-icons-1-margin': {
				desktop: {
					top: '0',
					right: '6',
					bottom: '0',
					left: '0',
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.top }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.right }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.bottom }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.left }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon margin for tablet should apply correctly', async () => {
		const socialiconMargin = {
			'section-hb-social-icons-1-margin': {
				tablet: {
					top: '0',
					right: '6',
					bottom: '0',
					left: '0',
				},
				'tablet-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.top }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.right }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.bottom }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.left }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
	} );

	it( 'social icon margin for mobile should apply correctly', async () => {
		const socialiconMargin = {
			'section-hb-social-icons-1-margin': {
				mobile: {
					top: '0',
					right: '6',
					bottom: '0',
					left: '0',
				},
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].mobile.top }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].mobile.right }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].mobile.bottom }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].mobile.left }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
