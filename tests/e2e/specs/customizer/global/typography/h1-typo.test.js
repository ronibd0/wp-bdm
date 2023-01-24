import {
	createURL,
	createNewPost,
	setPostContent,
} from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
describe( 'global typography H1 settings in the customizer', () => {
	it( 'heading 1 font family settings should be applied correctly', async () => {
		const heading1Font = {
			'font-family-h1': "'Eagle Lake', handwriting",
			'font-weight-h1': '400',
			'font-size-h1': {
				desktop: '60',
				tablet: '20',
				mobile: '10',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( heading1Font );

		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'post',
				title: 'heading-1-typography-test',
			} );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'heading-1-typography-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-content' );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ heading1Font[ 'font-family-h1' ] }` );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ heading1Font[ 'font-weight-h1' ] }` );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ heading1Font[ 'font-size-h1' ].desktop }${ heading1Font[ 'font-size-h1' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.entry-content' );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ heading1Font[ 'font-size-h1' ].tablet }${ heading1Font[ 'font-size-h1' ][ 'tablet-unit' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.entry-content' );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ heading1Font[ 'font-size-h1' ].mobile }${ heading1Font[ 'font-size-h1' ][ 'mobile-unit' ] }`,
		);
	} );
} );
