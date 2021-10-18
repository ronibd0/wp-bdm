import { createURL, createNewPost, publishPost, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add primary menu margin-left for desktop view', () => {
	it( 'primary menu margin-left should be added properly in desktop view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px',
		};
		await setCustomize( menuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-right for desktop view', () => {
	it( 'primary menu margin-right should be added properly in desktop view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px',
		};
		await setCustomize( menuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-top for desktop view', () => {
	it( 'primary menu margin-top should be added properly in desktop view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px',
		};
		await setCustomize( menuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-bottom for desktop view', () => {
	it( 'primary menu margin-bottom should be added properly in desktop view', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px',
		};
		await setCustomize( menuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
