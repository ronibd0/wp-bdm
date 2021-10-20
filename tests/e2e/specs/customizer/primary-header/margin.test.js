import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Primary header margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const belowfooterMargin = {
			'section-primary-header-builder-margin': {
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
		await setCustomize( belowfooterMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-desktop .ast-primary-header-bar.main-header-bar' );
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar.main-header-bar',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].desktop.top }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar.main-header-bar',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].desktop.right }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar.main-header-bar',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].desktop.bottom }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar.main-header-bar',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].desktop.left }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].tablet.top }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].tablet.right }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].tablet.bottom }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].tablet.left }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].mobile.top }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].mobile.right }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].mobile.bottom }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-break-point #masthead .ast-primary-header-bar.main-header-bar',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowfooterMargin[ 'section-primary-header-builder-margin' ].mobile.left }${ belowfooterMargin[ 'section-primary-header-builder-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );