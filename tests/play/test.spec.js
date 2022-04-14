/**
 * WordPress dependencies
 */
const { test, expect, pageUtils, page } = require( '@playwright/test' );

test.describe( 'Hello World', () => {
	// eslint-disable-next-line jest/no-done-callback
	test( 'Login to WP Admin', async ( { page } ) => {
		// Go to wp-login.php
		await page.goto( 'wp-login.php' );

		// Fill input[name="log"]
		await page.locator( 'input[id="user_login"]' ).fill( 'admin' );

		// Click and type input[name="pwd"]
		await page.locator( 'input[name="pwd"]' ).fill( 'password' );

		await page.locator( 'text=Log In' ).click();

		// Go to /wp-admin/
		await page.goto( '/wp-admin/' );

		// Click text=Welcome to WordPress!
		await expect( page.locator( 'text=Welcome to WordPress!' ) ).toBeVisible();
	} );

	test( 'should show the New Post page in Gutenberg', async () => {
		await pageUtils.createNewPost();

		await expect( page ).toHaveURL( /post-new.php/ );

		// Should display the blank title.
		const title = page.locator( 'role=textbox[name="Add title"i]' );
		await expect( title ).toBeEditable();
		await expect( title ).toHaveText( '' );

		// Should display the Preview button.
		await expect(
			page.locator( 'role=button[name="Preview"i]' ),
		).toBeVisible();

		// Should display the Post Formats UI.
		await expect(
			page.locator( 'role=combobox[name="Post Format"i]' ),
		).toBeVisible();
	} );
} );
