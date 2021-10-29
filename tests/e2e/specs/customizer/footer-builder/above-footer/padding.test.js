import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Above footer padding setting in customizer', () => {
	it( 'padding should apply correctly', async () => {
		const abovefooterpadding = {
			'section-above-footer-builder-padding': {
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
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( abovefooterpadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].desktop.top }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].desktop.right }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].desktop.bottom }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].desktop.left }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].tablet.top }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].tablet.right }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].tablet.bottom }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].tablet.left }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].mobile.top }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].mobile.right }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].mobile.bottom }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ abovefooterpadding[ 'section-above-footer-builder-padding' ].mobile.left }${ abovefooterpadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );