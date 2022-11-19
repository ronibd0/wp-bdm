import React from "react";
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';

const UpgradeToPro = () => {

	const getAstraProTitle = () => {
		return astra_admin.pro_installed_status ? __( 'Activate Now →' ) : __( 'Upgrade Now →' );
	}

	const onUpgradeProTrigger = ( e ) => {
		if( astra_admin.pro_installed_status ) {
			const formData = new window.FormData();
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'astra-addon/astra-addon.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					window.open( astra_admin.astra_base_url, '_self' );
				}
			} );
		} else {
			window.open(
				astra_admin.upgrade_url,
				'_blank'
			);
		}
	};

	return (
		<div className="relative flex bg-blue-50 py-5 pl-4 pr-10 border border-sky-500 rounded-md">
			<div className="mr-3">
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.9993 23.9993L21.9993 27.9993L29.9993 19.9993M15.6687 9.39336C17.1038 9.27884 18.4662 8.71453 19.5619 7.78076C22.1189 5.60172 25.8797 5.60172 28.4366 7.78076C29.5324 8.71453 30.8947 9.27884 32.3298 9.39336C35.6787 9.6606 38.3379 12.3199 38.6052 15.6687C38.7197 17.1038 39.284 18.4662 40.2178 19.5619C42.3968 22.1189 42.3968 25.8797 40.2178 28.4366C39.284 29.5324 38.7197 30.8947 38.6052 32.3298C38.3379 35.6787 35.6787 38.3379 32.3298 38.6052C30.8947 38.7197 29.5324 39.284 28.4366 40.2178C25.8797 42.3968 22.1189 42.3968 19.5619 40.2178C18.4662 39.284 17.1038 38.7197 15.6687 38.6052C12.3199 38.3379 9.6606 35.6787 9.39336 32.3298C9.27884 30.8947 8.71453 29.5324 7.78076 28.4366C5.60172 25.8797 5.60172 22.1189 7.78076 19.5619C8.71453 18.4662 9.27884 17.1038 9.39336 15.6687C9.6606 12.3199 12.3199 9.6606 15.6687 9.39336Z"
						stroke="#007ABD"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div>
				<h4 className="text-base font-semibold leading-5 text-slate-800 mb-1.5">
					{__('Upgrade to Astra Pro', 'astra')}
				</h4>
				<p className="text-sm text-slate-600 mb-3">
					{__('Get access to powerful features for painless WordPress designing, without the high costs. With all the time you will save, it’s a product that pays for itself!', 'astra')}
				</p>
				<button onClick={ onUpgradeProTrigger } className="text-sm text-astra text-medium">
					{getAstraProTitle()}
				</button>
			</div>
			<div className="absolute top-4 right-4 leading-4 py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
				{__('PRO', 'astra')}
			</div>
		</div>
	);
};

export default UpgradeToPro;
