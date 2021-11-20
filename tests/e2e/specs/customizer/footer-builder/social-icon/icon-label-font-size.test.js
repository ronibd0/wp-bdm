import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Social Icons show label in the customizer', () => {
	it( 'footer social icon color for desktop should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'footer-social-1-label-toggle': '1',
			'font-size-section-fb-social-icons-1': {
				desktop: 72,
				'desktop-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-footer-social-1-wrap' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ].desktop }${ socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon color for tablet should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'footer-social-1-label-toggle': '1',
			'font-size-section-fb-social-icons-1': {
				tablet: 42,
				'tablet-unit': 'px',
			},
			'footer-mobile-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-footer-social-1-wrap' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );

		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ].tablet,
			) }${
				socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ][ 'tablet-unit' ]
			}`,
		);
	} );

	it( 'social icon color for mobile should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'footer-social-1-label-toggle': '1',
			'font-size-section-fb-social-icons-1': {
				mobile: 42,
				'mobile-unit': 'px',
			},
			'footer-mobile-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-footer-social-1-wrap' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );

		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ].mobile,
			) }${
				socialiconlabeFontsizel[ 'font-size-section-fb-social-icons-1' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
