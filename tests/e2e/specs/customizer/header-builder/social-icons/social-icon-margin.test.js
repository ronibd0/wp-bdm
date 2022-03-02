import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon margin for desktop should apply correctly', async () => {
		const socialIconMargin = {
			'section-hb-social-icons-1-margin': {
				desktop: {
					top: '35',
					right: '35',
					bottom: '35',
					left: '35',
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
		await setCustomize( socialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon margin for tablet should apply correctly', async () => {
		const socialIconMargin = {
			'section-hb-social-icons-1-margin': {
				tablet: {
					top: '25',
					right: '25',
					bottom: '25',
					left: '25',
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
		await setCustomize( socialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
	} );

	it( 'social icon margin for mobile should apply correctly', async () => {
		const socialIconMargin = {
			'section-hb-social-icons-1-margin': {
				mobile: {
					top: '25',
					right: '25',
					bottom: '25',
					left: '25',
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
		await setCustomize( socialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
