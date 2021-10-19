import { createURL, createNewPost, publishPost, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add primary menu spacing for desktop view', () => {
	it( 'primary menu spacing should be added properly in desktop view', async () => {
		const menuPadding = {
			'header-menu1-menu-spacing': '20px',
		};
		await setCustomize( menuPadding );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page - desktop',
			content: 'This is simple test page for desktop view',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '.menu-link',
			property: 'padding',
		} ).cssValueToBe(
			`${ menuPadding[ 'header-menu1-menu-spacing' ] }`,
		);
	} );
} );
describe( 'Add primary menu spacing for tablet view', () => {
	it( 'primary menu spacing should be added properly in tablet view', async () => {
		const menuPadding = {
			'header-menu1-menu-spacing': '30px',
		};
		await setCustomize( menuPadding );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page - tablet',
			content: 'This is simple test page for tablet view',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '.menu-link',
			property: 'padding',
		} ).cssValueToBe(
			`${ menuPadding[ 'header-menu1-menu-spacing' ] }`,
		);
	} );
} );
describe( 'Add primary menu spacing for mobile view', () => {
	it( 'primary menu spacing should be added properly in mobile view', async () => {
		const menuPadding = {
			'header-menu1-menu-spacing': '40px',
		};
		await setCustomize( menuPadding );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page - mobile',
			content: 'This is simple test page for mobile view',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item a' );
		await expect( {
			selector: '.menu-link',
			property: 'padding',
		} ).cssValueToBe(
			`${ menuPadding[ 'header-menu1-menu-spacing' ] }`,
		);
	} );
} );
