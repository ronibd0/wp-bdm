import React from "react";
import { __ } from "@wordpress/i18n";

const LicenseKey = () => {
	return (
		<section className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
			<div className="mr-16 w-full">
				<h3 className="p-0 text-xl leading-6 font-semibold text-slate-800">
					{__("License Key", "astra")}
				</h3>
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
					<label
						htmlFor="license-key"
						className="block mb-4 text-sm text-slate-500"
					>
						{__(
							"Please enter your license key below to activate Astra Pro!",
							"astra"
						)}
					</label>
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
			</div>
		</section>
	);
};

export default LicenseKey;
