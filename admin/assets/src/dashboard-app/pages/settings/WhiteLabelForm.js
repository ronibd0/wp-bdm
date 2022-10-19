import { __ } from "@wordpress/i18n";

const WhiteLabelForm = () => {
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
							htmlFor="author-name"
							className="block text-sm font-medium text-slate-600"
						>
							Agency author name:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-name"
								id="author-name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="author-url"
							className="block text-sm font-medium text-slate-600"
						>
							Agency author URL:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-url"
								id="author-url"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="author-license"
							className="block text-sm font-medium text-slate-600"
						>
							Agency license link:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-license"
								id="author-license"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
						<p className="mt-2 text-sm text-slate-600">
							Get license link will be displayed in the license
							form when the purchase key is expired/not valid
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
							htmlFor="author-name"
							className="block text-sm font-medium text-slate-600"
						>
							Theme Name:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-name"
								id="author-name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="author-url"
							className="block text-sm font-medium text-slate-600"
						>
							Theme Description:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-url"
								id="author-url"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="author-license"
							className="block text-sm font-medium text-slate-600"
						>
							Theme Screenshot URL:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-license"
								id="author-license"
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
							htmlFor="author-name"
							className="block text-sm font-medium text-slate-600"
						>
							Plugin Name:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-name"
								id="author-name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="author-url"
							className="block text-sm font-medium text-slate-600"
						>
							Plugin Description:
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="author-url"
								id="author-url"
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
