import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog Archive title font size options should apply correctly', async () => {
		const btitlefontsize = {
			'font-size-archive-summary-title': {
				desktop: '22',
				tablet: '20',
				mobile: '18',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( btitlefontsize );
		await createNewPost( {
			postType: 'post',
			title: 'sample-page',

		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-archive-description .ast-archive-title ' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title ',
			property: 'font-size',
		} ).cssValueToBe( `${ ( btitlefontsize[ 'font-size-archive-summary-title' ].desktop ) }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				btitlefontsize[ 'font-size-archive-summary-title' ].tablet,
			) }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				btitlefontsize[ 'font-size-archive-summary-title' ].mobile,
			) }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'mobile-unit' ] }`,
		);
	} );
} );
