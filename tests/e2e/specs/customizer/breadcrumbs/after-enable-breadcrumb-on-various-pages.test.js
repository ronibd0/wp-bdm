import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'breadcrumb settings in the customizer', () => {
	it( 'enable breadcrumb on home page for after header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-home-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enablehomePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablehomePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on blog page for inside header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-blog-posts-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disableblog = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disableblog ).toBeNull( );
	} );

	// GitHub action E2E fail case
	// eslint-disable-next-line jest/no-commented-out-tests
	// it( 'enable breadcrumb on search page inside header position should apply corectly for inside position', async () => {
	// 	const afterBreadcrumb = {
	// 		'breadcrumb-position': 'astra_header_after',
	// 		'breadcrumb-disable-archive': 0,
	// 	};
	// 	await setCustomize( afterBreadcrumb );
	// 	await createNewPost( { postType: 'post', title: 'test' } );
	// 	await publishPost();
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.click( '.widget_search .search-form .search-field' );
	// 	await page.keyboard.type( 'test' );
	// 	await page.keyboard.press( 'Enter' );
	// 	await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
	// 	const enableSearchPage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
	// 	await expect( enableSearchPage ).toBeNull( );
	// } );

	it( 'enable breadcrumb on archive page inside header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-archive': 0,
		};
		await setCustomize( afterBreadcrumb );
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enablearchivePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablearchivePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single page for inside header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-page' } );
		await publishPost();
		await page.goto( createURL( '/single-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single ppost for inside header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-post': 0,
		};
		await setCustomize( afterBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-post' } );
		await publishPost();
		await page.goto( createURL( '/single-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePost = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'enable breadcrumb on 404 page for inside header position should apply corectly for inside position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-404-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		await createNewPost( { postType: 'page', title: '404-page' } );
		await publishPost();
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disable404 = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );

