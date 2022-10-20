import { __ } from '@wordpress/i18n';
import Astra_Admin_Icons from '@Common/block-icons';

const StarterTemplates = () => {
	return (
		<main className="relative">
			{ /* <img src={starterTemp} alt="" className="blur-md" /> */ }
			<div className="w-full blur-md opacity-40">
				{ Astra_Admin_Icons['starter-temp'] }
			</div>

			{ /* Model Component section */ }
			<div>
				<div className="max-w-[39rem] h-max bg-white m-auto shadow-overlay-modal text-center rounded-lg p-8 absolute inset-0">
					<div>
						<div className="mx-auto flex items-center justify-center">
							{ Astra_Admin_Icons['starter-logo'] }
						</div>
						<div className="mt-3 text-center sm:mt-6">
							<h4
								className="text-2xl font-semibold leading-7 text-slate-800"
								id="modal-title"
							>
								Starter Templates
							</h4>
							<div className="mt-2">
								<p className="text-sm text-slate-500">
									Create professional designed pixel perfect
									websites in minutes. Get access to 280+
									pre-made full website templates for your
									favorite page builder.
								</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-5 sm:mt-6">
						<button
							type="button"
							className="w-auto justify-center rounded-md border border-transparent bg-astra px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-astra-hover focus:outline-none focus:ring-2 focus:ring-astra-hover focus:ring-offset-2 sm:text-sm"
						>
							Install & Activate
						</button>
						<div>
							<button className="w-auto justify-center mt-4 text-astra">
								Learn More
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default StarterTemplates;
