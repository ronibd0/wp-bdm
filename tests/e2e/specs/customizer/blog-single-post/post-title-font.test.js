import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { responsiveFontSize } from '../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Post title font option under the customizer', () => {
	it( 'post title font option should apply correctly', async () => {
		const postTitleFont = {
			'enable-related-posts': 1,
			'related-posts-title-font-family': 'Abel',
			'related-posts-title-text-transform': 'uppercase',
			'related-posts-title-font-weight': '400',
			'related-posts-title-font-size': {
				desktop: 50,
				tablet: 50,
				mobile: 50,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( postTitleFont );
		await createNewPost( { postType: 'post', title: 'sample-post' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test-post' } );
		await publishPost();
		await page.goto( createURL( 'sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( ' .ast-separate-container .ast-single-related-posts-container ' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-family',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-family' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'text-transform',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-text-transform' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-weight',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-weight' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-size',
		} ).cssValueToBe(
			`${ postTitleFont[ 'related-posts-title-font-size' ].desktop }${ postTitleFont[ 'related-posts-title-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a ',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				postTitleFont[ 'related-posts-title-font-size' ].tablet,
			) }${
				postTitleFont[ 'related-posts-title-font-size' ][ 'tablet-unit' ]
			}` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a ',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				postTitleFont[ 'related-posts-title-font-size' ].mobile,
			) }${
				postTitleFont[ 'related-posts-title-font-size' ][ 'mobile-unit' ]
			}` );
	} );
} );
