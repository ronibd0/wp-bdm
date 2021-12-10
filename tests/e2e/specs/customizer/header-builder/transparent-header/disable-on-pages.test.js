import { createURL,	createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header in the customizer', () => {
	it( 'disable on pages should apply corectly', async () => {
		const Disableonpages = {
			'transparent-header-enable': true,
			'transparent-header-disable-page': false,
		};
		await setCustomize( Disableonpages );
		await createNewPost( { postType: 'page', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .main-header-bar' );

		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'display',
		} ).cssValueToBe(
			`${ Disableonpages[ 'transparent-header-disable-page' ] }` );
	} );
} );
