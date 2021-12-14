import { createURL,	createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header in the customizer', () => {
	it( 'disable on latest posts page should apply corectly', async () => {
		const Disableonlatestpostpage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': {
				position: 'absolute',
				left: 0,
				right: 0,

			},
		};
		await setCustomize( Disableonlatestpostpage );
		await createNewPost( { postType: 'post', title: 'sample' } );
		await publishPost();
		await createNewPost( { postType: 'post', title: 'test' } );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );

		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe(
			`${ Disableonlatestpostpage[ 'transparent-header-disable-latest-posts-index' ].position }` );
	} );
	it( 'disable on pages should apply corectly', async () => {
		const Disableonpages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': {
				position: 'absolute',
				left: 0,
				right: 0,

			},
		};
		await setCustomize( Disableonpages );
		await createNewPost( { postType: 'page', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );

		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe(
			`${ Disableonpages[ 'transparent-header-disable-page' ].position }` );
	} );
	it( 'disable on posts should apply corectly', async () => {
		const Disableonposts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': {
				position: 'absolute',
				left: 0,
				right: 0,

			},
		};
		await setCustomize( Disableonposts );
		await createNewPost( { postType: 'post', title: 'QA' } );
		await publishPost();
		await page.goto( createURL( '/qa' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );

		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe(
			`${ Disableonposts[ 'transparent-header-disable-posts' ].position }` );
	} );
} );
