import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'primary header backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const primaryHeader = {
			'hb-header-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( primaryHeader );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header .ast-primary-header-bar' );
		await expect( {
			selector: '#ast-desktop-header .ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeader[ 'hb-header-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '#ast-desktop-header .ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeader[ 'hb-header-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '#ast-desktop-header .ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeader[ 'hb-header-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );