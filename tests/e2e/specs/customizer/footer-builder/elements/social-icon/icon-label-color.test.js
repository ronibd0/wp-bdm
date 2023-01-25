import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Social icons show label in the customizer', () => {
	it( 'icon label color for desktop should apply correctly', async () => {
		const socialIconLabelColor = {
			'footer-social-1-label-toggle': '1',
			'footer-social-1-label-color': {
				desktop: 'rgb(118, 65, 4)',
				tablet: 'rgb(75, 44, 69)',
				mobile: 'rgb(55, 61, 56)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconLabelColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].desktop }` );
	} );
} );
