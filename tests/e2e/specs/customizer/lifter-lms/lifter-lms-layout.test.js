import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { lifterImportdata } from '../../../utils/lifter-import-data';
describe( 'lifter lms layout setting from customizer', () => {
	it( 'layout should apply', async () => {
		const lifterLMSLayout = {
			'lifterlms-content-layout': 'boxed-container',
		};
		await lifterImportdata();
		await setCustomize( lifterLMSLayout );
		await page.goto( createURL( '/course/free-course-lead-magnet-template-2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-container' );
		await expect( {
			selector: '.ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ lifterLMSLayout[ 'shop-archive-max-width' ] }` );
	} );
} );