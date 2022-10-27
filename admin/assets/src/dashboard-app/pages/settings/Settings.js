import { __ } from '@wordpress/i18n';
import{ useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { applyFilters, doAction } from '@wordpress/hooks';

import SettingsIcons from './SettingsIcons';

import { useSelector, useDispatch } from 'react-redux';

import LoadFontsLocally from '@DashboardApp/pages/settings/LoadFontsLocally';
import PreloadLocalFonts from '@DashboardApp/pages/settings/PreloadLocalFonts';
import FlushLocalFonts from '@DashboardApp/pages/settings/FlushLocalFonts';
import SettingsSkeleton from '@DashboardApp/pages/settings/SettingsSkeleton';
import OldHeaderFooter from '@DashboardApp/pages/settings/OldHeaderFooter';
import UpgradeNotices from '@DashboardApp/pages/settings/UpgradeNotices';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' )
}

function SettingsWrapper({ state }) {
	const wrappers = applyFilters(
		'astra_dashboard.settings_tab_wrappers',
		{
			'global-settings': <> <OldHeaderFooter/> <UpgradeNotices/> </>,
			'fonts-performance': <> <LoadFontsLocally/> <PreloadLocalFonts/> <FlushLocalFonts /> </>,
		}
	);
	return <div>{wrappers[state]}</div>;
}

const Settings = () => {

	const query = new URLSearchParams( useLocation()?.search );
	const dispatch = useDispatch();

	const activeSettingsNavigationTab = useSelector( ( state ) => state.activeSettingsNavigationTab );
	const initialStateSetFlag = useSelector( ( state ) => state.initialStateSetFlag );

	const navigation = applyFilters(
		'astra_dashboard.settings_navigation',
		[
			{ name: __( 'General', 'astra' ), slug: 'global-settings', icon: SettingsIcons['global-settings'] },
			{ name: __( 'Performance', 'astra' ), slug: 'fonts-performance', icon: SettingsIcons['fonts-performance'] },
		]
	);

	useEffect( () => {
		// Activate Setting Active Tab from "settingsTab" Hash in the URl is present.
		const activePath = query.get( 'path' );
		const activeHash = query.get( 'settings' );
		const activeSettingsTabFromHash = ( activeHash && 'settings' === activePath ) ? activeHash : 'global-settings';
		dispatch( {type:'UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB', payload: activeSettingsTabFromHash} )
	}, [initialStateSetFlag] );

	if ( ! initialStateSetFlag ) {
		return <SettingsSkeleton/>;
	}

	// Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
	return (
		<div className="px-6 w-full">
			<div className="mx-auto mt-10 mb-8 font-semibold text-2xl lg:max-w-[80rem]">Settings</div>
			<main className="mx-auto my-[2.43rem] bg-white rounded-md shadow overflow-hidden min-h-[36rem] lg:max-w-[80rem]">
				<div className="lg:grid lg:grid-cols-12 min-h-[36rem] h-full">
					<aside className="py-6 sm:px-6 lg:py-6 lg:px-0 lg:col-span-3">
						<nav className="space-y-1">
							{navigation.map( ( item ) => (
							<Link // eslint-disable-line
								to={ {
									pathname: 'admin.php',
									search: `?page=astra&path=settings&settings=${item.slug}`,
								} }
								key={item.name}
								className={ classNames(
									activeSettingsNavigationTab === item.slug
										? 'border-astra text-astra focus:text-astra-hover active:text-astra hover:text-astra-hover stroke-astra fill-astra focus:stroke-astra focus:fill-astra hover:stroke-astra hover:fill-astra'
										: 'border-white text-slate-800 stroke-slate-800 fill-slate-800 focus:text-slate-900 focus:border-slate-200 focus:stroke-slate-900 focus:fill-slate-900 hover:text-slate-900 hover:border-slate-200 hover:stroke-slate-900 hover:fill-slate-900',
									'border-l-4 group cursor-pointer py-3 pl-5 flex items-center text-base font-medium'
								) }
								onClick={ () => {
									dispatch( {type:'UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB', payload: item.slug} )
								}}
							>
								{ item.icon }
								<span className="truncate">{item.name}</span>
							</Link>
						) )}
						</nav>
					</aside>
					<div className='lg:col-span-9 border-l'>
						<SettingsWrapper state={activeSettingsNavigationTab}></SettingsWrapper>
						{ doAction( `astra_dashboard.settings_screen_after_${activeSettingsNavigationTab}` ) }
					</div>
				</div>
			</main>
		</div>
	);
};

export default Settings;
