import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { create } from 'lodash';
import { setCustomize } from '../../../../utils/set-customize';
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
			'header-menu1-line-height': '0.99',
		};
		await setCustomize( menuFont );
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
	} );
} );
