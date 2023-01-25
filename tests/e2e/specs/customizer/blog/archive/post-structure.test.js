import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';

describe( 'Blog archive in the customizer', () => {
	it( 'post structure should apply correctly', async () => {
		const blogPostStructure = {
			'blog-post-structure': {
				'title-meta': 0,
			},
		};
		await setCustomize( blogPostStructure );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'Test' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .site-main > .ast-row' );
		const postStructure = await page.$eval( '.ast-separate-container .site-main > .ast-row', ( element ) => element.getAttribute( '.entry-header' ) );
		await expect( postStructure ).toBeNull( );
	} );
} );
