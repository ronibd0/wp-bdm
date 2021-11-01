import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';

describe( 'Above footer column and layout setting in customizer', () => {
	it( 'column na dlayout should apply correctly', async () => {
		const Abovefooter = {
			'hba-footer-column': '2',
			'hba-footer-layout': {
				desktop: '2-rheavy',
				tablet: '2-lheavy',
				mobile: '2-lheavy',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};

		await setCustomize( Abovefooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );

		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ Abovefooter[ 'hba-footer-layout' ].desktop }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ Abovefooter[ 'hba-footer-layout' ].tablet }`,
		);
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-template-columns',
		} ).cssValueToBe( `${ Abovefooter[ 'hba-footer-layout' ].mobile }`,
		);
	} );
} );
