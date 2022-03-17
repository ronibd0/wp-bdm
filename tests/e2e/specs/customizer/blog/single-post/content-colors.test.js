import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Section Content color option under the customizer', () => {
	it( 'content color option should apply correctly', async () => {
		const contentColor = {
			'enable-related-posts': 1,
			'related-posts-text-color': 'rgb(138, 13, 0)',
			'related-posts-meta-color': 'rgb(138, 13, 0)',
			'related-posts-meta-link-hover-color': 'rgb(172, 36, 143)',
		};
		await setCustomize( contentColor );
		await createNewPost( { postType: 'post', title: 'sample-post' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test-post' } );
		await publishPost();
		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-post-content .entry-header .ast-related-post-title a' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'color',
		} ).cssValueToBe( `${ contentColor[ 'related-posts-text-color' ] }` );

		await expect( {
			selector: ' .ast-related-post-content .entry-meta *',
			property: 'color',
		} ).cssValueToBe( `${ contentColor[ 'related-posts-meta-color' ] }` );
		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '#main > div.ast-single-related-posts-container > div.ast-related-posts-wrapper > article > div > div > header > div > span.comments-link > a' );
		await page.hover( '#main > div.ast-single-related-posts-container > div.ast-related-posts-wrapper > article > div > div > header > div > span.comments-link > a' );
		await expect( {
			selector: '#main > div.ast-single-related-posts-container > div.ast-related-posts-wrapper > article > div > div > header > div > span.comments-link > a',
			property: 'color',
		} ).cssValueToBe( `${ contentColor[ 'related-posts-meta-link-hover-color' ] }` );
	} );
} );
