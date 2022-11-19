import { __ } from "@wordpress/i18n";
import { useLocation } from "react-router-dom";
import Astra_Admin_Icons from "@Common/block-icons";
import apiFetch from '@wordpress/api-fetch';
import ReactHtmlParser from 'react-html-parser';

const spectraFeatures = [
	{
		title: __( 'Super Fast and Stable', 'astra' ),
		description: __( 'Spectra works with the native WordPress editor with no dependency on external code. So, it is fast and stable.', 'astra' ),
		icon: "<svg width='21' height='22' viewBox='0 0 21 22' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M13 10V3L4 14H11L11 21L20 10L13 10Z' stroke='#334155' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/> <circle cx='8' cy='8' r='8' fill='#5733FF' fillOpacity='0.24'/> </svg>",
	},
	{
		title: __( 'Secure and Integrated', 'astra' ),
		description: __( 'Clean code written using the latest standards to maximize security and work flawlessly with any WordPress plugin.', 'astra' ),
		icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 12.001L11 14.001L15 10.001M20.6179 5.98531C20.4132 5.99569 20.2072 6.00095 20 6.00095C16.9265 6.00095 14.123 4.84551 11.9999 2.94531C9.87691 4.84544 7.07339 6.00083 4 6.00083C3.79277 6.00083 3.58678 5.99557 3.38213 5.98519C3.1327 6.94881 3 7.9594 3 9.00099C3 14.5925 6.82432 19.2908 12 20.6229C17.1757 19.2908 21 14.5925 21 9.00099C21 7.95944 20.8673 6.94889 20.6179 5.98531Z" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="8.3335" cy="8" r="8" fill="#5733FF" fillOpacity="0.24"/> </svg>',
	},
	{
		title: __( 'Native WordPress Interface', 'astra' ),
		description: __( 'Spectra Integrates into the same WordPress editor, making it super intuitive website builder.', 'astra' ),
		icon: '<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 5H7C5.89543 5 5 5.89543 5 7V18C5 19.1046 5.89543 20 7 20H18C19.1046 20 20 19.1046 20 18V13M18.5858 3.58579C19.3668 2.80474 20.6332 2.80474 21.4142 3.58579C22.1953 4.36683 22.1953 5.63316 21.4142 6.41421L12.8284 15H10L10 12.1716L18.5858 3.58579Z" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="8.6665" cy="8" r="8" fill="#5733FF" fillOpacity="0.24"/> </svg>',
	},
	{
		title: __( 'Google Will Love and Rank', 'astra' ),
		description: __( 'Score 100% in CWV. Clean code output and lightning-fast load times keep visitors and search engines happy.', 'astra' ),
		icon: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 4V3H3V4H4ZM20 4H21V3H20V4ZM6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071C6.68342 13.0976 7.31658 13.0976 7.70711 12.7071L6.29289 11.2929ZM10 9L10.7071 8.29289C10.3166 7.90237 9.68342 7.90237 9.29289 8.29289L10 9ZM13 12L12.2929 12.7071C12.6834 13.0976 13.3166 13.0976 13.7071 12.7071L13 12ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289C17.3166 6.90237 16.6834 6.90237 16.2929 7.29289L17.7071 8.70711ZM7.29289 20.2929C6.90237 20.6834 6.90237 21.3166 7.29289 21.7071C7.68342 22.0976 8.31658 22.0976 8.70711 21.7071L7.29289 20.2929ZM12 17L12.7071 16.2929C12.3166 15.9024 11.6834 15.9024 11.2929 16.2929L12 17ZM15.2929 21.7071C15.6834 22.0976 16.3166 22.0976 16.7071 21.7071C17.0976 21.3166 17.0976 20.6834 16.7071 20.2929L15.2929 21.7071ZM3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5V3ZM21 5C21.5523 5 22 4.55228 22 4C22 3.44772 21.5523 3 21 3V5ZM4 5H20V3H4V5ZM19 4V16H21V4H19ZM19 16H5V18H19V16ZM5 16V4H3V16H5ZM5 16H3C3 17.1046 3.89543 18 5 18V16ZM19 16V18C20.1046 18 21 17.1046 21 16H19ZM7.70711 12.7071L10.7071 9.70711L9.29289 8.29289L6.29289 11.2929L7.70711 12.7071ZM9.29289 9.70711L12.2929 12.7071L13.7071 11.2929L10.7071 8.29289L9.29289 9.70711ZM13.7071 12.7071L17.7071 8.70711L16.2929 7.29289L12.2929 11.2929L13.7071 12.7071ZM8.70711 21.7071L12.7071 17.7071L11.2929 16.2929L7.29289 20.2929L8.70711 21.7071ZM11.2929 17.7071L15.2929 21.7071L16.7071 20.2929L12.7071 16.2929L11.2929 17.7071ZM3 5H21V3H3V5Z" fill="#334155"/> <circle cx="8" cy="8" r="8" fill="#5733FF" fillOpacity="0.24"/> </svg>',
	},
	{
		title: __( 'Zero Bloat, No Dependencies', 'astra' ),
		description: __( 'Fewer external scripts and dependencies keep the code clean, resulting in small file sizes and faster loading times.', 'astra' ),
		icon: '<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 3L12.4472 2.10557C12.1657 1.96481 11.8343 1.96481 11.5528 2.10557L12 3ZM20 7H21C21 6.62123 20.786 6.27496 20.4472 6.10557L20 7ZM4 7L3.55279 6.10557C3.214 6.27496 3 6.62123 3 7H4ZM20 17L20.4472 17.8944C20.786 17.725 21 17.3788 21 17H20ZM12 21L11.5528 21.8944C11.8343 22.0352 12.1657 22.0352 12.4472 21.8944L12 21ZM4 17H3C3 17.3788 3.214 17.725 3.55279 17.8944L4 17ZM11.5528 3.89443L19.5528 7.89443L20.4472 6.10557L12.4472 2.10557L11.5528 3.89443ZM19.5528 6.10557L11.5528 10.1056L12.4472 11.8944L20.4472 7.89443L19.5528 6.10557ZM12.4472 10.1056L4.44721 6.10557L3.55279 7.89443L11.5528 11.8944L12.4472 10.1056ZM4.44721 7.89443L12.4472 3.89443L11.5528 2.10557L3.55279 6.10557L4.44721 7.89443ZM19.5528 16.1056L11.5528 20.1056L12.4472 21.8944L20.4472 17.8944L19.5528 16.1056ZM12.4472 20.1056L4.44721 16.1056L3.55279 17.8944L11.5528 21.8944L12.4472 20.1056ZM5 17V7H3V17H5ZM21 17V7H19V17H21ZM11 11V21H13V11H11Z" fill="#334155"/> <circle cx="8.3335" cy="8" r="8" fill="#5733FF" fillOpacity="0.24"/> </svg>',
	},
	{
		title: __( 'Just-in-time Compiler', 'astra' ),
		description: __( 'Loads assets dynamically on demand. Assets are loaded for only those blocks that are used on a page.', 'astra' ),
		icon: '<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13 8V12L16 15M22 12C22 16.9706 17.9706 21 13 21C8.02944 21 4 16.9706 4 12C4 7.02944 8.02944 3 13 3C17.9706 3 22 7.02944 22 12Z" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="8.6665" cy="8" r="8" fill="#5733FF" fillOpacity="0.24"/></svg>',
	},
];

