import { createURL } from '@wordpress/e2e-test-utils/build/create-url';
export const lifterImportdata = async () => {
	await page.goto( createURL( '/wp-admin' ), {
		waitUntil: 'networkidle0',
	} );
	await page.click( '#toplevel_page_lifterlms > a > div.wp-menu-name' );
	await page.click( '#toplevel_page_lifterlms > ul > li:nth-child(5) > a' );
	await page.click( '#wpbody-content > div.wrap.lifterlms.llms-import-export > form > ul > li:nth-child(2) > button' );
};
