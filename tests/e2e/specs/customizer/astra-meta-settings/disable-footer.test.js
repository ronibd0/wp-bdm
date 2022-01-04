import { createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';

describe( 'disable footer meta setting', () => {
	it( 'disabling footer should work properly', async () => {
		const astraMetaSetting = {
			'footer-desktop-items': {
				primary: {
					primary_2: {
						1: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'QA',
		} );
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
		//Footer disable
		await page.evaluate( () => {
			[ ...document.querySelectorAll( '.ast-sidebar-layout-meta-wrap .components-toggle-control__label' ) ].find( ( element ) => element.textContent === 'Disable Footer' ).click();
		} );
		await publishPost();
		await page.goto( createURL( '/qa' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#secondary' );
		await page.waitForSelector( '#secondary' );
		const siteFooter = await page.$eval( '#secondary', ( element ) => element.getAttribute( 'colophon' ) );
		await expect( siteFooter ).toBeNull( );
	} );
} );
