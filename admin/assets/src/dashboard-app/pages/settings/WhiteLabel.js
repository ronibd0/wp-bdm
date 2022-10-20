import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames( ...classes ) {
    return classes.filter( Boolean ).join( ' ' )
}

const WhiteLabel = () => {

    const dispatch = useDispatch();

    const enableLoadFontsLocally = useSelector( ( state ) => state.enableLoadFontsLocally );
    const enableLoadFontsLocallyStatus = 'disabled' === enableLoadFontsLocally ? false : true;

    const updateLoadFontsLocallyStatus = () => {

        let assetStatus;
		if ( enableLoadFontsLocally === 'disabled' ) {
            assetStatus = 'enabled';
		} else {
            assetStatus = 'disabled';
		}

        dispatch( { type: 'UPDATE_ENABLE_LOAD_FONTS_LOCALLY', payload: assetStatus } );

		const formData = new window.FormData();

		formData.append( 'action', 'uag_load_gfonts_locally' );
		formData.append(
			'security',
			astra_admin.load_gfonts_locally_nonce
		);
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
        <section className='block border-b border-solid border-slate-200 px-12 py-8 justify-between'>
            <div className='mr-16 w-full flex items-center'>
                <h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
                    { __( 'Enable White Label', 'astra' ) }
                </h3>
                <Switch
                    checked={ enableLoadFontsLocallyStatus }
                    onChange={ updateLoadFontsLocallyStatus }
                    className={ classNames(
                        enableLoadFontsLocallyStatus ? 'bg-astra' : 'bg-slate-200',
                        'relative inline-flex flex-shrink-0 h-5 w-[2.4rem] items-center border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                    ) }
                    >
                    <span
                        aria-hidden="true"
                        className={ classNames(
                            enableLoadFontsLocallyStatus ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        ) }
                    />
                </Switch>
            </div>
            <p className="mt-2 w-9/12 text-sm text-slate-500">
                { __( 'White Label removes any links to Astra website and change the identity in the dashboard. This setting is mostly used by agencies and developers who are building websites for clients.', 'astra' ) }
            </p>
        </section>
    );
};

export default WhiteLabel;
