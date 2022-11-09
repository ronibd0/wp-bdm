import Astra_Admin_Icons from '@Common/block-icons';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';
import ToolTip from './ToolTip';
import { useSelector, useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';

const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const ExtensionCard = ( props ) => {

	const {
		title,
		title_url,
		links,
		condition = true,
		deprecated = false,
	} = props.moduleInfo;

	const slug = props.slug;

	const dispatch = useDispatch();

	const blocksStatuses = useSelector( ( state ) => state.blocksStatuses );

	const moduleActivationStatus = false == blocksStatuses[slug] ? false : true;

	return (
		<div
			key={slug}
			className={ classNames(
				! astra_admin.pro_available || ! condition
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md h-20 px-4 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition astra-icon-transition group'
			) }
		>
			<div className="flex-1 min-w-0">
				<p className="text-base font-medium text-slate-800 leading-7">
					{ title }
					{ deprecated && (
						<div className="inline-block align-top max-h-4 px-1.5 py-1 ml-1.5 text-[10px] leading-[10px] border border-slate-200 text-slate-400 rounded">
							{ __( 'Legacy', 'astra' ) }
						</div>
					) }
					{ ( astra_admin.pro_available && ! condition ) && (
						<span className="inline-block align-middle ml-1 leading-none opacity-30 text-base dashicons dashicons-info" title={ __( 'This plugin needs to be installed/activated.', 'astra' ) }></span>
					) }
				</p>
				{links.map( ( link ) => (
					<a
						key={Math.floor(Math.random() * 100000)}
						className={ classNames(
							link.link_class,
							'focus-visible:text-slate-500 active:text-slate-500 hover:text-slate-500 focus:text-slate-400 text-slate-400 text-sm truncate'
						) }
						href={ link.link_url }
						target={ link.target_blank ? "_blank" : "_self" }
						rel="noreferrer"
					>
						{link.link_text}
					</a>
				))}
			</div>

			{
				<div
					className={ classNames(
						! astra_admin.pro_available ? 'text-[0.625rem] leading-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]' : 'self-center',
						( astra_admin.pro_available && ! condition ) ? 'relative inline-flex flex-shrink-0 py-0.5 px-1 opacity-30 pointer-events-none' : 'relative inline-flex flex-shrink-0 py-0.5 px-1'
					) }
				>
					{ ! astra_admin.pro_available && __( 'PRO', 'astra' ) }
					{ ( astra_admin.pro_available && 'white-label' !== slug ) &&
						<Switch
							checked={ moduleActivationStatus }
							onChange={ () => {
								let status = false;
								let moduleId = slug;
								let moduleStatus = moduleActivationStatus ? 'deactivate' : 'activate';

								if ( ! moduleActivationStatus ) {
									status = slug;
								}

								const optionsClone = { ...blocksStatuses };
								optionsClone[ slug ] = status;

								dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: optionsClone} );

								const formData = new window.FormData();

								formData.append( 'action', 'astra_addon_update_module_status' );
								formData.append( 'security', astra_addon_admin.update_nonce );
								formData.append( 'module_status', moduleStatus ); // activate/deactivate.
								formData.append( 'module_id', moduleId );

								apiFetch( {
									url: astra_admin.ajax_url,
									method: 'POST',
									body: formData,
								} ).then( ( data ) => {
									if ( data.success ) {
										dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Successfully saved!' ) } );

										const reFormData = new window.FormData();

										reFormData.append( 'action', 'astra_refresh_assets_files' );
										reFormData.append( 'security', astra_addon_admin.update_nonce );

										apiFetch( {
											url: astra_admin.ajax_url,
											method: 'POST',
											body: reFormData,
										} ).then( ( data ) => {
											dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Cache Cleared!' ) } );
										} );
									}
								} );
							} }
							className={ classNames(
								moduleActivationStatus ? 'bg-astra' : 'bg-slate-200',
								'relative inline-flex flex-shrink-0 h-5 w-[2.4rem] items-center border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							) }
						>
							<span
								aria-hidden="true"
								className={ classNames(
									moduleActivationStatus ? 'translate-x-5' : 'translate-x-0',
									'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
								) }
							/>
						</Switch>
					}
				</div>
			}
			{
				! astra_admin.pro_available && <ToolTip />
			}
		</div>
	);
};

export default ExtensionCard;
