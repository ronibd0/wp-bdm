import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'html2 block settings in the customizer', () => {
	it( 'html2 link color for desktop should apply correctly', async () => {
		const htmlLinkColor = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'header-html-2link-color': {
				desktop: 'rgb(120, 31, 158)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlLinkColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element a' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].desktop }`,
		);
	} );

	it( 'html2 text color for tablet should apply correctly', async () => {
		const htmlLinkColor = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'header-html-2link-color': {
				tablet: 'rgb(19, 122, 23)',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlLinkColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element a' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].tablet }`,
		);
	} );

	it( 'html2 text color for mobile should apply correctly', async () => {
		const htmlLinkColor = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'header-html-2link-color': {
				mobile: 'rgb(39, 36, 200)',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( htmlLinkColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element a' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].mobile }`,
		);
	} );
} );
