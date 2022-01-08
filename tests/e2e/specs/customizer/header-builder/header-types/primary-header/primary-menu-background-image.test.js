import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Primary menu background image color settings in the customizer', () => {
	it( 'background gradient image should apply corectly', async () => {
		const menuGradient = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://images.ctfassets.net/hrltx12pl8hq/4CH9hYoMSORDuL8BXgX0Br/c2520603e3d2616468161c38519c9446/shutterstock_631575830.jpg?fit=fill&w=2560&h=400&fm=webp',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( menuGradient );
		await createNewPost( { postType: 'page', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ menuGradient[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
	} );
	it( 'background gradient color for mobile and tablet should apply corectly', async () => {
		const menuGradient = {
			'header-mobile-menu-bg-obj-responsive': {
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
		await setCustomize( menuGradient );
		await createNewPost( { postType: 'page', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( ' .main-header-menu' );
		await expect( {
			selector: '.main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ menuGradient[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.main-header-menu' );
		await expect( {
			selector: '.main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ menuGradient[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
