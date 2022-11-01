import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' )
}

const OldHeaderFooter = () => {

	if( ! astra_admin.show_builder_migration ) {
		return '';
	}

	const dispatch = useDispatch();

	const useOldHeaderFooter = useSelector( ( state ) => state.useOldHeaderFooter );
	const useOldHeaderFooterStatus = false === useOldHeaderFooter ? false : true;

	const updateHeaderFooterVersion = () => {

		let assetStatus;
		if ( useOldHeaderFooter === false ) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch( { type: 'USE_OLD_HEADER_FOOTER', payload: assetStatus } );

		const formData = new window.FormData();

		formData.append( 'action', 'ast_migrate_to_builder' );
		formData.append( 'security', astra_admin.update_nonce );
		formData.append( 'status', assetStatus );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Successfully saved!' ) } );
		} );
	};

	return (
		<section className='block border-b border-solid border-slate-200 px-12 py-8 justify-between'>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
					{ __( 'Legacy Header/Footer', 'astra' ) }
				</h3>
				<Switch
					checked={ useOldHeaderFooterStatus }
					onChange={ updateHeaderFooterVersion }
					className={ classNames(
						useOldHeaderFooterStatus ? 'bg-astra' : 'bg-slate-200',
						'relative inline-flex flex-shrink-0 h-5 w-[2.4rem] items-center border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					) }
				>
					<span
						aria-hidden="true"
						className={ classNames(
							useOldHeaderFooterStatus ? 'translate-x-5' : 'translate-x-0',
							'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
						) }
					/>
				</Switch>
			</div>
			<p className="mt-2 w-11/12 text-sm text-slate-500">
				{
					__(
						`${astra_admin.theme_name} Header/Footer Builder is a new and powerful way to design header and footer for your website. With this, you can give a creative look to your header/footer with less effort. Activating this feature will add advanced options to ${astra_admin.theme_name} customizer where you can create awesome new designs.`,
						"astra"
					)
				}
			</p>
			<p className="mt-2 w-full text-sm text-slate-500">
				{
					__(
						`After years of evolution and updates, the old header footer builder is at the point where it can no longer handle all of the new features. We recommend that you upgrade to the new header footer builder which has an assortment of new features and provides a more seamless experience.`,
						"astra"
					)
				}
			</p>
		</section>
	);
};

export default OldHeaderFooter;
