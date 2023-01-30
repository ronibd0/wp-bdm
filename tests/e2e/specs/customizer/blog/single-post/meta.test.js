import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Single post in the customizer', () => {
	it( 'structure should apply corectly', async () => {
		const singlePostMeta = {
			'ast-dynamic-single-post-metadata': {
				0: 'comments',
				1: 'author',
				2: 'date',
				3: 'ast-dynamic-single-post-taxonomy',
			},
			'ast-dynamic-single-post-taxonomy': 'category',
		};
		await setCustomize( singlePostMeta );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'hello world' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/hello-world' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-meta' );
		const Comment = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( Comment ).toBeNull();

		await page.waitForSelector( '.entry-meta' );
		const Author = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.posted-by' ) );
		await expect( Author ).toBeNull();

		await page.waitForSelector( '.entry-meta' );
		const Date = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.posted-on' ) );
		await expect( Date ).toBeNull();

		await page.waitForSelector( '.entry-meta' );
		const Tags = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.ast-terms-link' ) );
		await expect( Tags ).toBeNull();
	} );
} );
