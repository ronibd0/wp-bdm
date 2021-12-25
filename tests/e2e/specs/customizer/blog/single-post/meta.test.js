import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'single post in the customizer', () => {
	it( 'structure should apply corectly', async () => {
		const SinglepostMeta = {
			'blog-single-meta': {
				comments: 1,
				category: 1,
			},
		};
		await setCustomize( SinglepostMeta );
		await createNewPost( { postType: 'post', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-meta' );
		const Meta = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( Meta ).toBeNull( );
	} );
} );
