import {
	createURL,
	createNewPost,
	publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu color settings in the customizer', () => {
	it( 'primary menu color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-color-responsive': {
				desktop: {
					'text-color': 'rgb(255, 255, 27)',
				},
				tablet: {
					'text-color': 'rgb(255, 255, 27)',
				},
				mobile: {
					'text-color': 'rgb(255, 255, 27)',
				},
			},
		};
		await setCustomize( menuColor );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'About Us',
			content: 'This is about us page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Our Services',
			content: 'This is services page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Contact Us',
			content: 'This is contact us page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-1' );
		await expect( {
			selector: '.menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].desktop[ 'text-color' ] }`,
		);
	} );
} );
