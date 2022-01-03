import { createURL,	createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header in the customizer', () => {
	it( 'enable on archive, 404 and search page should apply corectly', async () => {
		const Disableonarchive = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 0,
		};
		await setCustomize( Disableonarchive );
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disableArchive = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableArchive ).toBeNull( );

		await setCustomize( Disableonarchive );
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disable404 = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disable404 ).toBeNull( );

		// await setCustomize( Disableonarchive );
		// await createNewPost( { postType: 'post', title: 'test' } );
		// await publishPost();
		// await page.goto( createURL( '/?s=test' ), {
		// 	waitUntil: 'networkidle0',
		// } );
		// await page.waitForSelector( '.ast-theme-transparent-header' );
		// const disableSearch = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		// await expect( disableSearch ).toBeNull( );
	} );
	it( 'enable on latest posts page should apply corectly', async () => {
		const Disableonlatestpostpage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
		};
		await setCustomize( Disableonlatestpostpage );
		await createNewPost( { postType: 'post', title: 'sample' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablelatestPost = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablelatestPost ).toBeNull( );
	} );
	it( 'enable on pages should apply corectly', async () => {
		const Disableonpages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': 0,
		};
		await setCustomize( Disableonpages );
		await createNewPost( { postType: 'page', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablePages = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePages ).toBeNull( );
	} );
	it( 'enable on posts should apply corectly', async () => {
		const Disableonposts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': 0,
		};
		await setCustomize( Disableonposts );
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header' );
		const disablePost = await page.$eval( '.ast-theme-transparent-header', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePost ).toBeNull( );
	} );
} );
