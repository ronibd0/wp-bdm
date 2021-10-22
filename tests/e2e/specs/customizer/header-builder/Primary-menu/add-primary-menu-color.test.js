import {
	createURL,
	createNewPost,
	publishPost,
	setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu color settings in the customizer', () => {
	it( 'primary menu color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(183, 1, 129)',
				tablet: 'rgb(183, 1, 129)',
				mobile: 'rgb(183, 1, 129)',
			},
		};
		await setCustomize( menuColor );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-1' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu .page_item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].mobile }`,
		);
	} );
} );
