import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon margin for desktop should apply correctly', async () => {
		const SocialIconMargin = {
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
		await setCustomize( SocialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.top }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.right }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.bottom }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.left }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon margin for tablet should apply correctly', async () => {
		const SocialIconMargin = {
			'section-hb-social-icons-1-margin': {
				tablet: {
					top: '35',
					right: '35',
					bottom: '35',
					left: '35',
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
		await setCustomize( SocialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.top }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.right }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.bottom }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.left }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
	} );

	it( 'social icon margin for mobile should apply correctly', async () => {
		const SocialIconMargin = {
			'section-hb-social-icons-1-margin': {
				mobile: {
					top: '35',
					right: '35',
					bottom: '35',
					left: '35',
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
		await setCustomize( SocialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.top }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.right }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.bottom }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.left }${ SocialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
