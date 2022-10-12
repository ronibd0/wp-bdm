import BlockCard from '@DashboardApp/pages/modules/BlockCard';
import { useSelector } from 'react-redux';

const BlockCardsGroup = () => {

	const activeBlocksFilterTab = useSelector( ( state ) => state.activeBlocksFilterTab );

	const blocksInfo = astra_admin.blocks_info;

	const renderBlockCards = blocksInfo.map( ( block, index ) => {

		const blockCategories = block.admin_categories;
		const showBlockCard = blockCategories?.includes( activeBlocksFilterTab ) || 'all' === activeBlocksFilterTab;

		if ( ! showBlockCard ) {
			return '';
		}

		return <BlockCard key={ index } blockInfo={ block } />
	} );

	return (
		<div className="lg:max-w-[80rem] mx-auto grid grid-flow-row auto-rows-min grid-cols-2 gap-6 sm:grid-cols-3 px-6 py-4">
			{ renderBlockCards }
		</div>
	);
};

export default BlockCardsGroup;
