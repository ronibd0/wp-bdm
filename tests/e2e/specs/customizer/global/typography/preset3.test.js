import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography preset-3 style in the customizer', () => {
	it( 'body style should be applied correctly', async () => {
		const globaltypographyPreset3 = {
			'typography-presets': 'Preset3',
			'body-font-family': "'Roboto,sans-serif'",
			'body-font-weight': '400',
			'body-text-transform': 'lowercase',
			'body-line-height': '25px',
			'font-size-body': {
				desktop: '17',
				tablet: '17',
				mobile: '17',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( globaltypographyPreset3 );

		await createNewPost( { postType: 'post', title: 'preset3' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset3' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globaltypographyPreset3[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globaltypographyPreset3[ 'font-size-body' ].desktop }${ globaltypographyPreset3[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'font-size-body' ].tablet }${ globaltypographyPreset3[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'font-size-body' ].mobile }${ globaltypographyPreset3[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);
	} );
	it( 'heading style should be applied correctly', async () => {
		const globaltypographyPreset3 = {
			'headings-font-family': "'Barlow Semi Condensed,sans-serif'",
			'headings-font-weight': '600',
			'headings-text-transform': 'uppercase',
			'headings-line-height': '40px',
		};
		await setCustomize( globaltypographyPreset3 );

		await createNewPost( { postType: 'post', title: 'preset3' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset3' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset3[ 'headings-line-height' ] }`,
		);
	} );
} );
