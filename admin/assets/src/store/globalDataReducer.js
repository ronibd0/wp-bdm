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


		case 'UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB':
			return {
				...state,
				activeSettingsNavigationTab: action.payload
			};
		case 'UPDATE_TEMPLATES_BUTTON':
			return {
				...state,
				enableTemplates: action.payload,
			};
		case 'UPDATE_BETA':
			return {
				...state,
				enableBeta: action.payload,
			};
		case 'UPDATE_LEGACY_BLOCKS':
			return {
				...state,
				enableLegacyBlocks: action.payload,
			};
		case 'UPDATE_SELECTED_FONT_FAMILIES':
			return {
				...state,
				selectedFontFamilies: action.payload,
			};
		case 'UPDATE_ENABLE_COPY_PASTE_STYLES':
			return {
				...state,
				enableCopyPasteStyles: action.payload,
			};
		case 'UPDATE_CONTENT_WIDTH':
			return {
				...state,
				contentWidth: action.payload,
				};
		case 'UPDATE_RECAPTCHA_SITE_KEY_V3':
			return {
				...state,
				siteKeyV3: action.payload,
			};
		case 'UPDATE_RECAPTCHA_SECRET_KEY_V2':
			return {
				...state,
				secretKeyV2: action.payload,
			};
		case 'UPDATE_RECAPTCHA_SECRET_KEY_V3':
			return {
				...state,
				secretKeyV3: action.payload,
			};
		case 'UPDATE_SETTINGS_SAVED_NOTIFICATION':
			return {
				...state,
				settingsSavedNotification: action.payload,
			};
		case 'UPDATE_ENABLE_COMING_SOON':
			return {
				...state,
				enableComingSoonMode: action.payload,
			};
		case 'UPDATE_COMING_SOON_PAGE':
			return {
				...state,
				comingSoonPage: action.payload,
			};
		case 'UPDATE_BLOCKS_EDITOR_SPACING':
			return {
				...state,
				blocksEditorSpacing: action.payload,
				};
		case 'UPDATE_ENABLE_FONT_AWESOME_5':
			return {
				...state,
				enableFontAwesome5: action.payload,
			};
		case 'UPDATE_ENABLE_AUTO_BLOCK_RECOVERY':
			return {
				...state,
				enableAutoBlockRecovery: action.payload,
			};
		case 'UPDATE_CONTAINER_GLOBAL_PADDING':
			return {
				...state,
				containerGlobalPadding: action.payload,
				};
		case 'UPDATE_CONTAINER_GLOBAL_ELEMENTS_GAP':
			return {
				...state,
				containerGlobalElementsGap: action.payload,
				};
		default:
			return state;
	}
}

export default globalDataReducer;
