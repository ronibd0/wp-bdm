import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog Archive title font size options should apply correctly', async () => {
		const btitlefontsize = {
			'font-size-archive-summary-title': {
				desktop: '50',
				tablet: '50',
				mobile: '50',
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
			selector: '.ast-archive-description .ast-archive-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ btitlefontsize[ 'font-size-archive-summary-title' ].desktop }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'desktop-unit' ] }` );

		await page.waitForSelector( '.ast-archive-description .ast-archive-title  ' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ btitlefontsize[ 'font-size-archive-summary-title' ].tablet }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'tablet-unit' ] }` );

		await page.waitForSelector( '.ast-archive-description .ast-archive-title  ' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ btitlefontsize[ 'font-size-archive-summary-title' ].mobile }${ btitlefontsize[ 'font-size-archive-summary-title' ][ 'mobile-unit' ] }` );
	} );
} );
