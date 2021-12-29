import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Single post option under the customizer', () => {
	it( 'grid and columns layout option should apply correctly', async () => {
		const GridandColumns = {
			'enable-related-posts': true,
			'related-posts-grid-responsive': {
				desktop: '3-equal',
				tablet: '2-equal',
				mobile: 'full',
			},
		};
		await setCustomize( GridandColumns );
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
		await page.waitForSelector( '.ast-single-related-posts-container .ast-related-posts-wrapper' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ GridandColumns[ 'related-posts-grid-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ GridandColumns[ 'related-posts-grid-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ GridandColumns[ 'related-posts-grid-responsive' ].mobile }`,
		);
	} );
} );
