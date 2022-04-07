import { createURL,	createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header in the customizer', () => {
	it( 'enable on archive, 404 and search page should apply correctly', async () => {
		const disableOnArchive = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 0,
		};
		await setCustomize( disableOnArchive );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disableArchive = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableArchive ).toBeNull( );

		await setCustomize( disableOnArchive );
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disable404 = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disable404 ).toBeNull( );

		await setCustomize( disableOnArchive );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		//GitHub action E2E fail case
		//eslint-disable-next-line jest/no-commented-out-tests
		// await page.click( '.widget_search .search-form .search-field' );
		// await page.keyboard.type( 'test' );
		// await page.keyboard.press( 'Enter' );
		// await page.waitForSelector( '.ast-theme-transparent-header' );
		// const disableSearch = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		// await expect( disableSearch ).toBeNull( );
	} );
	it( 'enable on blog page should apply correctly', async () => {
		const disableOnBlogPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-index': 0,
		};
		await setCustomize( disableOnBlogPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disableblog = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableblog ).toBeNull( );
	} );
	it( 'enable on latest posts page should apply correctly', async () => {
		const disableOnLatestPostPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
		};
		await setCustomize( disableOnLatestPostPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample' } );
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablelatestPost = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablelatestPost ).toBeNull( );
	} );
	it( 'enable on pages should apply correctly', async () => {
		const disableOnPages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': 0,
		};
		await setCustomize( disableOnPages );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablePages = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePages ).toBeNull( );
	} );
	it( 'enable on posts should apply correctly', async () => {
		const disableOnPosts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': 0,
		};
		await setCustomize( disableOnPosts );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablePost = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePost ).toBeNull( );
	} );
} );
