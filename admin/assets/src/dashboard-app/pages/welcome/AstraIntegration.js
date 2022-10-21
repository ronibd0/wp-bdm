import { __ } from "@wordpress/i18n";
import Astra_Admin_Icons from "@Common/block-icons";
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const usefulPlugins = [
	{
		title: "Spectra",
		subtitle: "Gutenberg blocks builder",
		logoPath: Astra_Admin_Icons["spectra"],
		status: "activated",
	},
	{
		title: "Yoast SEO",
		subtitle: "SEO plugin",
		logoPath: Astra_Admin_Icons["yoast-seo"],
		status: "install",
	},
	{
		title: "Elementor",
		subtitle: "Page builder",
		logoPath: Astra_Admin_Icons["elementor"],
		status: "installed",
	},
	{
		title: "WooCommerce",
		subtitle: "eCommerce plugin",
		logoPath: Astra_Admin_Icons["woocommerce"],
		status: "activated",
	},
	{
		title: "WPForms Lite",
		subtitle: "Form builder",
		logoPath: Astra_Admin_Icons["wp-forms"],
		status: "install",
	},
];

const AstraIntegration = () => {
	const AllAstraIntegration = [
		{
			title: "Spectra",
			subtitle:
				"Ut at id ac mauris, malesuada ut aliquet amet pellentesque.",
			logoPath: Astra_Admin_Icons["spectra"],
			status: "activated",
			isPro: false,
		},
		{
			title: "WooCommerce",
			subtitle:
				"Ut at id ac mauris, malesuada ut aliquet amet pellentesque.",
			logoPath: Astra_Admin_Icons["woocommerce"],
			status: "activated",
			isPro: false,
		},
		{
			title: "CartFlows",
			subtitle:
				"Ut at id ac mauris, malesuada ut aliquet amet pellentesque.",
			logoPath: Astra_Admin_Icons["cart-flows"],
			status: "install",
			isPro: false,
		},
	];

	const renderBlockCards = AllAstraIntegration.map((plugin, index) => {
		return (
			<div
				key={index}
				className={classNames(
					plugin.isPro ? "bg-slate-50" : "bg-white",
					"box-border relative border rounded-md px-5 py-4 flex items-start gap-x-4 snap-start"
				)}
			>
				<div className="flex flex-col">
					<div className="flex justify-between">
						<div>{plugin.logoPath}</div>
						<div>
							{plugin.isPro ? (
								<span>Pro</span>
							) : (
								<span className="text-astra uppercase text-[0.625rem] leading-[0.625rem] font-semibold bg-blue-50 px-1 pt-0.5 pb-[0.1875rem] rounded-[0.1875rem]">
									Free
								</span>
							)}
						</div>
					</div>

					<div className="mt-2">
						<div className="text-base leading-[1.625rem] font-medium text-slate-800">
							{plugin.title}
						</div>
						<p className="text-sm leading-[1.375rem] text-slate-400 mt-[0.1875rem]">
							{plugin.subtitle}
						</p>
						<button className="mt-3 text-sm leading-[0.875rem] font-medium text-astra bg-slate-50 rounded-md py-[0.5625rem] px-[0.8125rem]">
							Install
						</button>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-3 gap-4 sm:grid-cols-3 pt-6">
			{renderBlockCards}
		</div>
	);
};

export default AstraIntegration;
