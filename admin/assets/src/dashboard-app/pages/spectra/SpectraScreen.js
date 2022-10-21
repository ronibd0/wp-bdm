import { __ } from "@wordpress/i18n";
import { useLocation } from "react-router-dom";
import Astra_Admin_Icons from "@Common/block-icons";

const spectraFeatures = [
	{
		title: __( 'Super Fast and Stable', 'astra' ),
		description:
			__( 'Spectra works with the native WordPress editor with no dependency on external code. So, it is fast and stable.', 'astra' ),
		icon: "",
	},
	{
		title: "Secure and Integrated",
		description:
			"Clean code written using the latest standards to maximize security and work flawlessly with any WordPress plugin.",
		icon: "",
	},
	{
		title: "Native WordPress Interface",
		description:
			"Spectra Integrates into the same WordPress editor, making it super intuitive website builder.",
		icon: "",
	},
	{
		title: "Google Will Love and Rank",
		description:
			"Score 100% in CWV. Clean code output and lightning-fast load times keep visitors and search engines happy.",
		icon: "",
	},
	{
		title: "Zero Bloat, No Dependencies",
		description:
			"Fewer external scripts and dependencies keep the code clean, resulting in small file sizes and faster loading times.",
		icon: "",
	},
	{
		title: "Just-in-time Compiler",
		description:
			"Loads assets dynamically on demand. Assets are loaded for only those blocks that are used on a page.",
		icon: "",
	},
];

const SpectraScreen = () => {
	const query = new URLSearchParams(useLocation()?.search);
	const allowAutoPlay =
		"1" === query.get("astra-activation-redirect") ? 1 : 0;

	const onGetSpectra = () => {
		window.open("http://wpspectra.com/", "_blank");
	};

	return (
		<main className="bg-white py-[2.43rem]">
			<div className="mx-auto px-6 max-w-[45rem]">
				<h1 className="sr-only"> Astra Free Vs Pro </h1>
				<div className="flex flex-col items-center">
					<h2 className="text-[2.5rem] text-slate-800 font-semibold capitalize mb-2">
						{__("Astra + Spectra = ♥", "astra")}
					</h2>
					<p className="text-base leading-[1.625rem] mb-7">
						Spectra is 100% beginner friendly and enhances the
						default WordPress block editor.
					</p>
					<button
						onClick={onGetSpectra}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-spectra focus-visible:bg-spectra-hover hover:bg-spectra-hover focus:outline-none"
					>
						<span className="mr-3">
							{__("Install Spectra - It’s free", "astra")}
						</span>

						{Astra_Admin_Icons["download"]}
					</button>
					<div className="relative pb-[25.375rem] mt-12 w-full">
						{/* Added rel=0 query paramter at the end to disable YouTube recommendations */}
						<iframe
							className="absolute inset-0 w-full h-full rounded-md"
							src={`https://www.youtube.com/embed/GLNzTxArR6Y?showinfo=0&autoplay=${allowAutoPlay}&mute=${allowAutoPlay}&rel=0`}
							allow="autoplay"
							title="YouTube video player"
							frameBorder="0"
							allowFullScreen
						></iframe>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-12 mt-16 px-8">
					{spectraFeatures.map((feature, key) => (
						<div key={key}>
							<div>Icon</div>
							<h4 className="text-base leading-[1.625rem] text-slate-800 font-medium mb-1">
								{feature.title}
							</h4>
							<p className="text-sm leading-[1.375rem] text-slate-600">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-center mt-20 mx-[4.5rem]">
					<h3 className="text-[2rem] leading-10 font-semibold text-slate-800 mb-6 text-center">
						{__(
							"Build Ultra High Performance Websites, Without Coding",
							"astra"
						)}
					</h3>
					<button
						onClick={onGetSpectra}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-spectra focus-visible:bg-spectra-hover hover:bg-spectra-hover focus:outline-none"
					>
						<span className="mr-3">
							{__("Install Spectra - It’s free", "astra")}
						</span>

						{Astra_Admin_Icons["download"]}
					</button>
				</div>
			</div>
		</main>
	);
};

export default SpectraScreen;
