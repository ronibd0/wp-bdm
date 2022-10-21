import { __ } from "@wordpress/i18n";

const CssGeneration = () => {
	return (
		<section className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
			<div className="w-full flex justify-between">
				<div>
					<h3 className="p-0 text-xl leading-6 font-semibold text-slate-800">
						{__("CSS File Generation", "astra")}
					</h3>
					<p className="mt-2 text-sm text-slate-600">
						Enable this option to generate CSS files. Please read{" "}
						<a href="https://wpastra.com/astra-2-1/?utm_source=welcome_page&utm_medium=sidebar&utm_campaign=astra_pro" className="text-astra underline">
							this article
						</a>{" "}
						to know more.
					</p>
				</div>
				<div>
					<button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none">
						{__("Regenerte Files", "astra")}
					</button>
				</div>
			</div>
		</section>
	);
};

export default CssGeneration;
