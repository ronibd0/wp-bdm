import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon color should apply correctly', async () => {
		const socialiconColor = {
			'header-social-1-color': {
				desktop: 'rgb(111, 80, 199)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element svg' );

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialiconColor[ 'header-social-1-color' ].desktop }`,
		);
	} );
} );
