import {
	createURL,
	createNewPost,
	publishPost,
	setBrowserViewport,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'Primary menu typography settings in customizer', () => {
	it( 'primary menu typgraphy settings should be applied properly', async () => {
		const menuFont = {
			'header-menu1-font-family': 'Raleway, sans-serif',
			'header-menu1-font-size': {
				desktop: 50,
				tablet: 20,
				mobile: 18,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-menu1-font-weight': '800',
			'header-menu1-text-transform': 'uppercase',
			'header-menu1-line-height': '50px',
		};
		await setCustomize( menuFont );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-1' );
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'font-family',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-font-family' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'font-weight',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-font-weight' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'text-transform',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-text-transform' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-font-size' ].desktop }${ menuFont[ 'header-menu1-font-size' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'line-height',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-line-height' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .ast-nav-menu' );
		await expect( {
			selector: '.menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ responsiveFontSize(
				menuFont[ 'header-menu1-font-size' ].tablet,
			) }${
				menuFont[ 'header-menu1-font-size' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .ast-nav-menu' );
		await expect( {
			selector: '#ast-hf-mobile-menu .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ responsiveFontSize(
				menuFont[ 'header-menu1-font-size' ].mobile,
			) }${
				menuFont[ 'header-menu1-font-size' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
