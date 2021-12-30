import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
export const createNewTag = async () => {
	await createNewPost( { postType: 'post', title: 'hello world' } );
	await publishPost();
	await page.goto( createURL( '/wp-admin/edit.php' ), {
		waitUntil: 'networkidle0',
	} );
	await page.click( '#wp-first-item current', 'page' );
	await page.click( '.wp-core-ui .button-link' );
	await page.click( '.inline-edit-row fieldset label textarea' );
	await page.type( 'Articles' );
	await page.click( '.wp-core-ui .button-primary' );
};

