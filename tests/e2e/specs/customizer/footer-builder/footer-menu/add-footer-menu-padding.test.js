import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { createNewMenu } from '../../../../utils/create-menu';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add footer menu spacing for desktop view', () => {
	it( 'footer menu spacing should be added properly in desktop view', async () => {
		await createNewMenu();
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				desktop: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
				},
				'desktop-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuSpacing );
		/*await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );*/
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
} );
