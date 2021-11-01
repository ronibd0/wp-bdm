import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Below header padding setting in customizer', () => {
	it( 'padding should apply correctly', async () => {
		const belowheaderPadding = {
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
			'section-below-header-builder-padding': {
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
		await setCustomize( belowheaderPadding );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-below-header-bar.ast-below-header' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].desktop.top }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].desktop.right }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].desktop.bottom }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].desktop.left }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].tablet.top }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].tablet.right }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].tablet.bottom }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].tablet.left }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].mobile.top }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].mobile.right }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].mobile.bottom }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-below-header-bar.ast-below-header, .ast-header-break-point .ast-below-header-bar.ast-below-header',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowheaderPadding[ 'section-below-header-builder-padding' ].mobile.left }${ belowheaderPadding[ 'section-below-header-builder-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );