import FilterTabs from '@DashboardApp/pages/modules/FilterTabs';
import BlockCardsGroup from '@DashboardApp/pages/modules/BlockCardsGroup';
import BlocksSkeleton from '@DashboardApp/pages/modules/BlocksSkeleton';
import { useSelector } from 'react-redux';

const Modules = () => {

	const initialStateSetFlag = useSelector( ( state ) => state.initialStateSetFlag );

	if ( ! initialStateSetFlag ) {
		return <BlocksSkeleton/>;
	}

	return (
		<>
			<div className="mx-auto px-6 mt-10 mb-8 font-semibold text-2xl lg:max-w-[80rem]">Modules &#47; Extensions</div>
			<FilterTabs/>
			<BlockCardsGroup/>
		</>
	);
};
export default Modules;
