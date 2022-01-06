import { createURL,	createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header in the customizer', () => {
	it( 'disable on archive, 404 and search page should apply corectly', async () => {
		const Disableonarchive = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 1,
		};
		await setCustomize( Disableonarchive );
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableArchive = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableArchive ).toBeNull( );

		await setCustomize( Disableonarchive );
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disable404 = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disable404 ).toBeNull( );
		await setCustomize( Disableonarchive );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.widget_search .search-form' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableSearch = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableSearch ).toBeNull( );
	} );
	it( 'disable on blog page should apply corectly', async () => {
		const Disableonblogpage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-index': 1,
		};
		await setCustomize( Disableonblogpage );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableblog = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableblog ).toBeNull( );
	} );
	it( 'disable on latest posts page should apply corectly', async () => {
		const Disableonlatestpostpage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 1,
		};
		await setCustomize( Disableonlatestpostpage );
		await createNewPost( { postType: 'post', title: 'sample' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablelatestPost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablelatestPost ).toBeNull( );
	} );
	it( 'disable on pages should apply corectly', async () => {
		const Disableonpages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': 1,
		};
		await setCustomize( Disableonpages );
		await createNewPost( { postType: 'page', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePages = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePages ).toBeNull( );
	} );
	it( 'disable on posts should apply corectly', async () => {
		const Disableonposts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': 1,
		};
		await setCustomize( Disableonposts );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePost ).toBeNull( );
	} );
} );
