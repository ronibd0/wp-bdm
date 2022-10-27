import { createStore } from 'redux';
import globalDataReducer from './globalDataReducer';
import { applyFilters } from '@wordpress/hooks';

const initialState = applyFilters( 'astra_dashboard/datastore', {
		initialStateSetFlag : false,
		enableLoadFontsLocally : false,
		enablePreloadLocalFonts : false,
		useOldHeaderFooter : false,
		useUpgradeNotices : false,
		enableWhiteLabel : false,
		enableBeta : 'disable',
		enableFileGeneration: 'disable',
		activeSettingsNavigationTab : '',
		pluginDescription: '',
		pluginName: '',
		themeScreenshotURL: '',
		themeDescription: '',
		themeName: '',
		agencyLicenseLink: '',
		agencyAuthorURL: '',
		agencyAuthorName: '',
	}
);

const globalDataStore = createStore(
	globalDataReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default globalDataStore;
