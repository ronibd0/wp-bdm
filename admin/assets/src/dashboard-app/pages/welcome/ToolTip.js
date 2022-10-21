import React from "react";

const ToolTip = () => {
	return (
		<div className="absolute right-2.5 -top-5 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 ease-in-out">
			<div
				id="tooltip-top"
				role="tooltip"
				className="inline-block z-10 py-1 px-3 text-[0.75rem] leading-[0.75rem] text-white bg-slate-800 rounded-sm shadow-sm opacity-1 tooltip"
			>
				This option only available on Astra Pro
			</div>
			<div
				className="ml-auto w-2 h-2 flex -mt-1 rotate-45 bg-slate-800 mr-4 overflow-hidden"
			></div>
		</div>
	);
};

export default ToolTip;
