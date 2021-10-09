import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Section title font option under the customizer', () => {
	it( 'section title font option should apply correctly', async () => {
		const sectiontitlefont = {
			'enable-related-posts': 'true',
			'related-posts-section-title-font-family': 'Abel',
			'related-posts-section-title-text-transform': 'uppercase',
			'related-posts-section-title-font-weight': '400',
			'related-posts-section-title-font-size': {
				desktop: 50,
				tablet: 22,
				mobile: 18,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( sectiontitlefont );
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
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'font-family',
		} ).cssValueToBe( `${ sectiontitlefont[ 'related-posts-section-title-font-family' ] }`,
		);

		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'text-transform',
		} ).cssValueToBe( `${ sectiontitlefont[ 'related-posts-section-title-text-transform' ] }`,
		);

		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'font-weight',
		} ).cssValueToBe( `${ sectiontitlefont[ 'related-posts-section-title-font-weight' ] }`,
		);

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe( `${ sectiontitlefont[ 'related-posts-section-title-font-size' ].desktop }${ sectiontitlefont[ 'related-posts-section-title-font-size' ][ 'desktop-unit' ] }`,
		);
	} );
} );
