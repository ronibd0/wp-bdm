import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button setting under the Customizer', () => {
	it( 'button border width should apply correctly', async () => {
		const border = {
			'theme-button-border-group-border-size': {
				top: 5,
				right: 5,
				bottom: 5,
				left: 5,
			},
		};
		await setCustomize( border );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-top-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].top + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-right-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].right + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].bottom + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-left-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].left + 'px' }` );
	} );

	it( 'button border color should apply correctly', async () => {
		const borderColor = {
			'theme-button-border-group-border-color': 'rgb(4, 7, 11)',
		};
		await setCustomize( borderColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'border-color',
		} ).cssValueToBe( `${ borderColor[ 'theme-button-border-group-border-color' ] }` );
	} );

	it( 'button border radius should apply correctly', async () => {
		const borderRadius = {
			'button-radius': '30',
		};
		await setCustomize( borderRadius );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-radius',
		} ).cssValueToBe( `${ borderRadius[ 'button-radius' ] + 'px' }` );
	} );
} );
