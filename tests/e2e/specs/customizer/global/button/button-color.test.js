import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button setting under the Customizer', () => {
	it( 'button text color should apply correctly', async () => {
		const btntextColor = {
			'button-color': 'rgb(245, 245, 245)',
		};
		await setCustomize( btntextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#block-2 .wp-block-search__button' );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'color',
		} ).cssValueToBe( `${ btntextColor[ 'button-color' ] }` );
	} );

	it( 'button background color should apply correctly', async () => {
		const btnbgColor = {
			'button-bg-color': 'rgb(4, 7, 11)',
		};
		await setCustomize( btnbgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#block-2 > form > div > button' );
		await expect( {
			selector: '#block-2 > form > div > button',
			property: 'background-color',
		} ).cssValueToBe( `${ btnbgColor[ 'button-bg-color' ] }` );
	} );
} );
