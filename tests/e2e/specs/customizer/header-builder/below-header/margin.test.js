import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Below header margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const belowheaderMargin = {
			'header-desktop-items': {
				below: {
					below_center: {
						0: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'button-1',
					},
				},
			},
			'section-below-header-builder-margin': {
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
		await setCustomize( belowheaderMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-below-header-bar.ast-below-header' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].desktop.top }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].desktop.right }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].desktop.bottom }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].desktop.left }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].tablet.top }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].tablet.right }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].tablet.bottom }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].tablet.left }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].mobile.top }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].mobile.right }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].mobile.bottom }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowheaderMargin[ 'section-below-header-builder-margin' ].mobile.left }${ belowheaderMargin[ 'section-below-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
