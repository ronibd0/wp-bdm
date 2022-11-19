import { __ } from "@wordpress/i18n";
import { useLocation } from "react-router-dom";
import QuickSettings from "@DashboardApp/pages/Welcome/QuickSettings";
import Astra_Admin_Icons from "@Common/block-icons";
import ProModules from "@DashboardApp/pages/Welcome/ProModules";
import UsefulPlugins from "@DashboardApp/pages/Welcome/UsefulPlugins";
import AstraIntegration from "@DashboardApp/pages/Welcome/AstraIntegration";
import BulkExtensionController from "@DashboardApp/pages/Welcome/BulkExtensionController";
import apiFetch from '@wordpress/api-fetch';

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Welcome = () => {
	const query = new URLSearchParams(useLocation()?.search);

	const allowAutoPlay =
		"1" === query.get("astra-activation-redirect") ? 1 : 0;

	const onCustomizeClick = () => {
		window.open(astra_admin.customize_url, "_self");
	};

	const getAstraProTitle = () => {
		return astra_admin.pro_installed_status ? __( 'Activate Now' ) : __( 'Upgrade Now' );
	}

	const onGetAstraPro = ( e ) => {
		e.preventDefault();
		e.stopPropagation();

		if( astra_admin.pro_installed_status ) {
			const formData = new window.FormData();
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'astra-addon/astra-addon.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					window.open( astra_admin.astra_base_url, '_self' );
				}
			} );
		} else {
			window.open(
				astra_admin.upgrade_url,
				'_blank'
			);
		}
	};

	return (
		<main className="py-[2.43rem]">
			<div className="max-w-3xl mx-auto px-6 lg:max-w-7xl">
				<h1 className="sr-only"> Astra </h1>

				{/* Banner section */}
				{astra_admin.show_self_branding && (
					<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm px-8 py-8">
						<div className="grid grid-cols-1 gap-4 lg:col-span-3 h-full md:mr-[50px]">
							<section aria-labelledby="section-1-title h-full">
								<h2 className="sr-only" id="section-1-title">
									Welcome Banner
								</h2>
								<div className="flex flex-col justify-center h-full">
									<div className="">
										<p className="pb-4 font-medium text-base text-slate-800">
											{__("Hello ", "astra") +
												astra_admin.current_user +
												","}
										</p>
										<div className="flex">
											<h2 className="text-slate-800 text-[2rem] leading-10 pb-3 font-medium text-left">
												{__(
													`Welcome to ${astra_admin.theme_name}`,
													"astra"
												)}
											</h2>
											{ astra_admin.pro_available ? (
												<span className="ml-2 h-full inline-flex leading-4 flex-shrink-0 py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
													{ __( 'PRO', 'astra' ) }
												</span> )
											:
												( <span className="ml-2 h-full inline-flex leading-4 flex-shrink-0 py-0.5 px-1 text-[0.625rem] text-astra bg-blue-50 rounded-[0.1875rem] font-semibold">
													{ __( 'FREE', 'astra' ) }
												</span> )
											}
										</div>

										<p className="text-base leading-[1.625rem] text-slate-500 pb-7">
											{__(
												`${astra_admin.theme_name} is fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio, business website and WooCommerce storefront. It is very lightweight and offers unparalleled speed.`,
												"astra"
											)}
										</p>

										<span className="relative z-0 inline-flex flex-col sm:flex-row justify-start w-full">
											<button
												type="button"
												className="sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none mr-4 mb-2 sm:mb-0"
												onClick={onCustomizeClick}
											>
												{__(
													"Start Customising",
													"astra"
												)}
											</button>
											<a
												className="inline-flex items-center text-base font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover"
												href={`https://www.youtube.com/watch?v=BAN-puzLheM`}
												target="_blank"
												rel="noreferrer"
											>
												<span className="pt-0.5 pl-4 pr-3">
													{" "}
													{
														Astra_Admin_Icons[
															"play"
														]
													}{" "}
												</span>
												{__(
													`${astra_admin.theme_name} Theme Full Tutorial`,
													"astra"
												)}
											</a>
										</span>
									</div>
								</div>
							</section>
						</div>

						<div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full">
							<div className="astra-video-container">
								{/* Added rel=0 query paramter at the end to disable YouTube recommendations */}
								<iframe
									className="astra-video rounded-md"
									src={`https://www.youtube.com/embed/BAN-puzLheM?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`}
									allow="autoplay"
									title="YouTube video player"
									frameBorder="0"
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
				)}

				{/* Left Column */}
				<div className="grid grid-cols-1 gap-[32px] items-start lg:grid-cols-3 lg:gap-[32px] xl:gap-[32px] mt-[32px]">
					{/* Left column */}
					<div
						className={classNames(
							astra_admin.show_self_branding
								? "lg:col-span-2"
								: "lg:col-span-3",
							"grid grid-cols-1 gap-[32px]"
						)}
					>
						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Quick Links
							</h2>
							<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="relative w-full flex items-center justify-between">
									<span className="font-semibold text-xl leading-6 text-slate-800">
										{" "}
										{__("Quick Settings", "astra")}{" "}
									</span>
									<a
										className="lg:flex-shrink-0 text-sm font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
										href={astra_admin.customize_url}
										target="_self"
										rel="noreferrer"
									>
										{__("Go to Customizer", "astra")}
									</a>
								</div>

								<QuickSettings />
							</div>
						</section>

						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Do more with Astra Pro Modules
							</h2>
							<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="relative w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
									<span className="font-semibold text-xl leading-6 text-slate-800 mb-4 sm:mb-0">
										{astra_admin.pro_available
											? __(
													`${astra_admin.plugin_name} Modules`,
													"astra"
											  )
											: __(
													`Do more with ${astra_admin.plugin_name} Modules`,
													"astra"
											  )}
									</span>
									{astra_admin.pro_available && (
										<BulkExtensionController />
									)}
									{!astra_admin.pro_available && (
										<a
											className="lg:flex-shrink-0 text-sm font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href={astra_admin.upgrade_url}
											target="_blank"
											rel="noreferrer"
											onClick={ onGetAstraPro }
										>
											{" "}
											{ getAstraProTitle() }{" "}
										</a>
									)}
								</div>

								{wp.hooks.applyFilters(
									`astra_dashboard.pro_extensions`,
									<ProModules />
								)}
							</div>
						</section>

						{astra_admin.show_plugins &&
							astra_admin.show_self_branding && (
								<section aria-labelledby="section-1-title h-full">
									<h2
										className="sr-only"
										id="section-1-title"
									>
										Astra Integrations
									</h2>
									<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
										<div className="relative w-full lg:flex lg:items-center lg:justify-between">
											<span className="font-semibold text-xl leading-6 text-slate-800">
												{" "}
												{__(
													"Astra Integrations",
													"astra"
												)}{" "}
											</span>
										</div>

										<AstraIntegration />
									</div>
								</section>
							)}

						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Your License
							</h2>
							<div className="ast-welcome-screen rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								{wp.hooks.applyFilters(
									`astra_dashboard.welcome_screen_after_integrations`,
									<span />
								)}
							</div>
						</section>
					</div>

					{/* Right Column */}
					{astra_admin.show_self_branding && (
						<div className="grid grid-cols-1 gap-[32px]">
							{astra_admin.show_plugins && (
								<section aria-labelledby="section-2-title">
									<h2
										className="sr-only"
										id="section-2-title"
									>
										Useful Plugins
									</h2>
									<div className="box-border rounded-md shadow-sm overflow-hidden">
										<div className="">
											<h3 className="text-slate-800 text-base font-semibold leading-5 tracking-[0.0125rem] bg-white pt-6 pl-6 pb-4">
												{__("Useful Plugins", "astra")}
											</h3>
											<UsefulPlugins />
										</div>
									</div>
								</section>
							)}

							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Section title
								</h2>
								<div className="relative box-border border border-sky-500 rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
									<div className="p-6">
										<h3 className="relative flex items-center text-slate-800 text-base font-medium pb-2">
											<span className="flex-1">
												{__(
													"Priority Support",
													"astra"
												)}
											</span>
											<span className="text-[0.625rem] leading-[0.7rem] text-white bg-slate-800 rounded-[0.1875rem] relative inline-flex flex-shrink-0 py-0.5 px-1 self-start">
												{__("PRO", "astra")}
											</span>
										</h3>
										<p className="text-slate-500 text-sm pb-5 pr-12">
											{__(
												"We aim to answer all priority support requests within 2-3 hours.",
												"astra"
											)}
										</p>
										<a
											className="text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wpastra.com/support/"
											target="_blank"
											rel="noreferrer"
										>
											{__("Learn More →", "astra")}
										</a>
									</div>
								</div>
							</section>

							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Section title
								</h2>
								<div className="box-border rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
									<div className="p-6">
										<h3 className="text-slate-800 text-base font-medium pb-2">
											{__("Join the Community", "astra")}
										</h3>
										<p className="text-slate-500 text-sm pb-5">
											{__(
												"Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!",
												"astra"
											)}
										</p>
										<a
											className="text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://www.facebook.com/groups/wpastra"
											target="_blank"
											rel="noreferrer"
										>
											{__("Join Now →", "astra")}
										</a>
									</div>
								</div>
							</section>

							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Section title
								</h2>
								<div className="box-border rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
									<div className="p-6">
										<h3 className="text-slate-800 text-base font-medium pb-2">
											{__("Rate Us", "astra")}
										</h3>
										<p className="text-slate-500 text-sm pb-2.5 pr-12">
											<span className="text-xl text-slate-800">
												{" "}
												★★★★★{" "}
											</span>
											<span className="text-xs leading-4 align-text-bottom text-slate-400">
												{" "}
												{__(
													"Based on 5k+ reviews",
													"astra"
												)}{" "}
											</span>
										</p>
										<p className="text-slate-500 text-sm pb-5">
											{__(
												"We love to hear from you, we would appreciate every single review.",
												"astra"
											)}
										</p>
										<a
											className="text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wordpress.org/support/theme/astra/reviews/?rate=5#new-post"
											target="_blank"
											rel="noreferrer"
										>
											{__("Submit a Review →", "astra")}
										</a>
									</div>
								</div>
							</section>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Welcome;
