import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon margin for desktop should apply correctly', async () => {
		const socialiconMargin = {
			'section-hb-social-icons-1-margin': {
				desktop: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
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
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.top }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.right }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.bottom }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].desktop.left }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon margin for tablet should apply correctly', async () => {
		const socialiconMargin = {
			'section-hb-social-icons-1-margin': {
				tablet: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
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
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.top }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.right }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.bottom }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconMargin[ 'section-hb-social-icons-1-margin' ].tablet.left }${ socialiconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }`,
		);
	} );
} );
