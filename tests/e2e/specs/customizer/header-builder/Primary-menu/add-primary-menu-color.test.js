import {
	createURL,
	createNewPost,
	publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu color settings in the customizer', () => {
	it( 'primary menu color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(255, 0, 0)',
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
	} );
} );