const SpectraScreen = () => {
	const query = new URLSearchParams(useLocation()?.search);
	const allowAutoPlay = "1" === query.get("astra-activation-redirect") ? 1 : 0;

	const handleSpectraPluginAction = (e) => {

		let spectraPluginStatus = astra_admin.spectra_plugin_status;
		const formData = new window.FormData();

		if ( 'install' === spectraPluginStatus ) {
			formData.append( 'action', 'astra_recommended_plugin_install' );
			formData.append( 'slug', 'ultimate-addons-for-gutenberg' );
			formData.append( 'init', 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' );
			formData.append( '_ajax_nonce', astra_admin.plugin_installer_nonce );

			e.target.innerText = astra_admin.plugin_installing_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if ( data.success ) {
					e.target.innerText = astra_admin.plugin_installed_text;
					activatePlugin(e);
				}
			} );
		} else if ( 'installed' === spectraPluginStatus ) {
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					e.target.innerText = astra_admin.plugin_activated_text;
					window.open( `${astra_admin.admin_base_url}options-general.php?page=spectra`, '_self' );
				}
			} );
		} else {
			// Do nothing.
		}
	};

	const activatePlugin = (e) => {
		const formData = new window.FormData();
		formData.append( 'action', 'astra_recommended_plugin_activate' );
		formData.append( 'security', astra_admin.plugin_manager_nonce );
		formData.append( 'init', 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' );
		e.target.innerText = astra_admin.plugin_activating_text;

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if( data.success ) {
				e.target.innerText = astra_admin.plugin_activated_text;
				window.open( `${astra_admin.admin_base_url}options-general.php?page=spectra`, '_self' );
			}
		} );
	};

	const getSpectraPluginTitle = () => {
		if ( 'install' === astra_admin.spectra_plugin_status ) {
			return __("Install Spectra - It’s free", "astra");
		} else if ( 'installed' === astra_admin.spectra_plugin_status ) {
			return __("Activate Spectra", "astra");
		} else {
			return __("Explore Spectra", "astra");
		}
	}

	return (
		<main className="bg-white pb-14 pt-20">
			<div className="mx-auto px-6 max-w-[45rem]">
				<h1 className="sr-only"> Astra Free Vs Pro </h1>
				<div className="flex flex-col items-center">
					<div className="absolute top-0">
						<svg width="629" height="807" viewBox="0 0 629 807" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M155.35 384.598C22.04 384.731 -50.5339 218.96 41.6946 124.989L370.474 -210.002L405.115 4.20929L235.903 176.068C222.848 189.37 232.348 212.283 250.911 212.265L473.541 212.041C606.852 211.907 679.425 377.679 587.197 471.65L258.418 806.641L223.777 592.429L392.988 420.571C406.044 407.269 396.544 384.356 377.981 384.374L155.35 384.598Z" fill="url(#paint0_linear_3240_66110)" fillOpacity="0.48" />
							<defs>
								<linearGradient id="paint0_linear_3240_66110" x1="240.999" y1="-289" x2="252.522" y2="770.375" gradientUnits="userSpaceOnUse">
									<stop stopColor="#F4E3CC" />
									<stop offset="1" stopColor="#F4E3CC" stopOpacity="0"/>
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
				<div className="relative flex flex-col items-center">
					{Astra_Admin_Icons["spectra-logo"]}
					<h2 className="text-4xl sm:text-[2.5rem] text-slate-800 font-semibold capitalize mb-2 mt-7">
						{__(`${astra_admin.theme_name} + Spectra = ♥`, "astra")}
					</h2>
					<p className="text-base leading-[1.625rem] mb-7">
						{
							__( 'Spectra is 100% beginner friendly and enhances the default WordPress block editor.', 'astra' )
						}
					</p>
					<button
						className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover hover:text-white focus:text-white active:text-white focus:outline-none mr-4`}
						onClick={ handleSpectraPluginAction }
					>
						<span className="mr-3">
							{ getSpectraPluginTitle() }
						</span>
						{Astra_Admin_Icons["download"]}
					</button>
					<div className="relative pb-[25.375rem] mt-12 w-full">
						{/* Added rel=0 query parameter at the end to disable YouTube recommendations */}
						<iframe
							className="absolute inset-0 w-full h-full rounded-md"
							src={`https://www.youtube.com/embed/GLNzTxArR6Y?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`}
							allow="autoplay"
							title="YouTube video player"
							frameBorder="0"
							allowFullScreen
						></iframe>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-12 mt-16 px-0 sm:px-8">
					{spectraFeatures.map((feature, key) => (
						<div key={key}>
							<div> { ReactHtmlParser(feature.icon) } </div>
							<h4 className="text-base leading-[1.625rem] text-slate-800 font-medium mt-4 mb-1">
								{feature.title}
							</h4>
							<p className="text-sm leading-[1.375rem] text-slate-600">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-center mt-20 mx-0 sm:mx-[4.5rem]">
					<h3 className="text-[2rem] leading-10 font-semibold text-slate-800 mb-6 text-center">
						{__(
							"Build Ultra High Performance Websites, Without Coding",
							"astra"
						)}
					</h3>
					<button
						className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover hover:text-white focus:text-white active:text-white focus:outline-none mr-4`}
						onClick={ handleSpectraPluginAction }
					>
						<span className="mr-3">
							{ getSpectraPluginTitle() }
						</span>
						{Astra_Admin_Icons["download"]}
					</button>
				</div>
			</div>
		</main>
	);
};

export default SpectraScreen;
