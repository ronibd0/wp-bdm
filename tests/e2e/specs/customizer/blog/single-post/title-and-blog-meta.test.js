import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'single post in the customizer', () => {
	it( 'structure should apply corectly', async () => {
		const SinglepostStructure = {
			'blog-single-post-structure': {
				'single-title-meta': 1,
			},
		};
		await setCustomize( SinglepostStructure );
		await createNewPost( { postType: 'post', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-header' );
		const titleMeta = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.ast-single-post-order' ) );
		await expect( titleMeta ).toBeNull( );
	} );
} );
