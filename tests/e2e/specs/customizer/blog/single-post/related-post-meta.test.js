import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post font option under the customizer', () => {
	it( 'related post meta option should apply correctly', async () => {
		const relatedpostMeta = {
			'enable-related-posts': true,
			'related-posts-meta-structure': {
				0: 'comments',
				1: 'category',
				2: 'author',
				3: 'date',
			},
		};
		await setCustomize( relatedpostMeta );
		await createNewPost( {
			postType: 'post',
			title: 'sample-post',

		} );
		await publishPost();

		await createNewPost( {
			postType: 'post',
			title: 'test-post',

		} );
		await publishPost();
		await page.goto( createURL( 'sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.entry-header' );
		const Comment = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( Comment ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Category = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.cat-links' ) );
		await expect( Category ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Author = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.author-name' ) );
		await expect( Author ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Date = await page.$eval( '.entry-header', ( element ) => element.getAttribute( 'posted-on' ) );
		await expect( Date ).toBeNull();
	} );
} );
