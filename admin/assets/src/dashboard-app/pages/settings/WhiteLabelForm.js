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
							{__("Agency author name:", "astra")}
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
							{__("Agency author URL:", "astra")}
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
							{__("Agency license link:", "astra")}
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
							htmlFor="theme-name"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Name:", "astra")}
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="theme-name"
								id="theme-name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mb-6">
						<label
							htmlFor="theme-description"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Description:", "astra")}
						</label>
						<div className="mt-2">
							<textarea
								name="theme-description"
								id="theme-description"
								rows="4"
								className="ast-admin_input-field block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
							></textarea>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="theme-screenshot"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Theme Screenshot URL:", "astra")}
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="theme-screenshot"
								id="theme-screenshot"
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
							htmlFor="plugin-name"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Plugin Name:", "astra")}
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="plugin-name"
								id="plugin-name"
								className="ast-admin_input-field h-10 block w-4/5 shadow-sm focus:border-astra focus:ring-astra sm:text-sm"
								placeholder=""
							/>
						</div>
					</div>
					<div className="">
						<label
							htmlFor="plugin-description"
							className="block text-sm font-medium text-slate-600"
						>
							{__("Plugin Description:", "astra")}
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="plugin-description"
								id="plugin-description"
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
