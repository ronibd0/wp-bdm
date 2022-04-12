import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'Global button setting under the Customizer', () => {
	it( 'button text and background color should apply correctly', async () => {
		const buttonColor = {
			'button-color': 'rgb(14, 12, 157)',
			'button-bg-color': 'rgb(212, 238, 186)',
		};
		await setCustomize( buttonColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'button-color' ] }` );

		await expect( {
			selector: '.wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'button-bg-color' ] }` );
	} );
} );
