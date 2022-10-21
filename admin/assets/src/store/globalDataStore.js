import { createStore } from 'redux';
import globalDataReducer from './globalDataReducer';

const initialState = {
	initialStateSetFlag : false,
	activeBlocksFilterTab : 'all',
	activeSettingsNavigationTab : '',
	enableLoadFontsLocally : false,
	enablePreloadLocalFonts : false,
	blocksStatuses : [],
	enableFileGeneration : '',
	enableTemplates : '',
	enableBeta : '',
	selectedFontFamilies : '',
	enableCollapsePanels : '',
	enableCopyPasteStyles : '',
	contentWidth: '',
	siteKeyV2: '',
	siteKeyV3: '',
	secretKeyV2: '',
	secretKeyV3: '',
	settingsSavedNotification: '',
	enableComingSoonMode: 'disabled',
	comingSoonPage: '',
	blocksEditorSpacing: '',
	containerGlobalPadding: '',
	containerGlobalElementsGap: 20,
	enableFontAwesome5: 'disabled',
	enableAutoBlockRecovery: 'disabled',
	enableLegacyBlocks: 'no',
};

const globalDataStore = createStore(
	globalDataReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default globalDataStore;
