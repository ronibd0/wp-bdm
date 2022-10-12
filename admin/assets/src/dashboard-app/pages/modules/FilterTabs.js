import apiFetch from '@wordpress/api-fetch';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

const FilterTabs = () => {

	const blocksInfo = astra_admin.blocks_info;
	const dispatch = useDispatch();

	const blocksStatuses = useSelector( ( state ) => state.blocksStatuses );
	const activeBlocksFilterTab = useSelector( ( state ) => state.activeBlocksFilterTab );
	const [ categoriesBlocks, setcategoriesBlocks ] = useState( [] );

	useEffect( () => {

		const categoriesBlocksTemp = {
			...categoriesBlocks
		};

		blocksInfo.map( ( block ) => {

			const blockCategories = block.admin_categories;

			blockCategories?.map( ( category ) => {

				if ( ! categoriesBlocksTemp [ category ] ) {
					categoriesBlocksTemp [ category ] = [];
				}

				categoriesBlocksTemp [ category ].push( block.slug );

				return category;
			} );

			return block;
		} );

		setcategoriesBlocks( categoriesBlocksTemp )

	}, [] );

	const activateAllBlocks = () => {

		const value = { ...blocksStatuses };

		for ( const block in blocksStatuses ) {
			if ( 'all' !== activeBlocksFilterTab && ( ! categoriesBlocks[activeBlocksFilterTab] || ! categoriesBlocks[activeBlocksFilterTab].includes( block ) ) ) {
				continue;
			}
			value[ block ] = 'block';
		}
		// Update Blocks Statuses.
		dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: value} );

		const formData = new window.FormData();

		formData.append( 'action', 'uag_blocks_activation_and_deactivation' );
		formData.append(
			'security',
			astra_admin.blocks_activation_and_deactivation_nonce
		);
		formData.append( 'value', JSON.stringify( value ) );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

	const deactivateAllBlocks = () => {

		const value = { ...blocksStatuses };

		for ( const block in blocksStatuses ) {
			if ( 'all' !== activeBlocksFilterTab && ( ! categoriesBlocks[activeBlocksFilterTab] || ! categoriesBlocks[activeBlocksFilterTab].includes( block ) ) ) {
				continue;
			}
			value[ block ] = 'disabled';
		}

		// Update Blocks Statuses.
		dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: value} );

		const formData = new window.FormData();

		formData.append( 'action', 'uag_blocks_activation_and_deactivation' );
		formData.append(
			'security',
			astra_admin.blocks_activation_and_deactivation_nonce
		);
		formData.append( 'value', JSON.stringify( value ) );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

	return (
		<div className="mx-auto mb-6 px-6 lg:max-w-[80rem]">
			<div className="w-full sm:hidden">

			</div>
			<div className="hidden justify-between items-center space-y-4 sm:flex sm:flex-col lg:space-y-0 lg:flex-row">
				<nav className="flex -ml-4 flex-wrap justify-center lg:justify-start" aria-label="Tabs">

				</nav>
				<span className="z-0 flex shadow-sm rounded-[0.2rem] justify-center">
					<button
						type="button"
						className="focus:bg-indigo-50 focus:text-slate-500 focus-visible:text-spectra hover:bg-indigo-50 hover:text-spectra -ml-px relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-500 focus:z-10 focus:outline-none rounded-l-md transition"
						onClick={activateAllBlocks}
					>
						Activate all
					</button>
					<button
						type="button"
						className="focus:bg-indigo-50 focus:text-slate-500 focus-visible:text-spectra hover:bg-indigo-50 hover:text-spectra -ml-px relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-500 focus:z-10 focus:outline-none rounded-r-md transition"
						onClick={deactivateAllBlocks}
					>
						Deactivate all
					</button>
				</span>
			</div>
		</div>
	);
};

export default FilterTabs;
