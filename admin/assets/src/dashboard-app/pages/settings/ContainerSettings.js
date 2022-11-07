import { __ } from '@wordpress/i18n';
import{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LoadFontsLocally from '@DashboardApp/pages/settings/LoadFontsLocally';
import PreloadLocalFonts from '@DashboardApp/pages/settings/PreloadLocalFonts';
import FlushLocalFonts from '@DashboardApp/pages/settings/FlushLocalFonts';
import SettingsContainerSkeleton from '@DashboardApp/pages/settings/SettingsContainerSkeleton';
import OldHeaderFooter from '@DashboardApp/pages/settings/OldHeaderFooter';
import UpgradeNotices from '@DashboardApp/pages/settings/UpgradeNotices';

function SettingsWrapper({ state }) {
	const wrappers = wp.hooks.applyFilters(
		'astra_dashboard.settings_tab_wrappers',
		{
			'global-settings': <> <OldHeaderFooter/> <UpgradeNotices/> </>,
			'fonts-performance': <> <LoadFontsLocally/> <PreloadLocalFonts/> <FlushLocalFonts /> </>,
		}
	);
	return <div>{wrappers[state]}</div>;
}

const ContainerSettings = () => {

	const activeSettingsNavigationTab = useSelector( ( state ) => state.activeSettingsNavigationTab );
	const initialStateSetFlag = useSelector( ( state ) => state.initialStateSetFlag );
	const [ showContainerLoader, setContainerLoader ] = useState( 'loading' );

	useEffect( () => {
		setContainerLoader( 'loading' );
		setTimeout( function () {
			setContainerLoader( false );
		}, 1000 );
	}, [activeSettingsNavigationTab] );

	if ( ! initialStateSetFlag ) {
		return <SettingsContainerSkeleton/>;
	}

	if ( 'loading' === showContainerLoader ) {
		return <SettingsContainerSkeleton/>;
	}

	// Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
	return (
		<>
			<div className='lg:col-span-9 border-l'>
				{ wp.hooks.applyFilters( `astra_dashboard.settings_screen_before_${activeSettingsNavigationTab}`, <span/> ) }
				<SettingsWrapper state={activeSettingsNavigationTab}></SettingsWrapper>
				{ wp.hooks.applyFilters( `astra_dashboard.settings_screen_after_${activeSettingsNavigationTab}`, <span/> ) }
			</div>
		</>
	);
};

export default ContainerSettings;
