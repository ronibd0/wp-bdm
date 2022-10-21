const globalDataReducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'UPDATE_INITIAL_STATE':
			return {
				...action.payload,
			};
		case 'UPDATE_INITIAL_STATE_FLAG':
			return {
				...state,
				initialStateSetFlag: action.payload,
			};
		case 'UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB':
			return {
				...state,
				activeSettingsNavigationTab: action.payload
			};
		case 'UPDATE_ENABLE_LOAD_FONTS_LOCALLY':
			return {
				...state,
				enableLoadFontsLocally: action.payload,
			};
		case 'UPDATE_ENABLE_PRELOAD_LOCAL_FONTS':
			return {
				...state,
				enablePreloadLocalFonts: action.payload,
			};
		case 'UPDATE_ENABLE_WHITE_LABEL':
			return {
				...state,
				enableWhiteLabel: action.payload,
			};
		case 'UPDATE_PLUGIN_DESCRIPTION':
			return {
					...state,
					pluginDescription: action.payload,
				};
		case 'UPDATE_PLUGIN_NAME':
			return {
					...state,
					pluginName: action.payload,
				};
		case 'UPDATE_THEME_SCREENSHOT_URL':
			return {
					...state,
					themeScreenshotURL: action.payload,
				};
		case 'UPDATE_THEME_DESCRIPTION':
			return {
					...state,
					themeDescription: action.payload,
				};
		case 'UPDATE_THEME_NAME':
			return {
					...state,
					themeName: action.payload,
				};
		case 'UPDATE_AGENCY_LICENSE_LINK':
			return {
					...state,
					agencyLicenseLink: action.payload,
				};
		case 'UPDATE_AGENCY_AUTHOR_URL':
			return {
					...state,
					agencyAuthorURL: action.payload,
				};
		case 'UPDATE_AGENCY_AUTHOR_NAME':
			return {
				...state,
				agencyAuthorName: action.payload
			};
		case 'UPDATE_FILE_GENERATION':
			return {
				...state,
				enableFileGeneration: action.payload,
			};
		case 'UPDATE_BETA':
			return {
				...state,
				enableBeta: action.payload,
			};
		case 'UPDATE_SETTINGS_SAVED_NOTIFICATION':
			return {
				...state,
				settingsSavedNotification: action.payload,
			};
		default:
			return state;
	}
}

export default globalDataReducer;
