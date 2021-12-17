import {
	createURL
} from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { setCustomize } from '../../../utils/customize';
describe( 'Header margin settings in the customizer', () => {
	it( 'header margin settings should be applied correctly in desktop view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
				desktop: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'widget-1',
					},
				},
			},
		};
		await setCustomize( headerWidthAndMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-hfb-header .site-header' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-top',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'header margin settings should be applied correctly in tablet view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
<<<<<<< HEAD:tests/e2e/specs/customizer/header-builder/header-margin/header-margin.test.js
				mobile: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
=======
				tablet: {
					top: '120',
					right: '120',
					bottom: '120',
					left: '120',
>>>>>>> b0ac6ee8081e87f220176244e54f7bdde7b22822:tests/e2e/specs/customizer/header-builder/margin.test.js
				},
				'tablet-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'search',
					},
				},
			},
		};
		await setCustomize( headerWidthAndMargin );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
<<<<<<< HEAD:tests/e2e/specs/customizer/header-builder/header-margin/header-margin.test.js
			property: 'margin-top',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
=======
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
>>>>>>> b0ac6ee8081e87f220176244e54f7bdde7b22822:tests/e2e/specs/customizer/header-builder/margin.test.js
		);
	} );

	it( 'header margin settings should be applied correctly in mobile view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
<<<<<<< HEAD:tests/e2e/specs/customizer/header-builder/header-margin/header-margin.test.js
				tablet: {
					top: '70',
					right: '70',
					bottom: '70',
					left: '70',
=======
				mobile: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
>>>>>>> b0ac6ee8081e87f220176244e54f7bdde7b22822:tests/e2e/specs/customizer/header-builder/margin.test.js
				},
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'widget-1',
					},
				},
			},
		};
		await setCustomize( headerWidthAndMargin );
<<<<<<< HEAD:tests/e2e/specs/customizer/header-builder/header-margin/header-margin.test.js
		await page.waitForSelector( '.ast-hfb-header .site-header' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-top',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-right',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-left',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
=======
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
>>>>>>> b0ac6ee8081e87f220176244e54f7bdde7b22822:tests/e2e/specs/customizer/header-builder/margin.test.js
		);
	} );
} );
