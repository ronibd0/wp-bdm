import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Account Icons in the customizer', () => {
	it( 'account icon margin for desktop should apply correctly', async () => {
		const accounticonMargin = {
			'header-account-margin': {
				desktop: {
					top: '20',
					right: '26',
					bottom: '20',
					left: '20',
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'account',

					},
				},
			},
		};
		await setCustomize( accounticonMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-account-wrap' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].desktop.top }${ accounticonMargin[ 'header-account-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].desktop.right }${ accounticonMargin[ 'header-account-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].desktop.bottom }${ accounticonMargin[ 'header-account-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].desktop.left }${ accounticonMargin[ 'header-account-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'account icon margin for tablet should apply correctly', async () => {
		const accounticonMargin = {
			'header-account-margin': {
				tablet: {
					top: '20',
					right: '26',
					bottom: '20',
					left: '20',
				},
				'tablet-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'account',

					},
				},
			},
		};
		await setCustomize( accounticonMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-account-wrap' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].tablet.top }${ accounticonMargin[ 'header-account-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].tablet.right }${ accounticonMargin[ 'header-account-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].tablet.bottom }${ accounticonMargin[ 'header-account-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].tablet.left }${ accounticonMargin[ 'header-account-margin' ][ 'tablet-unit' ] }`,
		);
	} );

	it( 'account icon margin for mobile should apply correctly', async () => {
		const accounticonMargin = {
			'header-account-margin': {
				mobile: {
					top: '20',
					right: '26',
					bottom: '20',
					left: '20',
				},
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'account',

					},
				},
			},
		};
		await setCustomize( accounticonMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-account-wrap' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].mobile.top }${ accounticonMargin[ 'header-account-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].mobile.right }${ accounticonMargin[ 'header-account-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].mobile.bottom }${ accounticonMargin[ 'header-account-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accounticonMargin[ 'header-account-margin' ].mobile.left }${ accounticonMargin[ 'header-account-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );

