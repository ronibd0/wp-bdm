/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import { createURL, publishPost } from '@wordpress/e2e-test-utils';
import { openAstraMetaSettings } from '../../../utils/open-astra-meta-settings';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { setCustomize } from '../../../utils/customize';
describe( 'Astra meta setting', () => {
	it( 'sidebar, content layout and header disable setting', async () => {
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
		let result = null;
		await setCustomize( astraMetaSetting );
		await openAstraMetaSettings();
		//sidebar setting
		await page.click( '#astra_settings_meta_box > div:nth-child(2) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );
		//content layout
		await page.click( '#astra_settings_meta_box > div:nth-child(3) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );
		//primary header
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-main-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		await publishPost();
		await page.goto( createURL( 'meta' ), {
			waitUntil: 'networkidle0',
		} );
		const primaryHeader = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '#ast-desktop-header .ast-desktop-header-content' );
		} );
		if ( primaryHeader ) {
			result = 'Primary_Header_Disabled';
		} else {
			console.log( result );
		}
		console.log( result );
		await expect( result ).toBe( 'Primary_Header_Disabled' );
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
		let result = null;
		await setCustomize( astraMetaSetting );
		await openAstraMetaSettings();
		//above header disable
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-above-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		await publishPost();
		await page.goto( createURL( 'meta' ), {
			waitUntil: 'networkidle0',
		} );
		const aboveHeaderClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.ast-above-header-bar' );
		} );
		if ( aboveHeaderClass ) {
			result = 'Above_Header_Disabled';
		} else {
			console.log( result );
		}
		console.log( result );
		await expect( result ).toBe( 'Above_Header_Disabled' );
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
		let result = null;
		let mobileHeaderResult = null;
		await setCustomize( astraMetaSetting );
		await openAstraMetaSettings();
		//below header disable
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-below-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		// mobile header disable
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-hfb-mobile-header-display.css-wdf2ti-Wrapper.e1puf3u0' );
		await publishPost();
		await page.goto( createURL( 'meta' ),
			{
				waitUntil: 'networkidle0',
			} );
		const belowHeaderClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.ast-below-header-bar' );
		} );
		if ( belowHeaderClass ) {
			result = 'Below_Header_Disabled';
		} else {
			console.log( result );
		}
		console.log( result );
		await expect( result ).toBe( 'Below_Header_Disabled' );

		//assertion for mobile header
		await setBrowserViewport( 'medium' );
		const mobileHeaderClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.ast-mobile-header-wrap .ast-mobile-header-content' );
		} );
		if ( mobileHeaderClass ) {
			mobileHeaderResult = 'Mobile_Header_Disabled';
		} else {
			console.log( mobileHeaderResult );
		}
		console.log( mobileHeaderResult );
		await expect( mobileHeaderResult ).toBe( 'Mobile_Header_Disabled' );
	} );
} );
