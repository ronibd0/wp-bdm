import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Search-icon margin in the customizer', () => {
	it( 'search-icon margin for desktop should apply correctly', async () => {
		const searchiconMargin = {
			'section-header-search-margin': {
				desktop: {
					top: '30',
					right: '30',
					bottom: '30',
					left: '30',
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'search',

					},
				},
			},
		};
		await setCustomize( searchiconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-search' );
		await expect( {
			selector: '.ast-header-search',
			property: 'margin-top',
		} ).cssValueToBe( `${ searchiconMargin[ 'section-header-search-margin' ].desktop.top }${ searchiconMargin[ 'section-header-search-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-search',
			property: 'margin-right',
		} ).cssValueToBe( `${ searchiconMargin[ 'section-header-search-margin' ].desktop.right }${ searchiconMargin[ 'section-header-search-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-search',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ searchiconMargin[ 'section-header-search-margin' ].desktop.bottom }${ searchiconMargin[ 'section-header-search-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-header-search',
			property: 'margin-left',
		} ).cssValueToBe( `${ searchiconMargin[ 'section-header-search-margin' ].desktop.left }${ searchiconMargin[ 'section-header-search-margin' ][ 'desktop-unit' ] }`,
		);
	} );
} );
