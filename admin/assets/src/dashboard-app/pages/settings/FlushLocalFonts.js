import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";

const FlushLocalFonts = () => {
	const dispatch = useDispatch();

	const enableLoadFontsLocally = useSelector(
		(state) => state.enableLoadFontsLocally
	);
	const enablePreloadLocalFonts = useSelector(
		(state) => state.enablePreloadLocalFonts
	);
	const enablePreloadLocalFontsStatus =
		"disabled" === enablePreloadLocalFonts ? false : true;

	return (
		<section
			className={`uag-font-select-${enableLoadFontsLocally} block border-b border-solid border-slate-200 px-12 py-8 justify-between`}
		>
			<div className="w-full flex justify-between">
				<div>
					<h3 className="p-0 text-xl leading-6 font-semibold text-slate-800">
						{__("Flush Local Fonts Cache", "astra")}
					</h3>
					<p className="mt-2 text-sm text-slate-600">
						Click the button to reset the local fonts cache.
					</p>
				</div>
				<div>
					<button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none">
						{__("Flush Local Font Files", "astra")}
					</button>
				</div>
			</div>
		</section>
	);
};

export default FlushLocalFonts;
