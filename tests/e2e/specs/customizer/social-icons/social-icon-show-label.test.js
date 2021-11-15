import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Social Icons show label in the customizer', () => {
	it( 'social icon color for desktop should apply correctly', async () => {
		const socialiconShowlabel = {
			'header-social-1-label-toggle': '1',
			'header-social-1-label-color': {
				desktop: 'rgb(158, 50, 47)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconShowlabel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialiconShowlabel[ 'header-social-1-label-color' ].desktop }`,
		);
	} );
} );
