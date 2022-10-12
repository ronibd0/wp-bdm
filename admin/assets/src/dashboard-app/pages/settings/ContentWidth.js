import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import apiFetch from '@wordpress/api-fetch';

const ContentWidth = () => {

	const dispatch = useDispatch();

    const contentWidth = useSelector( ( state ) => state.contentWidth );

	const updateContentWidth = ( e ) => {
		const value = e.target.value;

		dispatch( { type: 'UPDATE_CONTENT_WIDTH', payload: value } );

		const formData = new window.FormData();

		formData.append( 'action', 'uag_content_width' );
		formData.append( 'security', astra_admin.content_width_nonce );
		formData.append( 'value', value );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

    return (
        <section className='block border-b border-solid border-slate-200 px-12 py-8 justify-between'>
            <div className='mr-16 w-full flex items-center'>
                <h3 className="p-0 flex-1 justify-right inline-flex text-lg leading-8 font-medium text-gray-900">
					{ __( 'Default Content Width', 'astra' ) }
				</h3>
				<div className='flex spectra-content-width-input-wrap'>
					<input className="appearance-none block w-20 h-8 leading-tight transition spectra-admin__input-field" id="grid-zip" value={contentWidth} onChange={updateContentWidth} type="number" placeholder="1140" min={0} max={1600} />
					<span className="inline-flex h-8 items-center sm:text-sm transition spectra-admin__input-field--end-display">
						{ __( 'px', 'astra' ) }
					</span>
				</div>
			</div>
			<p className="mt-2 w-9/12 text-sm text-slate-500">
				{
					__( 'This setting will apply to Container Block\'s default Content Width.', 'astra' )
				}
			</p>
			{ 'Spectra' !== astra_admin.uag_content_width_set_by &&
				<p className="mt-2 w-9/12 text-sm text-slate-500 italic">
					{
						// eslint-disable-next-line @wordpress/i18n-no-variables
						__( `The current Content width is applied from ${ astra_admin.uag_content_width_set_by }.`, 'astra' )
					}
				</p>
			}
		</section>
    );
};

export default ContentWidth;
