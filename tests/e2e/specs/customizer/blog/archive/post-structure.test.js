import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'blog archive in the customizer', () => {
	it( 'post structure structure should apply corectly', async () => {
		const BlogpostStructure = {
			'blog-post-structure': {
				'title-meta': 1,
			},
		};
		await setCustomize( BlogpostStructure );
		await createNewPost( { postType: 'post', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.blog-layout-1 .post-content' );
		const title = await page.$eval( '.blog-layout-1 .post-content', ( element ) => element.getAttribute( '.entry-header' ) );
		await expect( title ).toBeNull( );
	} );
} );
