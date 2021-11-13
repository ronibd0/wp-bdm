import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon background color for desktop should apply correctly', async () => {
		const socialiconbackColor = {
			'header-social-1-background-color-group': {
				desktop: 'rgb(198, 68, 47)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconbackColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialiconbackColor[ 'header-social-1-background-color-group' ].desktop }`,
		);
	} );
} );
