import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'blog archive in the customizer', () => {
	it( 'post structure structure should apply corectly', async () => {
		const BlogpostStructure = {
			'blog-meta': {
				0: 'comments',
				1: 'category',
				2: 'author',
				3: 'date',
			},
		};
		await setCustomize( BlogpostStructure );
		await createNewPost( { postType: 'post', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.blog-layout-1 .post-content' );
		const Comments = await page.$eval( '.blog-layout-1 .post-content', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( Comments ).toBeNull( );

		await page.waitForSelector( '.blog-layout-1 .post-content' );
		const Category = await page.$eval( '.blog-layout-1 .post-content', ( element ) => element.getAttribute( '.cat-links' ) );
		await expect( Category ).toBeNull( );

		await page.waitForSelector( '.blog-layout-1 .post-content' );
		const Authorname = await page.$eval( '.blog-layout-1 .post-content', ( element ) => element.getAttribute( '.author-name' ) );
		await expect( Authorname ).toBeNull( );

		await page.waitForSelector( '.blog-layout-1 .post-content' );
		const Postedon = await page.$eval( '.blog-layout-1 .post-content', ( element ) => element.getAttribute( 'posted-on' ) );
		await expect( Postedon ).toBeNull( );
	} );
} );
