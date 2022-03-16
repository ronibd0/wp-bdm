import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Section title font option under the customizer', () => {
	it( 'section title font option should apply correctly', async () => {
		const sectionTitleFont = {
			'enable-related-posts': 1,
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
		await setCustomize( sectionTitleFont );
		await createNewPost( { postType: 'post', title: 'sample-post' } );
		await publishPost();

		await createNewPost( { postType: 'post', title: 'test-post' } );
		await publishPost();

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, 150 );
		} );
		await page.waitForSelector( ' .ast-separate-container .ast-single-related-posts-container ' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'font-family',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-family' ] }` );

		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'text-transform',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-text-transform' ] }` );

		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-title-section .ast-related-posts-title',
			property: 'font-weight',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-weight' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-size' ].desktop }${ sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				sectionTitleFont[ 'related-posts-section-title-font-size' ].tablet,
			) }${
				sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'tablet-unit' ]
			}`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				sectionTitleFont[ 'related-posts-section-title-font-size' ].mobile,
			) }${
				sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
