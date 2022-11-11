import { useState } from "react";
import { Link } from "react-router-dom";
import Astra_Admin_Icons from "@Common/block-icons";
import ReactHtmlParser from "react-html-parser";

const SubSection = ({ item }) => {
	const [sectionData, setSectionData] = useState(false);

	const subItems = astra_admin.astra_docs_data.docs.filter((doc) => {
		return doc.category.includes(item[0]);
	});

	const toggleSection = () => {
		setSectionData(!sectionData);
	};

	return (
		<div className="py-5 border-t border-slate-200">
			<button
				onClick={toggleSection}
				className="w-full flex justify-between items-center"
			>
				<div className="flex items-center">
					{Astra_Admin_Icons["bookmark"]}

					<h4 className="text-base font-medium leading-[1.625rem] text-slate-800 ml-2">
						{ReactHtmlParser(item[1].name)}
					</h4>
				</div>
				<div
					className={` ${
						sectionData ? "rotate-0" : "-rotate-90"
					} transition-rotate duration-300 ease-in-out`}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 9L12 16L5 9"
							stroke="#4B5563"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</button>
			{/* SUb Section Items */}
			{sectionData && (
				<div className="mt-5">
					<div className="space-y-1 mb-5">
						{/* Single Item */}
						{subItems.splice(0, 5).map((item, key) => (
							<div
								className="flex items-center justify-between text-slate-800 rounded-md p-2 pl-0 hover:bg-gray-50 group cursor-pointer"
								key={key}
							>
								<div className="flex items-center">
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8 6L14 10.03L8 14V6Z"
											fill="#9CA3AF"
										/>
									</svg>

									<div className="text-base leading-[1.625rem] text-slate-800 ml-2">
										{ReactHtmlParser(item.title)}
									</div>
								</div>
								<div className="text-slate-600 invisible group-hover:visible">
									{Astra_Admin_Icons["redirect"]}
								</div>
							</div>
						))}
					</div>

					<a
						href={`https://wpastra.com/docs-category/${item[0]}/`}
						target="_blank"
						className="text-base font-medium leading-4 text-astra flex items-center"
					>
						<span className="mr-2">
							View All {ReactHtmlParser(item[1].name)} Doc
						</span>
						{Astra_Admin_Icons["redirect"]}
					</a>
				</div>
			)}
		</div>
	);
};

export default SubSection;
