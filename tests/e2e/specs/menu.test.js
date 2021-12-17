/**
 * WordPress dependencies
 */
import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../utils/create-menu';
import { setCustomize } from '../utils/customize';

describe( 'Hello World', () => {
	it( 'elementor Hello, World!', async () => {
		// await createNewElementorPost( 'page' );
		// await insertSection();
		// await insertWidget( {
		// 	widgetName: 'Retina Image',
		// 	section: 1,
		// 	column: 1,
		// } );

		// await publishPage();
		// await viewPage();

		await createNewMenu();

		//center alignment for desktop, tablet and mobile
		const headerMenuAlignment = {
			'header-desktop-items': {
				primary: {
					primary_right: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( headerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '#primary-site-navigation' );

		await expect( true ).toBe( true );
	} );
} );
