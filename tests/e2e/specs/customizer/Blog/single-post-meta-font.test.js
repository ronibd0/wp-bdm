import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Meta font option under the customizer', () => {
	it( 'meta font option should apply correctly', async () => {
		const Metafont = {
			'enable-related-posts': 'true',
			'related-posts-meta-font-family': 'Abel',
			'related-posts-meta-text-transform': 'uppercase',
			'related-posts-meta-font-weight': '400',
			'related-posts-meta-font-size': {
				desktop: 50,
				tablet: 20,
				mobile: 20,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( Metafont );
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

		await page.waitForSelector( '.ast-related-post-content .entry-meta *' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-family',
		} ).cssValueToBe( `${ Metafont[ 'related-posts-meta-font-family' ] }`,
		);

		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'text-transform',
		} ).cssValueToBe( `${ Metafont[ 'related-posts-meta-text-transform' ] }`,
		);
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-weight',
		} ).cssValueToBe( `${ Metafont[ 'related-posts-meta-font-weight' ] }`,
		);
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-size',
		} ).cssValueToBe( `${ Metafont[ 'related-posts-meta-font-size' ].desktop }${ Metafont[ 'related-posts-meta-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
