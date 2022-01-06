import { setCustomize } from '../../../../utils/customize';
import { createURL,	createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Testing site background gradient and content background gradient setting under the customizer', () => {
	it( 'site background gradient should apply correctly', async () => {
		const sitebgGradient = {
			'site-layout-outside-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};

		await setCustomize( sitebgGradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ sitebgGradient[ 'site-layout-outside-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ sitebgGradient[ 'site-layout-outside-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ sitebgGradient[ 'site-layout-outside-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );

	it( 'content background gradient should apply correctly', async () => {
		const contentbgGradient = {
			'content-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( contentbgGradient );
		await createNewPost( {
			postType: 'post',
			title: 'test',
			content: 'test background image',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .ast-article-post' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`${ contentbgGradient[ 'content-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`${ contentbgGradient[ 'content-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`${ contentbgGradient[ 'content-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
