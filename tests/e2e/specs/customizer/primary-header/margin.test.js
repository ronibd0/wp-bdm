import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Primary header margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const belowfooterMargin = {
			'section-primary-header-builder-margin': {
				desktop: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				tablet: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				mobile: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit]': 'px',
			},
		};
		await setCustomize( belowfooterMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-desktop .ast-primary-header-bar.main-header-bar' );
		await expect( {
			selector: '.ast-desktop .ast-primary-header-bar.main-header-bar',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );
