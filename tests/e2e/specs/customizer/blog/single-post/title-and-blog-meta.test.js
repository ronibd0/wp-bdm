import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header logo settings in the customizer', () => {
	it( 'logo width should apply correctly', async () => {
		const logoWidth = {
			'blog-single-post-structure': {
				1: 'single-title-meta',
			},
		};
		await setCustomize( logoWidth );
		await createNewPost( {
			postType: 'post',
			title: 'sample-page',

		} );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'article' );
		await expect( {
			selector: 'article',
			property: 'display',
		} ).cssValueToBe( `${ logoWidth[ 'blog-single-post-structure' ] }` );
	} );
} );
