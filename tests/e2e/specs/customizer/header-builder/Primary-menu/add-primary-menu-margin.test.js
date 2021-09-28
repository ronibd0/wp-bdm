import { createURL, createNewPost, publishPost, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';
describe( 'Add primary menu-left margin', () => {
	it( 'primary menu-left margin should be added properly', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '10px'
		};
		await setCustomize( menuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page'
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Sample Page',
			content: 'This is Sample test page'
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-right', () => {
	it( 'primary menu margin-right should be added properly', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '20px'
		};
		await setCustomize( menuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-top', () => {
	it( 'primary menu margin-top should be added properly', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '15px'
		};
		await setCustomize( menuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );
describe( 'Add primary menu margin-bottom', () => {
	it( 'primary menu margin-bottom should be added properly', async () => {
		const menuMargin = {
			'section-hb-menu-1-margin': '30px'
		};
		await setCustomize( menuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-1',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ menuMargin[ 'section-hb-menu-1-margin' ] }`,
		);
	} );
} );