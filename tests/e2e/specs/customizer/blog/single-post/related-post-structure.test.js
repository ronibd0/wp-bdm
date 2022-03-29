import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'related post structure option should apply correctly', async () => {
		const relatedPostStructure = {
			'enable-related-posts': 1,
			'related-posts-structure': {
				'title-meta': 1,
			},
		};
		await setCustomize( relatedPostStructure );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.entry-header' );
		const relatedTitleMeta = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.ast-related-post-content .entry-header' ) );
		await expect( relatedTitleMeta ).toBeNull( );
	} );
} );
