import { createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { setCustomize } from '../../../utils/customize';
describe( 'Astra meta setting', () => {
	it( 'sidebar, content layout and primary header disable setting', async () => {
		const astraMetaSetting = {
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',

					},
				},
				primary: {
					primary_center: {
						0: 'search',
					},
				},
				below: {
					below_right: {
						1: 'button-1',
					},
				},
			},

		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'primary-header',
			content: 'Test page to disable header',
		} );
		//Astra button setting click action
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
		//sidebar setting
		//await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(2)' );
		await page.click( '#astra_settings_meta_box > div:nth-child(2) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );

		//content layout
		//await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(3)' );
		await page.click( '#astra_settings_meta_box > div:nth-child(3) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );

		//primary header
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-main-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		await publishPost();
		await page.goto( createURL( '/primary-header' ), {
			waitUntil: 'networkidle0',
		} );

		//assertion for above header
		await page.waitForSelector( '.ast-above-header-bar' );
		await expect( {
			selector: '.ast-above-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);

		//assertion for primary header
		await page.waitForSelector( '#ast-desktop-header .ast-desktop-header-content' );
		await expect( {
			selector: '#ast-desktop-header .ast-desktop-header-content',
			property: 'display',
		} ).cssValueToBe( `none`,
		);

		//assertion for below header
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);
	} );

	//Above header disable
	it( 'sidebar, content layout settings and above header disable setting', async () => {
		const astraMetaSetting = {
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',

					},
				},
				primary: {
					primary_center: {
						0: 'search',
					},
				},
				below: {
					below_right: {
						1: 'button-1',
					},
				},
			},

		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'above-header',
		} );
		//Astra button setting click action
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );

		//above header disable
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-above-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		await publishPost();
		await page.goto( createURL( '/above-header' ), {
			waitUntil: 'networkidle0',
		} );

		//assertion for above header
		// await page.waitForSelector( '.ast-above-header-bar' );
		// await expect( {
		// 	selector: '.ast-above-header-bar',
		// 	property: 'display',
		// } ).cssValueToBe( `none`,
		// );
		await page.waitForSelector( '.ast-primary-header-bar' );
		await expect( {
			selector: '.ast-primary-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);

		//assertion for below header
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);
	} );
	//Disable below header
	it( 'disable below header setting', async () => {
		const astraMetaSetting = {
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',

					},
				},
				primary: {
					primary_center: {
						0: 'search',
					},
				},
				below: {
					below_right: {
						1: 'button-1',
					},
				},
			},


		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'belowHeader-disable',
			content: 'Test page to disable above header',
		} );
		//Astra button setting click action
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );

		//below header disable
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-below-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		// mobile header disable
		await page.click('#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-mobile-header-display.css-wdf2ti-Wrapper.e1puf3u0');
		await publishPost();
		await page.goto( createURL( 'belowHeader-disable' ), {
			waitUntil: 'networkidle0',
		} );
		//assertion for disable below header
		// await page.waitForSelector( '.ast-below-header-bar' );
		// await expect( {
		// 	selector: '.ast-below-header-bar',
		// 	property: 'display',
		// } ).cssValueToBe( `block`,
		// );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-mobile-header-wrap .ast-mobile-header-content' );
		await expect( {
			selector: '.ast-mobile-header-wrap .ast-mobile-header-content',
			property: 'display',
		} ).cssValueToBe( `none` );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-mobile-header-wrap .ast-mobile-header-content' );
		await expect( {
			selector: '.ast-mobile-header-wrap .ast-mobile-header-content',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
