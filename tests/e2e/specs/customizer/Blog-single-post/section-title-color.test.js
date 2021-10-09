import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Section title color option under the customizer', () => {
	it( 'section title color option should apply correctly', async () => {
		const titlecolor = {
			'enable-related-posts': 'true',
			'related-posts-title-color': 'rgb(228, 25, 25)',
		};
		await setCustomize( titlecolor );
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

		await page.waitForSelector( ' .ast-separate-container .ast-single-related-posts-container ' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'color',
		} ).cssValueToBe( `${ titlecolor[ 'related-posts-title-color' ] }`,
		);
	} );
} );
