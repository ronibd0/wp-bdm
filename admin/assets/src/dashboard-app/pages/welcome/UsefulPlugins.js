import React from "react";
import Astra_Admin_Icons from "@Common/block-icons";

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

const UsefulPlugins = () => {
	const handlePlugin = (value) => {
		console.log(value);
	};

	const getClass = (value) => {
		if (value === "activated") {
			return "text-[#4AB866]";
		} else if (value === "installed") {
			return "text-slate-400";
		} else {
			return "text-astra";
		}
	};
	return (
		<div className="">
			{usefulPlugins.map((plugin, key) => (
				<div
					className={`${plugin.status === 'activated' ? '' : 'cursor-pointer hover:bg-[#F8FAFC] hover:shadow-hover'} flex justify-between items-start p-4 border-t border-slate-200 bg-white transition `}
					key={key}
				>
					<div className="flex">
						<div>{plugin.logoPath}</div>
						<div className="ml-2.5">
							<div className="text-sm leading-[1.375rem] font-medium text-slate-800">
								{plugin.title}
							</div>
							<p className="text-sm leading-[1.375rem] text-slate-400">
								{plugin.subtitle}
							</p>
						</div>
					</div>
					<button
						className={` ${getClass(
							plugin.status
						)} p-0 m-0 capitalize text-sm leading-4 font-medium`}
					>
						{plugin.status}
					</button>
				</div>
			))}
		</div>
	);
};

export default UsefulPlugins;
