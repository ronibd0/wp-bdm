import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' )
}

const FileGeneration = () => {

	const dispatch = useDispatch();

	const enableFileGeneration = useSelector( ( state ) => state.enableFileGeneration );
	const fileGenerationStatus = false === enableFileGeneration ? false : true;

	const updateFileGenerationStatus = () => {

		let assetStatus;
		if ( enableFileGeneration === false ) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch( { type: 'UPDATE_FILE_GENERATION', payload: assetStatus } );

		const action = 'uag_enable_file_generation',
			nonce = astra_admin.enable_file_generation_nonce;

		const formData = new window.FormData();

		formData.append( 'action', action );
		formData.append( 'security', nonce );
		formData.append( 'value', assetStatus );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

	return (
		<section className='block px-12 py-8 justify-between'>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
					{__("File Generation", "astra")}
				</h3>
				<Switch
					checked={ fileGenerationStatus }
					onChange={updateFileGenerationStatus }
					className={ classNames(
						fileGenerationStatus ? 'bg-astra' : 'bg-slate-200',
						'relative inline-flex flex-shrink-0 h-5 w-[2.4rem] items-center border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
					) }
				>
					<span
						aria-hidden="true"
						className={ classNames(
							fileGenerationStatus ? 'translate-x-5' : 'translate-x-0',
							'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
						) }
					/>
				</Switch>
			</div>
			<p className="mt-2 w-9/12 text-sm text-slate-500">
				{ __( 'Astra loads the CSS and JS inline on the page by default. If you want to generate separate CSS and JS files for Spectra blocks, enable this option. Please read ', 'astra' ) }
				<a className='text-spectra focus:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover' href="https://wpspectra.com/clean-html-with-uag/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard" target='_blank' rel="noreferrer"> { __( 'this article', 'astra' ) } </a>
				{ __( ' to learn the difference between generating CSS and JS inline and in a separate file.', 'astra' ) }
			</p>
		</section>
	);
};

export default FileGeneration;
