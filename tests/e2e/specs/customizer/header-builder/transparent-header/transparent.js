import {createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'transparent header settings in the customizer ', () => {
    it( 'transparent header setting should apply correctly', async () => {
        const transparentColorBorder = {
            'transparent-header-enable' : true,
            'transparent-header-disable-archive' : false,
            'transparent-header-disable-index' : false,
            'transparent-header-disable-latest-posts-index' : false,
            'transparent-header-disable-page' :false,
            'transparent-header-disable-posts' : false,
            'transparent-header-main-sep' : '10px',
            'transparent-header-main-sep-color' : 'rgb(11, 12, 13)',
            'transparent-header-bg-color': {
                desktop: 'rgb(128, 45, 45)',
                tablet: 'rgb(220, 198, 198)',
                mobile: 'rgb(60, 110, 110)',
            },
            'transparent-header-colors': {
                desktop: 'rgb(12, 4, 4)',
                tablet: 'rgb(22, 19, 19)',
                mobile: 'rgb(6, 11, 11)',
            },
            'transparent-header-colors-menu': {
                desktop: 'rgb(28, 5, 5)',
                tablet: 'rgb(20, 98, 98)',
                mobile: 'rgb(30, 10, 10)',
            },
            'transparent-menu-bg-color-responsive': {
                desktop: 'rgb(18, 8, 3)',
                tablet: 'rgb(20, 18, 18)',
                mobile: 'rgb(70, 10, 20)',
            },
        };
        await setCustomize( transparentColorBorder );
        await page.goto( createURL( '/' ), {
            waitUntil: 'networkidle0',
        });		

        await page.waitForSelector( '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]' );

//to test transparent header bottom border width
        await expect( {
            selector: '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
            property: 'border-width',
        } ).cssValueToBe(
            `${ transparentColorBorder[ 'transparent-header-main-sep' ]}`,
        );

//to test transparent header bottom border color
        await expect( {
            selector: '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
            property: 'border-color',
        } ).cssValueToBe(
            `${ transparentColorBorder[ 'transparent-header-main-sep-color' ] }`,
        );

//to test transparent header background color
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-bar',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-bg-color' ].desktop }`,
        );

        await setBrowserViewport( 'medium' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-bar',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-bg-color' ].tablet }`,
        );

        await setBrowserViewport( 'small' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-bar',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-bg-color' ].mobile }`,
        );

//to test transparent header site title normal color
        await setBrowserViewport( 'large' );
        await expect( {
            selector: '.ast-theme-transparent-header .site-title a',
            property: 'color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors' ].desktop }`,
        );

        await setBrowserViewport( 'medium' );
        await expect( {
            selector: '.ast-theme-transparent-header .site-title a',
            property: 'color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors' ].tablet }`,
        );

        await setBrowserViewport( 'small' );
        await expect( {
            selector: '.ast-theme-transparent-header .site-title a',
            property: 'color',       
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors' ].mobile }`,
        );

//to test transparent header menu normal color
        await setBrowserViewport( 'large' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors-menu' ].desktop }`,
        );

        await setBrowserViewport( 'medium' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors-menu' ].tablet }`,
        );

        await setBrowserViewport( 'small' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-header-colors-menu' ].mobile }`,
        );

//to test transparent header menu background normal color
        await setBrowserViewport( 'large' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].desktop }`,
        );

        await setBrowserViewport( 'medium' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].tablet }`,
        );

        await setBrowserViewport( 'small' );
        await expect( {
            selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
            property: 'background-color',
            } ).cssValueToBe(
                `${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].mobile }`,
        );

    });
});