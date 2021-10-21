import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'global button setting under the Customizer', () => {
	it( 'button padding should apply correctly', async () => {
		const buttonPadding = {
			'theme-button-padding': {
				desktop: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				tablet: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				mobile: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
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
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.top }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.right }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.left }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.top }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.right }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.left }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.top }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.right }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.left }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );
