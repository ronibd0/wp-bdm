import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu settings in customizer', () => {
	it( 'primary menu typgraphy settings should be apply correctly', async () => {
		const primaryMenuFont = {
			'header-menu1-font-family': 'Zeyada, handwriting',
			'header-menu1-font-weight': '400',
			'header-menu1-text-transform': 'uppercase',
			'header-menu1-line-height': '70',
			'header-menu1-font-size': {
				desktop: 45,
				'desktop-unit': 'px',
			},
		};
		await setCustomize( primaryMenuFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1' );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'font-family',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-family' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'font-weight',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-weight' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'text-transform',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-text-transform' ] }` );

		await page.waitForSelector( '.ast-desktop .ast-primary-header-bar .main-header-menu > .menu-item' );
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar .main-header-menu > .menu-item',
			property: 'line-height',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-line-height' ] + 'px' }` );

		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-size' ].desktop }${ primaryMenuFont[ 'header-menu1-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
