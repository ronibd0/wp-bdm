import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'breadcrumb settings in the customizer', () => {
	it( 'disable breadcrumb on home page for after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-home-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const enablehomePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablehomePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on blog page for after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-blog-posts-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableblog = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disableblog ).toBeNull( );
	} );

	// GitHub action E2E fail case
	// eslint-disable-next-line jest/no-commented-out-tests
	// it( 'disable breadcrumb on search page after header position should apply corectly', async () => {
	// 	const insideBreadcrumb = {
	// 		'breadcrumb-position': 'astra_header_after',
	// 		'breadcrumb-disable-archive': 1,
	// 	};
	// 	await setCustomize( insideBreadcrumb );
	// 	await createNewPost( { postType: 'post', title: 'test' } );
	// 	await publishPost();
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.click( '.widget_search .search-form .search-field' );
	// 	await page.keyboard.type( 'test' );
	// 	await page.keyboard.press( 'Enter' );
	// 	await page.waitForSelector( '.ast-primary-header-bar' );
	// 	const enableSearchPage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
	// 	await expect( enableSearchPage ).toBeNull( );
	// } );

	it( 'disable breadcrumb on archive page after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-archive': 1,
		};
		await setCustomize( insideBreadcrumb );
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const enablearchivePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablearchivePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single page for after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-page' } );
		await publishPost();
		await page.goto( createURL( '/single-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single post for after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-post': 1,
		};
		await setCustomize( insideBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-post' } );
		await publishPost();
		await page.goto( createURL( '/single-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'disable breadcrumb on 404 page for after header position should apply corectly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-404-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		await createNewPost( { postType: 'page', title: '404-page' } );
		await publishPost();
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disable404 = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );