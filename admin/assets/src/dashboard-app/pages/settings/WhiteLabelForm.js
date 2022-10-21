import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from 'react-redux';
import apiFetch from '@wordpress/api-fetch';

const WhiteLabelForm = () => {

	const dispatch = useDispatch();
	const agencyAuthorName = useSelector( ( state ) => state.agencyAuthorName );
	const agencyLicenseLink = useSelector( ( state ) => state.agencyLicenseLink );
	const agencyAuthorURL = useSelector( ( state ) => state.agencyAuthorURL );
	const themeName = useSelector( ( state ) => state.themeName );
	const themeDescription = useSelector( ( state ) => state.themeDescription );
	const themeScreenshotURL = useSelector( ( state ) => state.themeScreenshotURL );
	const pluginName = useSelector( ( state ) => state.pluginName );
	const pluginDescription = useSelector( ( state ) => state.pluginDescription );

	const updateWhitelabelForm = ( e ) => {
		let value = e.target.value;
		let name = e.target.name;
		let type = '';

		switch (name) {
			case 'plugin_description':
				type = 'UPDATE_PLUGIN_DESCRIPTION';
				break;

			case 'plugin_name':
				type = 'UPDATE_PLUGIN_NAME';
				break;

			case 'theme_screenshot_url':
				type = 'UPDATE_THEME_SCREENSHOT_URL';
				break;

			case 'theme_description':
				type = 'UPDATE_THEME_DESCRIPTION';
				break;

			case 'theme_name':
				type = 'UPDATE_THEME_NAME';
				break;

			case 'agency_license_link':
				type = 'UPDATE_AGENCY_LICENSE_LINK';
				break;

			case 'agency_author_url':
				type = 'UPDATE_AGENCY_AUTHOR_URL';
				break;

			case 'agency_author_name':
				type = 'UPDATE_AGENCY_AUTHOR_NAME';
				break;

			default:
				break;
		}

		dispatch( {type: type, payload: value } );
		const formData = new window.FormData();

		formData.append( 'action', 'astra_update_admin_setting' );
		formData.append( 'security', astra_admin.update_nonce );
		formData.append( 'key', name );
		formData.append( 'value', value );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

	return (
		<section>
			{/* Agency Detail Section */}
			<div className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
				<div className="w-full ">
					<h3 className="p-0 text-base leading-6 font-semibold text-slate-800 mb-8">
						{__("Agency Details", "astra")}
					</h3>
					<div className="mb-6">
						<label
							htmlFor="agency_author_name"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Agency author name:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								value={ agencyAuthorName }
								type="text"
								name="agency_author_name"
								id="agency_author_name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="agency_author_url"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Agency author URL:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ agencyAuthorURL }
								name="agency_author_url"
								id="agency_author_url"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="agency_license_link"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Agency license link:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ agencyLicenseLink }
								name="agency_license_link"
								id="agency_license_link"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
						<p className="mt-2 text-sm text-slate-600">
							{__(
								"Get license link will be displayed in the license form when the purchase key is expired/not valid",
								"astra"
							)}
						</p>
					</div>
				</div>
			</div>
			{/* Astra Theme Branding Section */}
			<div className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
				<div className="w-full">
					<h3 className="p-0 text-base leading-6 font-semibold text-slate-800 mb-8">
						{__("Astra Theme Branding", "astra")}
					</h3>
					<div className="mb-6">
						<label
							htmlFor="theme_name"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Name:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ themeName }
								name="theme_name"
								id="theme_name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="theme_description"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Description:", "astra")}
						</label>
						<div className="mt-2">
							<textarea
								name="theme_description"
								id="theme_description"
								onChange={ updateWhitelabelForm }
								value={ themeDescription }
								rows="4"
								className="ast-admin_input-field block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
							></textarea>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="theme_screenshot_url"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Screenshot URL:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ themeScreenshotURL }
								name="theme_screenshot_url"
								id="theme_screenshot_url"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Astra Pro Branding Section */}
			<div className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
				<div className="w-full ">
					<h3 className="p-0 text-base leading-6 font-semibold text-slate-800 mb-8">
						{__("Astra Pro Branding", "astra")}
					</h3>
					<div className="mb-6">
						<label
							htmlFor="plugin_name"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Plugin Name:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ pluginName }
								name="plugin_name"
								id="plugin_name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="plugin_description"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Plugin Description:", "astra")}
						</label>
						<div className="mt-2">
							<input
								onChange={ updateWhitelabelForm }
								type="text"
								value={ pluginDescription }
								name="plugin_description"
								id="plugin_description"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhiteLabelForm;
