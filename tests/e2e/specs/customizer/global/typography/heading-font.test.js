import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';

describe( 'Global heading settings in the customizer', () => {
	it( 'heading font settings should be applied correctly', async () => {
		const globalHeading = {
			'headings-font-family': 'Times, Georgia, serif',
			'headings-font-weight': '800',
			'headings-text-transform': 'uppercase',
			'headings-line-height': '25px',
			'font-family-h1': 'Verdana, Helvetica, Arial, sans-serif',
			'font-weight-h1': '800',
			'text-transform-h1': 'uppercase',
			'line-height-h1': '20px',
		};

		await setCustomize( globalHeading );

		await createNewPost( { postType: 'post', title: 'heading' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'heading' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h2, .entry-content h2' );

		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'font-family',
		} ).cssValueToBe( `${ globalHeading[ 'headings-font-family' ] }`,
		);

		await page.waitForSelector( 'h2, .entry-content h2' );
		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalHeading[ 'headings-text-transform' ] }` );

		await page.waitForSelector( 'h2, .entry-content h2' );
		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalHeading[ 'headings-font-weight' ] }` );

		await page.waitForSelector( '.entry-content h2' );
		await expect( {
			selector: '.entry-content h2',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalHeading[ 'headings-text-transform' ] }` );

		await page.waitForSelector( '.entry-content h2' );
		await expect( {
			selector: '.entry-content h2',
			property: 'line-height',
		} ).cssValueToBe( `${ globalHeading[ 'headings-line-height' ] }` );

		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globalHeading[ 'font-family-h1' ] }` );

		await page.waitForSelector( '.entry-content h2' );
		await expect( {
			selector: '.entry-content h2',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalHeading[ 'text-transform-h1' ] }` );

		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalHeading[ 'text-transform-h1' ] }` );

		await page.waitForSelector( '.site-title' );
		await expect( {
			selector: '.site-title',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalHeading[ 'font-weight-h1' ] }` );
	} );
} );
