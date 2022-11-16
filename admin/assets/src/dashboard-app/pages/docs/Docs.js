import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import SubSection from "./SubSection";
import UpgradeToPro from "./UpgradeToPro";
import Astra_Admin_Icons from "@Common/block-icons";
import SearchResults from "./SearchResults";

const Docs = ({ setOpen }) => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	useEffect(() => {
		filterDocs();
	}, [searchKeyword]);

	function filterDocs() {
		if (searchKeyword === "") {
			setSearchResults(null);
		} else {
			const data = astra_admin.astra_docs_data.docs.filter((item) =>
				item.title.toLowerCase().includes(searchKeyword)
			);
			setSearchResults(data);
		}
	}

	function resetSearch() {
		setSearchKeyword('');
		setSearchResults(null);
	}

	return (
		<main className="bg-white">
			<div className="">
				<h1 className="sr-only">Welcome to KB Docs</h1>
				<div className="w-full flex justify-between items-center bg-gray-50 py-5 px-6">
					<a
						href={astra_admin.astra_base_url}
						className="flex-shrink-0 flex items-center ast-box-shadow-none"
					>
						<img
							className="lg:block h-[2.6rem] w-auto ast-box-shadow-none"
							src={astra_admin.logo_url}
							alt="Workflow"
						/>
					</a>
					<div className="max-w-5xl mx-auto w-full relative">
						<input
							type="text"
							placeholder="Search"
							className="w-full ast-docs-search-fields text-base"
							onChange={(e) => setSearchKeyword(e.target.value)}
						/>
						<div className="absolute top-1/2 -translate-y-1/2 left-4">
							{searchKeyword ? (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									onClick={ resetSearch }
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5 15L15 5M5 5L15 15"
										stroke="#9CA3AF"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
										stroke="#9CA3AF"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</div>
					</div>
					<div>
						<button onClick={() => setOpen(false)}>
							<svg
								width="44"
								height="44"
								viewBox="0 0 44 44"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16 28L28 16M16 16L28 28"
									stroke="#334155"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="sm:max-w-5xl mx-auto w-full flex flex-col">
					<div className="flex flex-col lg:flex-row gap-8 pt-10">
						<div className="w-full px-6 lg:px-0 lg:w-2/3 mb-5">
							{(searchResults && searchResults.length > 0) && (
								<div className="mb-8">
									<SearchResults data={searchResults} />
								</div>
							)}
							{/* Docs subsections */}
							{Object.entries(
								astra_admin.astra_docs_data.categories
							).map((item, key) => (
								<SubSection item={item} key={key} />
							))}
							{
								( ! astra_admin.pro_available && astra_admin.upgrade_notice	) &&
								<div className="mt-10">
									<UpgradeToPro />
								</div>
							}
						</div>
						<div className="w-full px-6 lg:px-0 lg:w-1/3">
							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Section title
								</h2>
								<div className="relative box-border border border-sky-500 rounded-md bg-white shadow-sm overflow-hidden transition hover:shadow-hover mb-5">
									<div className="p-6">
										<svg
											width="32"
											height="32"
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M27 16C27 22.0751 22.0751 27 16 27V29C23.1797 29 29 23.1797 29 16H27ZM16 27C9.92487 27 5 22.0751 5 16H3C3 23.1797 8.8203 29 16 29V27ZM5 16C5 9.92487 9.92487 5 16 5V3C8.8203 3 3 8.8203 3 16H5ZM16 5C22.0751 5 27 9.92487 27 16H29C29 8.8203 23.1797 3 16 3V5ZM20.3333 16C20.3333 18.3932 18.3932 20.3333 16 20.3333V22.3333C19.4978 22.3333 22.3333 19.4978 22.3333 16H20.3333ZM16 20.3333C13.6068 20.3333 11.6667 18.3932 11.6667 16H9.66667C9.66667 19.4978 12.5022 22.3333 16 22.3333V20.3333ZM11.6667 16C11.6667 13.6068 13.6068 11.6667 16 11.6667V9.66667C12.5022 9.66667 9.66667 12.5022 9.66667 16H11.6667ZM16 11.6667C18.3932 11.6667 20.3333 13.6068 20.3333 16H22.3333C22.3333 12.5022 19.4978 9.66667 16 9.66667V11.6667ZM23.7782 6.80761L19.0641 11.5217L20.4783 12.9359L25.1924 8.22183L23.7782 6.80761ZM19.0641 20.4783L23.7782 25.1924L25.1924 23.7782L20.4783 19.0641L19.0641 20.4783ZM12.9359 11.5217L8.22183 6.80761L6.80761 8.22183L11.5217 12.9359L12.9359 11.5217ZM11.5217 19.0641L6.80761 23.7782L8.22183 25.1924L12.9359 20.4783L11.5217 19.0641Z"
												fill="#4B5563"
											/>
										</svg>
										<div className="absolute leading-4 top-7 right-6 py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
											{__("PRO", "astra")}
										</div>

										<h3 className="relative flex items-center text-slate-800 text-base font-medium pb-2 mt-4">
											<span className="flex-1">
												{__(
													"Priority Support",
													"astra"
												)}
											</span>
										</h3>
										<p className="text-slate-500 text-sm pb-5 pr-12">
											{__(
												"We aim to answer all priority support requests within 2-3 hours.",
												"astra"
											)}
										</p>
										<a
											className="text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wpastra.com/support/"
											target="_blank"
											rel="noreferrer"
										>
											{__("Learn More →", "astra")}
										</a>
									</div>
								</div>
							</section>
							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Section title
								</h2>
								<div className="box-border rounded-md bg-white border border-slate-200 shadow-sm overflow-hidden transition hover:shadow-hover mb-5">
									<div className="p-6">
										<svg
											width="32"
											height="32"
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M16 8.33639V25.6697M16 8.33639C14.4428 7.30183 12.3287 6.66602 10 6.66602C7.67134 6.66602 5.55719 7.30183 4 8.33639V25.6697C5.55719 24.6352 7.67134 23.9993 10 23.9993C12.3287 23.9993 14.4428 24.6352 16 25.6697M16 8.33639C17.5572 7.30183 19.6713 6.66602 22 6.66602C24.3287 6.66602 26.4428 7.30183 28 8.33639V25.6697C26.4428 24.6352 24.3287 23.9993 22 23.9993C19.6713 23.9993 17.5572 24.6352 16 25.6697"
												stroke="#4B5563"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>

										<h3 className="text-slate-800 text-base font-medium pb-2 mt-4">
											{__("View Documentation", "astra")}
										</h3>
										<p className="text-slate-500 text-sm pb-5">
											{__(
												`Browse documentation, reference material, and tutorials for ${astra_admin.theme_name} Theme.`,
												"astra"
											)}
										</p>
										<a
											className="flex items-center text-sm text-astra focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover no-underline"
											href="https://wpastra.com/docs"
											target="_blank"
											rel="noreferrer"
										>
											<span className="mr-2">
												{__(
													"View All Documentation",
													"astra"
												)}
											</span>
											{Astra_Admin_Icons["redirect"]}
										</a>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Docs;
