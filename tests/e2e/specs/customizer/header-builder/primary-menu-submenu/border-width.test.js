import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add sub menu for primary menu and add border to the sub menu', () => {
	it( 'sub menu should be added successfully', async () => {
		await createNewMenu();
		const headerMenuAlignment = {
			'header-desktop-items': {
				primary: {
					primary_right: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( headerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#primary-site-navigation' );
		await expect( true ).toBe( true );
	} );
	it( 'border to the submenu should be added correctly', async () => {
		const submenuBorder = {
			'header-menu1-submenu-border': {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		};
		await setCustomize( submenuBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
			selector: '.sub-menu',
			property: 'border-top-width',
		} ).cssValueToBe(
			`${ submenuBorder[ 'header-menu1-submenu-border' ].top + 'px' }`,
		);
		await expect( {
			selector: '.sub-menu',
			property: 'border-left-width',
		} ).cssValueToBe(
			`${ submenuBorder[ 'header-menu1-submenu-border' ].left + 'px' }`,
		);
		await expect( {
			selector: '.sub-menu',
			property: 'border-bottom-width',
		} ).cssValueToBe(
			`${ submenuBorder[ 'header-menu1-submenu-border' ].bottom + 'px' }`,
		);
		await expect( {
			selector: '.sub-menu',
			property: 'border-right-width',
		} ).cssValueToBe(
			`${ submenuBorder[ 'header-menu1-submenu-border' ].right + 'px' }`,
		);
	} );
} );

