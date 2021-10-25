import { createNewPost,
	createURL,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';

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
				tablet: 'rgb(255, 214, 170)',
				mobile: 'rgb(255, 214, 170)',
			},
			'transparent-header-color-site-title-responsive': {
				desktop: 'rgb(129, 67, 54)',
				tablet: 'rgb(129, 67, 54)',
				mobile: 'rgb(129, 67, 54)',
			},
			'transparent-menu-color-responsive': {
				desktop: 'rgb(12, 6, 54)',
				tablet: 'rgb(12, 6, 54)',
				mobile: 'rgb(12, 6, 54)',
			},
			'transparent-menu-bg-color-responsive': {
				desktop: 'rgb(236, 236, 38)',
				tablet: 'rgb(236, 236, 38)',
				mobile: 'rgb(236, 236, 38)',
			},
		};
		await setCustomize( transparentColorBorder );
		await createNewPost( { postType: 'page', title: 'transparent page' } );
		await publishPost();
		await page.goto( createURL( '/transparent-page' ), {
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
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .main-header-bar',
		// 	property: 'background-color',
		// } ).cssValueToBe(
		// 	`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].tablet }`,
		// );
		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .main-header-bar',
		// 	property: 'background-color',
		// } ).cssValueToBe(
		// 	`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].mobile }`,
		// );
		//to test transparent header site title normal
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].mobile }`,
		);
		//to test transparent header menu text/link color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-color-responsive' ].desktop }`,
		);
		//to test transparent header menu text/link color
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].desktop }`,
		);
	} );
} );
