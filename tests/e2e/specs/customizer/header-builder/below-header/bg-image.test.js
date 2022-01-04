import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'below header background image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const belowHeaderBgImage = {
			'header-desktop-items': {
				below: {
					below_left: {
						0: 'widget-1',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_left: {
						0: 'social-icons-1',
					},
				},
			},
			'hbb-header-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://cdn.dribbble.com/users/34759/screenshots/13971601/media/30298693302288b91b5d3dc292a8cadb.png?compress=1&resize=400x300',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://media.istockphoto.com/photos/modern-computerlaptop-with-blank-screen-on-counter-barand-window-view-picture-id1157789866?b=1&k=20&m=1157789866&s=170667a&w=0&h=XDdkkxtHlghnmrdl8NGE_GlRcPlOFLJkAlZa8N4E5Jg=',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://cdn.wallpapersafari.com/55/76/iYLa7g.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'right top',
					'background-size': 'cover',
					'background-attachment]': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( belowHeaderBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitFor( 2000 );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await page.waitFor( 2000 );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await page.waitFor( 2000 );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
