import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Enable related post option under the customizer', () => {
	it( 'enable related post options should apply correctly', async () => {
		const relatedpost = {
			'enable-related-posts': 'true',
			'related-posts-title': ( 'Related Posts' ),
			'releted-posts-title-alignment': 'center',
		};
		await setCustomize( relatedpost );
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
			selector: '.ast-related-posts-title ',
			property: 'text-align',
		} ).cssValueToBe( `${ relatedpost[ 'releted-posts-title-alignment' ] }` );
	} );
} );
