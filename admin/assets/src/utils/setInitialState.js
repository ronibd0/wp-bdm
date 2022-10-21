import apiFetch from '@wordpress/api-fetch';

const setInitialState = ( store ) => {
	apiFetch( {
		path: '/astra/v1/admin/settings/',
	} ).then( ( data ) => {
		const initialState = {
			initialStateSetFlag : true,
			activeSettingsNavigationTab : 'global-settings',
			enableLoadFontsLocally : data.self_hosted_gfonts,
			enablePreloadLocalFonts : data.preload_local_fonts,
			enableWhiteLabel : data.enable_white_label,
			pluginDescription: data.plugin_description,
			pluginName: data.plugin_name,
			themeScreenshotURL: data.theme_screenshot_url,
			themeDescription: data.theme_description,
			themeName: data.theme_name,
			agencyLicenseLink: data.agency_license_link,
			agencyAuthorURL: data.agency_author_url,
			agencyAuthorName: data.agency_author_name,
			enableBeta: data.enable_beta,
			enableFileGeneration: data.enable_file_generation,
		};

		store.dispatch( {type: 'UPDATE_INITIAL_STATE', payload: initialState} );
	} );
};

export default setInitialState;
