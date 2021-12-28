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
		await page.waitForSelector( '.entry-header' );
		const title = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.ast-post-format- ast-no-thumb blog-layout-1' ) );
		await expect( title ).toBeNull( );
	} );
} );
