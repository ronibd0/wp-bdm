import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'Meta font option under the customizer', () => {
	it( 'meta font option should apply correctly', async () => {
		const metaFont = {
			'enable-related-posts': 1,
			'related-posts-meta-font-family': "'Sofadi One', display",
			'related-posts-meta-text-transform': 'uppercase',
			'related-posts-meta-font-weight': '400',
			'related-posts-meta-font-size': {
				desktop: 30,
				tablet: 20,
				mobile: 10,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'related-posts-meta-font-extras': {
				'letter-spacing': '2',
				'letter-spacing-unit': 'px',
				'line-height': '2',
				'line-height-unit': '',
				'text-decoration': 'line-through',
				'text-transform': 'uppercase',
			},
		};
		await setCustomize( metaFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-post' ), {
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
			}`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				metaFont[ 'related-posts-meta-font-size' ].mobile,
			) }${
				metaFont[ 'related-posts-meta-font-size' ][ 'mobile-unit' ]
			}`,
		);

		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-extras' ][ 'letter-spacing' ] }` + `${ metaFont[ 'related-posts-meta-font-extras' ][ 'letter-spacing-unit' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'text-decoration-line',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-extras' ][ 'text-decoration' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-meta *',
			property: 'text-transform',
		} ).cssValueToBe( `${ metaFont[ 'related-posts-meta-font-extras' ][ 'text-transform' ] }` );
	} );
} );
