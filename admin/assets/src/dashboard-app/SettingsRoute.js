import React from 'react';
import { useLocation } from 'react-router-dom';
import Welcome from '@DashboardApp/pages/welcome/Welcome';
import Modules from '@DashboardApp/pages/modules/Modules';
import FreeVsPro from '@DashboardApp/pages/free-vs-pro/FreeVsPro';
// import Settings from '@DashboardApp/pages/settings/Settings';
// import StarterTemplates from '@DashboardApp/pages/settings/StarterTemplates';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );
	const path = query.get( 'path' );
	const currentEvent = query.get( 'event' );

	let routePage = <p> Fallback Route Page </p>;

	if ( astra_admin.home_slug === page ) {
		if ( 'getting-started' === currentEvent ) {
			routePage = <Welcome/>;
		} else {
			switch ( path ) {
				case 'modules':
					routePage = <Modules/>;
					break;
				case 'starter-templates':
					// routePage = <StarterTemplates/>;
					routePage = <Welcome/>;
					break;
				case 'settings':
					// routePage = <Settings/>;
					routePage = <Welcome/>;
					break;
				case 'free-vs-pro':
					routePage = <FreeVsPro/>;
					break;
				default:
					routePage = <Welcome/>;
					break;
			}
		}
	}

	return <>{ routePage }</>;
}

export default SettingsRoute;
