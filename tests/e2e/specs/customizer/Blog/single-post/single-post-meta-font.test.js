import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Meta font option under the customizer', () => {
	it( 'meta font option should apply correctly', async () => {
		const metaFont = {
			'enable-related-posts': 1,
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
		await setCustomize( metaFont );
		await createNewPost( { postType: 'post', title: 'sample-post' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test-post' } );
		await publishPost();

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-related-post-content .entry-meta *' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-family',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-family' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'text-transform',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-text-transform' ] }` );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-weight',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-weight' ] }` );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-size',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-size' ].desktop }${ metaFont[ 'related-posts-meta-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				metaFont[ 'related-posts-meta-font-size' ].tablet,
			) }${
				metaFont[ 'related-posts-meta-font-size' ][ 'tablet-unit' ]
			}` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				metaFont[ 'related-posts-meta-font-size' ].mobile,
			) }${
				metaFont[ 'related-posts-meta-font-size' ][ 'mobile-unit' ]
			}` );
	} );
} );
