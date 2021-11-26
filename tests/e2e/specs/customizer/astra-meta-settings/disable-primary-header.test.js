import {createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';

describe( 'site layout meta setting', () => {
	it( 'site layout meta setting', async () => {
		const astraMetaSetting = {
			'inspector-select-control-19': 'left-sidebar',
		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'QA',
		} );
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
        await page.waitForSelector( '#inspector-select-control-1' );

		const authorNameOption = (
			await page.$x(
				'//*[ @id = "inspector-select-control-1" ]/option[ text() = "Left Sidebar" ]',
			)
		)[ 0 ];

		const authorNameValue = await (
			await authorNameOption.getProperty( 'value' )
		).jsonValue();

		await page.select( '#inspector-select-control-1', authorNameValue);
		await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(2)' );
		await page.click( '#astra_settings_meta_box > div:nth-child(2) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );
		await page.click('#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-main-header-display.css-wdf2ti-Wrapper.e1puf3u0');
        await publishPost();
		await page.goto( createURL( '/QA' ), {
			waitUntil: 'networkidle0',
		} );

		// await page.waitForSelector( '.entry-content' );
		// await expect( {
		// 	selector: '.ast-above-header-bar',
		// 	property: 'border-bottom-color',
		// } ).cssValueToBe( `${ bottomBorder[ 'hba-header-bottom-border-color' ] }`,
		// );
	} );
} );
