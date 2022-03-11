import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global button setting under the Customizer', () => {
	it( 'button padding should apply correctly', async () => {
		const buttonPadding = {
			'theme-button-padding': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( buttonPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.top }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.right }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.left }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.top }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.right }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.left }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.top }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.right }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.left }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }` );
	} );
} );
