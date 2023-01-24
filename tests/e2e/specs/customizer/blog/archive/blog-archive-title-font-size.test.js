import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog Archive title font size options should apply correctly', async () => {
		const blogArchiveTitleFontSize = {
			'ast-dynamic-archive-post-title-font-size': {
				desktop: '60',
				tablet: '40',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( blogArchiveTitleFontSize );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'Blog-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-archive-description .ast-archive-title' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title',
			property: 'font-size',
		} ).cssValueToBe( `${ ( blogArchiveTitleFontSize[ 'ast-dynamic-archive-post-title-font-size' ].desktop ) }${ blogArchiveTitleFontSize[ 'ast-dynamic-archive-post-title-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
