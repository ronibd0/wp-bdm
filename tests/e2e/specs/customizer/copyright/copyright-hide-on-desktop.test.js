import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { responsiveFontSize } from '../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'copyright hide on desktop settings in the customizer', () => {
	it( 'copyright hide on desktop setting should apply correctly', async () => {
		const copyrighthideonDesktop = {
			'section-footer-copyright-hide-desktop': 'grid',
		};
		await setCustomize( copyrighthideonDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector(
			'.site-below-footer-wrap[data-section="section-below-footer-builder',
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder',
			property: 'display',
		} ).cssValueToBe(
			`${ copyrighthideonDesktop[ 'section-footer-copyright-hide-desktop' ] }`,
		);
	} );

	it( 'copyright hide on tablet setting should apply correctly', async () => {
		const copyrighthideonTablet = {
			'section-footer-copyright-hide-tablet': 'grid',
		};

		await setCustomize( copyrighthideonTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector(
			'.site-below-footer-wrap[data-section="section-below-footer-builder',
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder',
			property: 'display',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrighthideonTablet[ 'section-footer-copyright-hide-tablet' ].tablet,
			) }${
				copyrighthideonTablet[ 'section-footer-copyright-hide-tablet' ][ 'tablet-unit' ]
			}`,
		);
	} );

	it( 'copyright hide on mobile setting should apply correctly', async () => {
		const copyrighthideonMobile = {
			'section-footer-copyright-hide-mobile': 'grid',
		};

		await setCustomize( copyrighthideonMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector(
			'.site-below-footer-wrap[data-section="section-below-footer-builder',
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder',
			property: 'display',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				copyrighthideonMobile[ 'section-footer-copyright-hide-mobile' ].mobile,
			) }${
				copyrighthideonMobile[ 'section-footer-copyright-hide-mobile' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
