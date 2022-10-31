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
			<div className="w-full blur-md">
				{Astra_Admin_Icons['custom-layout']}
			</div>

			{/* Model Component section */}
			<div>
				<div className="max-w-[39rem] h-max bg-white m-auto shadow-overlay-modal text-center rounded-lg p-8 absolute top-[7.125rem] left-0 right-0">
					<div>
						<div className="mx-auto flex items-center justify-center">
							{Astra_Admin_Icons["astra-logo"]}
						</div>
						<div className="mt-3 text-center sm:mt-5">
							<h4
								className="text-2xl font-semibold leading-7 text-slate-800"
								id="modal-title"
							>
								Upgrade to Pro
							</h4>
							<div className="mt-2">
								<p className="text-sm text-slate-500">
									Get access to powerful features for painless
									WordPress designing, without the high costs.
									With all the time you will save, it’s a
									product that pays for itself!
								</p>
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
