import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';

describe( 'transparent header settings in the customizer', () => {
	it( 'transparent header setting should apply correctly', async () => {
		const transparentColorBorder = {
			'transparent-header-enable': true,
			'transparent-header-disable-archive': false,
			'transparent-header-disable-index': false,
			'transparent-header-disable-latest-posts-index': false,
			'transparent-header-disable-page': false,
			'transparent-header-disable-posts': false,
			'transparent-header-main-sep': 10,
			'transparent-header-main-sep-color': 'rgb(11, 12, 13)',
			'transparent-header-bg-color-responsive': {
				desktop: 'rgb(255, 214, 170)',
				tablet: 'rgb(220, 198, 198)',
				mobile: 'rgb(220, 110, 110)',
			},
			'transparent-header-color-site-title-responsive': {
				desktop: 'rgb(129, 67, 54)',
				tablet: 'rgb(22, 19, 19)',
				mobile: 'rgb(6, 11, 11)',
			},
		};
		await setCustomize( transparentColorBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
		);
		// to test transparent header bottom border width
		await expect( {
			selector:
				'.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
			property: 'border-bottom-width',
		} ).cssValueToBe(
			`${
				transparentColorBorder[ 'transparent-header-main-sep' ] + 'px'
			}`,
		);
		//to test transparent header bottom border color
		await expect( {
			selector:
				'.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
			property: 'border-bottom-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-main-sep-color' ] }`,
		);
		//to test transparent header background color
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-bg-color-responsive' ].desktop }`,
		);

		//to test transparent header site title normal
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].desktop }`,
		);
	} );
} );
