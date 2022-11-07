import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import apiFetch from '@wordpress/api-fetch';

const UpgradeNotices = () => {

	if( astra_admin.pro_available ) {
		return '';
	}

	const dispatch = useDispatch();

	const useUpgradeNotices = useSelector( ( state ) => state.useUpgradeNotices );

	const updateUpgradeNoticesVisibility = () => {

		let assetStatus;
		if ( useUpgradeNotices === false ) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch( { type: 'UPGRADE_NOTICES', payload: assetStatus } );

		const formData = new window.FormData();

		formData.append( 'action', 'ast_disable_pro_notices' );
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

	const onUpgradeLinkTrigger = () => {
		window.open(
			astra_admin.upgrade_url,
			'_blank'
		);
	};

	return (
		<section className='block px-12 py-8 justify-between'>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
					{ __( 'Build Better Websites with Astra Pro', 'astra' ) }
				</h3>
				<button
					type="button"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra transition focus:bg-astra-hover hover:bg-astra-hover focus:outline-none h-9"
					onClick={onUpgradeLinkTrigger}
				>
					{__("Upgrade to Astra Pro", "astra-addon")}
				</button>
			</div>
			<p className="mt-2 w-9/12 text-sm text-slate-500">
				{
					__(
						`Access powerful features for painless WordPress design without the high costs. Powerful tools, premium support, limitless opportunity with Astra Pro! Toggle upgrade notices on or off `,
						"astra"
					)
				}
				<span onClick={updateUpgradeNoticesVisibility} className='cursor-pointer text-astra focus:text-astra-hover active:text-astra-hover hover:text-astra-hover' rel="noreferrer"> { __( 'here.', 'astra' ) } </span>
			</p>
		</section>
	);
};

export default UpgradeNotices;
