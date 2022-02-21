import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewMenu } from '../../../../../utils/create-menu';
describe( 'Footer builder footer menu option under the customizer', () => {
	it( 'footer menu spacing should be added properly', async () => {
		await createNewMenu();
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				desktop: {
					top: '25',
					right: '25',
					bottom: '25',
					left: '25',
				},
				'desktop-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
} );
