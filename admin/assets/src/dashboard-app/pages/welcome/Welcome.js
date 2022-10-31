import { __ } from '@wordpress/i18n';
import { useLocation } from 'react-router-dom';
import QuickSettings from '@DashboardApp/pages/Welcome/QuickSettings';
import Astra_Admin_Icons from '@Common/block-icons';
import ProModules from './ProModules';
import UsefulPlugins from './UsefulPlugins';
import AstraIntegration from './AstraIntegration';

const Welcome = () => {

	const query = new URLSearchParams( useLocation()?.search );

	const allowAutoPlay = '1' === query.get( 'astra-activation-redirect' ) ? 1 : 0;

	const onCreateNewPageClick = () => {
		window.open(
			astra_admin.customize_url,
			'_self'
		);
	};

	return(
		<main className="py-[2.43rem]">
			<div className="max-w-3xl mx-auto px-6 lg:max-w-7xl">
				<h1 className="sr-only"> Astra </h1>

				{/* Banner section */}
				<div className="grid grid-cols-2 gap-4 items-start lg:grid-cols-5 lg:gap-5 xl:gap-10 rounded-md bg-white overflow-hidden shadow-sm p-12 pt-[2.2rem]">
					<div className="grid grid-cols-1 gap-4 lg:col-span-3 h-full mr-[40px]">
						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Section title
							</h2>
							<div className="flex flex-col justify-center h-full">
								<div className="">
									<p className='pb-4 font-medium text-base text-slate-800'>{__( 'Hello ', 'astra' ) + astra_admin.current_user + ','}</p>
									<h2 className='text-slate-800 text-[1.8rem] leading-[2.4rem] pb-3 font-medium text-left'>{__( 'Welcome to Astra!', 'astra' )}</h2>
									<p className='text-slate-500 pb-7'>{__( 'Astra is fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio, business website and WooCommerce storefront. It is very lightweight and offers unparalleled speed.', 'astra' )}</p>

									<span className="relative z-0 inline-flex justify-start w-full">
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none mr-4"
											onClick={ onCreateNewPageClick }
										>
											{__( 'Start Customising', 'astra' )}
										</button>
										<a
											className='inline-flex items-center text-base font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
											href={ `https://www.youtube.com/watch?v=BAN-puzLheM` } target="_blank" rel="noreferrer">
											<span className='pt-0.5 pl-4 pr-3'> { Astra_Admin_Icons['play'] } </span>
											{__( 'What’s New in Astra 3.9.1', 'astra' )}
										</a>
									</span>
								</div>
							</div>
						</section>
					</div>

					<div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full">
						<div className="mr-[80px] spectra-video-container">
							{/* Added rel=0 query paramter at the end to disable YouTube recommendations */}
							<iframe className="spectra-video rounded-md" src={`https://www.youtube.com/embed/BAN-puzLheM?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`} allow="autoplay" title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
						</div>
					</div>
				</div>

				{/* Left Column */}
				<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-5 xl:gap-10 mt-[32px]">
					{/* Left column */}
					<div className="grid grid-cols-1 gap-4 lg:col-span-2">
						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Quick Links
							</h2>
							<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="relative w-full lg:flex lg:items-center lg:justify-between">
									<span className='font-semibold text-xl leading-6 text-slate-800'> {__( 'Quick Settings', 'astra' )} </span>
									<a className='lg:flex-shrink-0 text-sm font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline' href={ astra_admin.customize_url } target='_self' rel="noreferrer">
										{ __(
											'Go to Customizer',
											'astra'
										) }
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
								<div className="relative w-full lg:flex lg:items-center lg:justify-between">
									<span className='font-semibold text-xl leading-6 text-slate-800'> {__( 'Do more with Astra Pro Modules', 'astra' )} </span>
									{
										! astra_admin.pro_available && <a className='lg:flex-shrink-0 text-sm font-medium text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline' href={ astra_admin.upgrade_url } target='_blank' rel="noreferrer">
											{ __(
												'Upgrade Now',
												'astra'
											) }
										</a>
									}
								</div>

								<ProModules />
							</div>
						</section>

						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Astra Integrations
							</h2>
							<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="relative w-full lg:flex lg:items-center lg:justify-between">
									<span className="font-semibold text-xl leading-6 text-slate-800"> {__( 'Astra Integrations', 'astra' )} </span>
								</div>

								<AstraIntegration />
							</div>
						</section>

						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Your License
							</h2>
							<div className="p-[2rem] rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="relative w-full lg:flex lg:items-center">
									{ Astra_Admin_Icons['lock-open'] }
									<span className="font-semibold text-base leading-5 text-slate-800 ml-2"> {__( 'Your License', 'astra' )} </span>
								</div>

								<p className="mt-4 text-sm text-slate-600">
									You are using <span className="font-medium">Astra Theme Free</span>. No license needed!
								</p>
								<p className="text-sm text-slate-600">
									Activate{" "}
									<a href="/" className="text-astra font-medium underline">
										Astra Pro Addon
									</a>{" "}
									to get professional support and automatic updates from your
									WordPress dashboard.
								</p>
								<div className="mt-4">
									<div className="flex">
										<div className="relative">
											<input
												className="ast-admin_license-input-field h-10 block w-[28rem] shadow-sm focus:border-astra focus:ring-astra sm:text-sm text-slate-400"
												id="license-key"
												type="text"
												placeholder="Paste your license key here"
											/>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="absolute top-1/2 -translate-y-1/2 left-3"
											>
												<path
													d="M10 4.66667C10.7364 4.66667 11.3333 5.26362 11.3333 6M14 6C14 8.20914 12.2091 10 10 10C9.59589 10 9.20577 9.94007 8.83805 9.82862L7.33333 11.3333H6V12.6667H4.66667V14H2.66667C2.29848 14 2 13.7015 2 13.3333V11.6095C2 11.4327 2.07024 11.2631 2.19526 11.1381L6.17138 7.16195C6.05993 6.79423 6 6.40412 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z"
													stroke="#94A3B8"
													strokeWidth="1.4"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>

										<button className="ml-4 px-5 h-10 bg-gray-50 text-gray-400 text rounded-md shadow-sm">
											Activate
										</button>
									</div>
								</div>
								<div className="mt-4">
									<a href="/" className="text-sm font-medium text-astra hover:text-astra-hover leading-[0.875rem]">Need help?</a>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column */}
					<div className="space-y-4 flex h-full flex-col">
						<section aria-labelledby="section-2-title">
							<h2 className="sr-only" id="section-2-title">
								Useful Plugins
							</h2>
							<div className="box-border rounded-md shadow-sm overflow-hidden">
								<div className="">
									<h3 className="text-slate-800 text-base font-semibold leading-5 tracking-[0.0125rem] bg-white pt-6 pl-6 pb-4">
										{ __(
											'Useful Plugins',
											'astra'
										) }
									</h3>
									<UsefulPlugins />
								</div>
							</div>
						</section>

						<section aria-labelledby="section-2-title">
							<h2 className="sr-only" id="section-2-title">
								Section title
							</h2>
							<div className="relative box-border border border-sky-500 rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
								<div className="p-6">
									<h3 className='relative flex items-center text-slate-800 text-base font-medium pb-2'>
										<span className='flex-1'>
											{ __(
												'Priority Support',
												'astra'
											) }
										</span>
										<span className="inline-flex leading-4 flex-shrink-0 py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
											{ __( 'PRO', 'astra' ) }
										</span>
									</h3>
									<p className='text-slate-500 text-sm pb-5 pr-12'>
										{ __(
											'We aim to answer all priority support requests within 2-3 hours.',
											'astra'
										) }
									</p>
									<a className='text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline' href='https://wpastra.com/support/' target='_blank' rel="noreferrer">
										{ __(
											'Learn More →',
											'astra'
										) }
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
									<h3 className='text-slate-800 text-base font-medium pb-2'>
										{ __(
											'Join the Community',
											'astra'
										) }
									</h3>
									<p className='text-slate-500 text-sm pb-5'>
										{ __(
											'Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!',
											'astra'
										) }
									</p>
									<a className='text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline' href='https://www.facebook.com/groups/wpastra' target='_blank' rel="noreferrer">
										{ __(
											'Join Now →',
											'astra'
										) }
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
									<h3 className='text-slate-800 text-base font-medium pb-2'>
										{ __(
											'Rate Us',
											'astra'
										) }
									</h3>
									<p className='text-slate-500 text-sm pb-2.5 pr-12'>
										<span className='text-2xl text-slate-800'> ★★★★★ </span>
										<span className='text-xs leading-4 align-text-bottom text-slate-400'> { __( 'Based on 5k+ reviews', 'astra' ) } </span>
									</p>
									<p className='text-slate-500 text-sm pb-5'>
										{ __(
											'We love to hear from you, we would appreciate every single review.',
											'astra'
										) }
									</p>
									<a className='text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline' href='https://wordpress.org/support/theme/astra/reviews/?rate=5#new-post' target='_blank' rel="noreferrer">
										{ __(
											'Submit a Review →',
											'astra'
										) }
									</a>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Welcome;
