import { createStore } from 'redux';
import globalDataReducer from './globalDataReducer';

const initialState = {
	initialStateSetFlag : false,
	enableLoadFontsLocally : false,
	enablePreloadLocalFonts : false,
	enableWhiteLabel : false,
	enableBeta : false,
	enableFileGeneration: false,
	activeSettingsNavigationTab : '',
	pluginDescription: '',
	pluginName: '',
	themeScreenshotURL: '',
	themeDescription: '',
	themeName: '',
	agencyLicenseLink: '',
	agencyAuthorURL: '',
	agencyAuthorName: '',
};

const globalDataStore = createStore(
	globalDataReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default globalDataStore;
