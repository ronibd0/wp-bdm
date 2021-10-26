import {
	createURL,
	createNewPost,
	publishPost,
	setBrowserViewport,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
//import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'Primary menu typography settings in customizer', () => {
	it( 'primary menu typgraphy settings should be applied properly', async () => {
		const menuFont = {
			'header-menu1-font-size': {
				desktop: 50,
				'desktop-unit': 'px',
			},
			'header-menu1-font-family': 'Raleway, sans-serif',
			'header-menu1-font-weight': '800',
			'header-menu1-text-transform': 'uppercase',
			'header-menu1-line-height': '50px',
			'header-mobile-menu-font-size': {
				tablet: 50,
				mobile: 50,
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
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
		await expect( {
			selector: '#ast-hf-menu-1 .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-font-size' ].desktop }${ menuFont[ 'header-menu1-font-size' ][ 'desktop-unit' ] }`,
		);
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
			property: 'line-height',
		} ).cssValueToBe(
			`${ menuFont[ 'header-menu1-line-height' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ menuFont[ 'header-mobile-menu-font-size' ].tablet }${ menuFont[ 'header-mobile-menu-font-size' ][ 'tablet-unit' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ menuFont[ 'header-mobile-menu-font-size' ].mobile }${ menuFont[ 'header-mobile-menu-font-size' ][ 'mobile-unit' ] }`,
		);
	} );
} );
