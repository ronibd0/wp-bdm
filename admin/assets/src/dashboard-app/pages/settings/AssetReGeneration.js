import React, { useState } from 'react';
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useSelector, useDispatch } from "react-redux";

const AssetReGeneration = () => {
	const dispatch = useDispatch();

	const enableFileGeneration = useSelector( ( state ) => state.enableFileGeneration );
	const [ regenerateAssetsState, setRegenerateAssetsState ] = useState( false );

	const regenerateLocalFontAssets = () => {
		setRegenerateAssetsState( 'loading' );
		const formData = new window.FormData();

		formData.append( 'action', 'astra_refresh_assets_files' );
		formData.append( 'security', astra_admin.update_nonce );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Assets Regenerated!', 'astra' ) } );
			setRegenerateAssetsState( false );
		} );
	};

	return (
		<section className={ `astra-dep-field-${ enableFileGeneration } block border-b border-solid border-slate-200 px-12 py-8 justify-between` }>
			<div className="w-full flex items-center">
				<h3 className="p-0 flex-1 inline-flex justify-right text-xl leading-6 font-semibold text-slate-800">
					{__("Asset Regeneration", "astra")}
				</h3>
				<div className='flex justify-right items-center'>
					<button
						type="button"
						className="inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none"
						onClick={ regenerateLocalFontAssets }
					>
						{__("Regenerate Assets", "astra")}
						{ 'loading' === regenerateAssetsState && (
							<svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) }
					</button>
				</div>
			</div>

			<p className="mt-2 text-sm text-slate-600 w-9/12">
				{ __( 'Facing issues with style, layout, color or another page element? Use this option to regenerate CSS and Javascript assets. It can help with all kinds of asset issues.', 'astra' ) }
			</p>

		</section>
	);
};

export default AssetReGeneration;
