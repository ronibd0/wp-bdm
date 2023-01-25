import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Global button setting under the Customizer', () => {
	it( 'button text and background color should apply correctly', async () => {
		const buttonColor = {
			'button-color': 'rgb(2, 66, 95)',
			'button-bg-color': 'rgb(226, 207, 227)',
		};
		await setCustomize( buttonColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'post',
				title: 'button-color-test',
			} );
			await insertBlock( 'Buttons' );
			await page.keyboard.type( 'Login' );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'button-color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'button-color' ] }` );

		await page.waitForSelector( '.wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'button-bg-color' ] }` );

		await page.goto( createURL( 'button-color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'input#submit, input[type="submit"]' );
		await expect( {
			selector: 'input#submit, input[type="submit"]',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'button-bg-color' ] }` );

		await page.waitForSelector( 'input#submit, input[type="submit"]' );
		await expect( {
			selector: 'input#submit, input[type="submit"]',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'button-color' ] }` );
	} );
} );
