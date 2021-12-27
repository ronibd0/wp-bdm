import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post font option under the customizer', () => {
	it( 'related post structure option should apply correctly', async () => {
		const relatedpostStructure = {
			'enable-related-posts': true,
			'related-posts-structure': {
				'title-meta': 1,
			},
		};
		await setCustomize( relatedpostStructure );
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
		const RelatedtitleMeta = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.ast-related-post-content .entry-header' ) );
		await expect( RelatedtitleMeta ).toBeNull( );
	} );
} );
