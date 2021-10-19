import { createURL, createNewPost, publishPost, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add primary menu margin for desktop view', () => {
	it( 'primary menu margin should be added properly in desktop view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px',
		};
		await setCustomize( menuMargin );
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
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin for tablet view', () => {
	it( 'primary menu margin should be added properly in tablet view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '30px',
		};
		await setCustomize( menuMargin );
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
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin for mobile view', () => {
	it( 'primary menu margin should be added properly in mobile view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '40px',
		};
		await setCustomize( menuMargin );
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
			selector: '.main-header-menu',
			property: 'margin',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
