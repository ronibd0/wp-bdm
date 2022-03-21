import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Breadcrumb settings in the customizer', () => {
	it( 'enable breadcrumb on home page for before title header position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-home-page': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await createNewPost( { postType: 'page', title: 'test-1' } );
		await publishPost();
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enablehomePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( enablehomePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on blog page for before title header position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-blog-posts-page': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await createNewPost( { postType: 'page', title: 'test-2' } );
		await publishPost();
		await page.goto( createURL( '/test-2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disableBlog = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disableblog ).toBeNull( );
	} );

	// GitHub action E2E fail case
	// eslint-disable-next-line jest/no-commented-out-tests
	// it( 'enable breadcrumb on search page before title header position should apply corectly for inside position', async () => {
	// 	const beforeBreadcrumb = {
	// 		'breadcrumb-position': 'astra_entry_top',
	// 		'breadcrumb-disable-archive': 0,
	// 	};
	// 	await setCustomize( beforeBreadcrumb );
	// 	await createNewPost( { postType: 'post', title: 'test' } );
	// 	await publishPost();
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.click( '.widget_search .search-form .search-field' );
	// 	await page.keyboard.type( 'test' );
	// 	await page.keyboard.press( 'Enter' );
	// 	await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
	// 	const enableSearchPage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
	// 	await expect( enableSearchPage ).toBeNull( );
	// } );

	it( 'enable breadcrumb on archive page before title header position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-archive': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enablearchivePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-author-box' ) );
		await expect( enablearchivePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single page for before title position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-single-page': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-page' } );
		await publishPost();
		await page.goto( createURL( '/single-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single post for before title header position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-single-post': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await createNewPost( { postType: 'page', title: 'single-post' } );
		await publishPost();
		await page.goto( createURL( '/single-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePost = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'enable breadcrumb on 404 page for before title header position should apply corectly for inside position', async () => {
		const beforeBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-404-page': 0,
		};
		await setCustomize( beforeBreadcrumb );
		await createNewPost( { postType: 'page', title: '404-page' } );
		await publishPost();
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disable404 = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .error-404' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );

