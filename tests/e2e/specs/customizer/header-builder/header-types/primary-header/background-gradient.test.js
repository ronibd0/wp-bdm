import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'primary header background gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		const primaryHeader = {
			'hb-header-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
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
			`${ primaryHeader[ 'hb-header-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '#ast-desktop-header .ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`${ primaryHeader[ 'hb-header-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '#ast-desktop-header .ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`${ primaryHeader[ 'hb-header-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
