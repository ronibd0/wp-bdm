import { __ } from '@wordpress/i18n';
import { useLocation } from 'react-router-dom';

const Welcome = () => {

	const query = new URLSearchParams( useLocation()?.search );

	const allowAutoPlay = '1' === query.get( 'spectra-activation-redirect' ) ? 1 : 0;

	const onCreateNewPageClick = () => {
		window.open(
			astra_admin.wp_pages_url,
			'_blank'
		);
	};

	const onReadFullGuideClick = () => {
		window.open(
			'https://wpastra.com/',
			'_blank'
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
									<p className='pb-4 font-medium text-slate-800'>{__( 'Hello, ', 'astra' ) + astra_admin.current_user}</p>
									<h2 className='text-slate-800 text-[1.8rem] leading-[2.4rem] pb-3 font-medium text-left'>{__( 'Welcome to Astra!', 'astra' )}</h2>
									<p className='text-slate-500 pb-7'>{__( 'Astra is fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio, business website and WooCommerce storefront. It is very lightweight and offers unparalleled speed.', 'astra' )}</p>

									<span className="relative z-0 inline-flex justify-start w-full">
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-spectra focus-visible:bg-spectra-hover hover:bg-spectra-hover focus:outline-none mr-4"
											onClick={ onCreateNewPageClick }
										>
											{__( 'Start Customising', 'astra' )}
										</button>
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-500 bg-white focus-visible:bg-slate-50 hover:bg-slate-50 focus:outline-none"
											onClick={ onReadFullGuideClick }
										>
											{__( 'What’s New in Astra 3.9.1', 'astra' )}
										</button>
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

				{/* Main 3 column grid */}
				<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-5 xl:gap-10 mt-[32px]">
					{/* Left column */}
					<div className="grid grid-cols-1 gap-4 lg:col-span-2">
						<section aria-labelledby="section-1-title h-full">
							<h2 className="sr-only" id="section-1-title">
								Section title
							</h2>
							<div className="rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
								<div className="p-12 pt-[2.2rem]">
									<h2 className='text-slate-800 text-[1.8rem] leading-[2.4rem] pb-3 font-medium text-left'>{__( 'Welcome to Astra!', 'astra' )}</h2>
									<p className='text-slate-500 pb-7'>{__( 'Astra is fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio, business website and WooCommerce storefront. It is very lightweight and offers unparalleled speed.', 'astra' )}</p>
								</div>
							</div>
						</section>
					</div>

					{/* Right column */}
					<div className="space-y-4 flex h-full flex-col justify-between">
						<section aria-labelledby="section-2-title">
							<h2 className="sr-only" id="section-2-title">
								Section title
							</h2>
							<div className="box-border rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
								<div className="p-8 pr-10">
									<h3 className='text-slate-800 text-xl font-medium pb-2'>
										{ __(
											'Knowledge Base',
											'astra'
										) }
									</h3>
									<p className='text-slate-500 text-sm pb-2 pr-2'>
										{ __(
											'Learn everything you need to know about the Spectra plugin with our comprehensive documentation.',
											'astra'
										) }
									</p>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover underline' href='https://wpastra.com/docs/' target='_blank' rel="noreferrer">
										{ __(
											'Browse Now',
											'astra'
										) }
									</a>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover no-underline' href='https://wpastra.com/docs/' target='_blank' rel="noreferrer"> → </a>
								</div>
							</div>
						</section>
						<section aria-labelledby="section-2-title">
							<h2 className="sr-only" id="section-2-title">
								Section title
							</h2>
							<div className="box-border rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
								<div className="p-8 pr-10">
									<h3 className='text-slate-800 text-xl font-medium pb-2'>
										{ __(
											'Get 5-star Support',
											'astra'
										) }
									</h3>
									<p className='text-slate-500 text-sm pb-2 pr-2'>
										{ __(
											'Need some help? Our awesome support team is here to help you with any question you have.',
											'astra'
										) }
									</p>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover underline' href='https://wpastra.com/support/' target='_blank' rel="noreferrer">
										{ __(
											'Get Support',
											'astra'
										) }
									</a>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover no-underline' href='https://wpastra.com/support/' target='_blank' rel="noreferrer"> → </a>
								</div>
							</div>
						</section>
						<section aria-labelledby="section-2-title">
							<h2 className="sr-only" id="section-2-title">
								Section title
							</h2>
							<div className="box-border rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover">
								<div className="p-8 pr-10">
									<h3 className='text-slate-800 text-xl font-medium pb-2'>
										{ __(
											'Join the Community',
											'astra'
										) }
									</h3>
									<p className='text-slate-500 text-sm pb-2 pr-2'>
										{ __(
											'Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!',
											'astra'
										) }
									</p>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover underline' href='https://www.facebook.com/groups/wpastra' target='_blank' rel="noreferrer">
										{ __(
											'Join Now',
											'astra'
										) }
									</a>
									<a className='text-base text-spectra focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover no-underline' href='https://www.facebook.com/groups/wpastra' target='_blank' rel="noreferrer"> → </a>
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
