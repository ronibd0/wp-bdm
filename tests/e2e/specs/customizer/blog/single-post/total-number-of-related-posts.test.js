import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'total number of related post option should apply correctly', async () => {
		const Numberofpost = {
			'enable-related-posts': true,
			'related-posts-total-count': 3,
		};
		await setCustomize( Numberofpost );
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
		await createNewPost( {
			postType: 'post',
			title: 'testing-post',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'qa-post',
		} );
		await publishPost();
		await page.goto( createURL( 'sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper .ast-related-post' );
		const posts = await page.$eval( '.ast-related-posts-wrapper .ast-related-post', ( element ) => element.getAttribute( '.ast-related-post-content' ) );
		await expect( posts ).toBeNull( );
	} );
} );
