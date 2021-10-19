import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Section baclground color option under the customizer', () => {
	it( 'section background color option should apply correctly', async () => {
		const backgroundcolor = {
			'enable-related-posts': 'true',
			'related-posts-background-color': 'rgb(255, 255, 2)',
		};
		await setCustomize( backgroundcolor );
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

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.ast-single-related-posts-container' );
		await expect( {
			selector: '.ast-single-related-posts-container',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundcolor[ 'related-posts-background-color' ] }`,
		);
	} );
} );
