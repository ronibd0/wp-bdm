import { __ } from "@wordpress/i18n";
import { useLocation } from 'react-router-dom';
import Astra_Admin_Icons from "@Common/block-icons";

const CustomLayouts = () => {
	const query = new URLSearchParams( useLocation()?.search );
	const allowAutoPlay = '1' === query.get( 'astra-activation-redirect' ) ? 1 : 0;

	const onGetAstraPro = () => {
		window.open(
			'https://wpastra.com/pro',
			'_blank'
		);
	};

	const onFreeVsProClick = () => {
		window.open(
			astra_admin.free_vs_pro_link,
			'_self'
		);
	};

	return (
		<main className="relative">
			<div className="w-full absolute inset-0 blur-md">
				{Astra_Admin_Icons['custom-layout']}
			</div>

			{/* Model Component section */}
			<div className="relative z-10 pt-[7.125rem]">
				<div className="max-w-[39rem] h-max bg-white m-auto shadow-overlay-modal text-center rounded-lg p-8">
					<div>
						<div className="mx-auto flex items-center justify-center">
							{Astra_Admin_Icons["astra-logo"]}
						</div>
						<div className="mt-3 text-center sm:mt-5">
							<h4
								className="text-2xl font-semibold leading-7 text-slate-800"
								id="modal-title"
							>
								{ astra_admin.upgrade_notice ? <>{ __( 'Upgrade to Pro', 'astra' ) }</> : <>{ __( 'Custom Layouts', 'astra' ) }</> }
							</h4>
							<div className="mt-2">
								{ astra_admin.upgrade_notice ?
									<p className="text-sm text-slate-500">
										{ __( 'Get access to powerful features for painless	WordPress designing, without the high costs. With all the time you will save, its a product that pays for itself!', 'astra' ) }
									</p> :
									<p className="text-sm text-slate-500">
										{ __( 'Custom Layouts is a very powerful module that comes with Astra Pro. This module can create a unique header, footer, 404 pages, and custom content or code on various hook locations.Upgrade to Astra Pro for instant access to Custom Layouts and unlock the full potential of your website.', 'astra' ) }
									</p>
								}
							</div>
							<div className="relative pb-[17.5rem] mt-5">
								{/* Added rel=0 query paramter at the end to disable YouTube recommendations */}
								<iframe
									className="absolute inset-0 w-full h-full rounded-md"
									src={`https://www.youtube.com/embed/BAN-puzLheM?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`}
									allow="autoplay"
									title="YouTube video player"
									frameBorder="0"
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
					<div className="text-center mt-5">
						<button
							type="button"
							className="w-auto justify-center rounded-md border border-transparent bg-astra px-4 py-2 text-base leading-4 font-medium text-white shadow-sm hover:bg-astra-hover focus:outline-none focus:ring-2 focus:ring-astra-hover focus:ring-offset-2 sm:text-sm"
							onClick={ onGetAstraPro }
						>
							{ __( 'Upgrade Now', 'astra' ) }
						</button>
						<div>
							<button
								className="w-auto justify-center mt-4 text-base leading-4 text-astra font-medium"
								onClick={ onFreeVsProClick }
							>
								{ __( 'Free vs Pro', 'astra' ) }
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CustomLayouts;
