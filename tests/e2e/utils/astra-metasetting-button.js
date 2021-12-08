import {
	createNewPost,
} from '@wordpress/e2e-test-utils';
export const metaButton = async () => {
	await createNewPost( {
		postType: 'page',
		title: 'meta',
		content: 'Test page to disable header',
	} );
	await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
	await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
};
