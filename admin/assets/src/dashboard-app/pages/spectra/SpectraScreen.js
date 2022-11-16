import { __ } from "@wordpress/i18n";
import { useLocation } from "react-router-dom";
import Astra_Admin_Icons from "@Common/block-icons";

const spectraFeatures = [
	{
		title: __( 'Super Fast and Stable', 'astra' ),
		description: __( 'Spectra works with the native WordPress editor with no dependency on external code. So, it is fast and stable.', 'astra' ),
		icon: "",
	},
	{
		title: __( 'Secure and Integrated', 'astra' ),
		description: __( 'Clean code written using the latest standards to maximize security and work flawlessly with any WordPress plugin.', 'astra' ),
		icon: "",
	},
	{
		title: __( 'Native WordPress Interface', 'astra' ),
		description: __( 'Spectra Integrates into the same WordPress editor, making it super intuitive website builder.', 'astra' ),
		icon: "",
	},
	{
		title: __( 'Google Will Love and Rank', 'astra' ),
		description: __( 'Score 100% in CWV. Clean code output and lightning-fast load times keep visitors and search engines happy.', 'astra' ),
		icon: "",
	},
	{
		title: __( 'Zero Bloat, No Dependencies', 'astra' ),
		description: __( 'Fewer external scripts and dependencies keep the code clean, resulting in small file sizes and faster loading times.', 'astra' ),
		icon: "",
	},
	{
		title: __( 'Just-in-time Compiler', 'astra' ),
		description: __( 'Loads assets dynamically on demand. Assets are loaded for only those blocks that are used on a page.', 'astra' ),
		icon: "",
	},
];

const SpectraScreen = () => {
	const query = new URLSearchParams(useLocation()?.search);
	const allowAutoPlay = "1" === query.get("astra-activation-redirect") ? 1 : 0;

	return (
		<main className="bg-white pb-14 pt-20">
			<div className="mx-auto px-6 max-w-[45rem]">
				<h1 className="sr-only"> Astra Free Vs Pro </h1>
				<div className="flex flex-col items-center">
					<div className="absolute top-0">
						<svg width="629" height="807" viewBox="0 0 629 807" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M155.35 384.598C22.04 384.731 -50.5339 218.96 41.6946 124.989L370.474 -210.002L405.115 4.20929L235.903 176.068C222.848 189.37 232.348 212.283 250.911 212.265L473.541 212.041C606.852 211.907 679.425 377.679 587.197 471.65L258.418 806.641L223.777 592.429L392.988 420.571C406.044 407.269 396.544 384.356 377.981 384.374L155.35 384.598Z" fill="url(#paint0_linear_3240_66110)" fillOpacity="0.48" />
							<defs>
								<linearGradient id="paint0_linear_3240_66110" x1="240.999" y1="-289" x2="252.522" y2="770.375" gradientUnits="userSpaceOnUse">
									<stop stopColor="#F4E3CC" />
									<stop offset="1" stopColor="#F4E3CC" stopOpacity="0"/>
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
				<div className="relative flex flex-col items-center">
					{Astra_Admin_Icons["spectra-logo"]}
					<h2 className="text-4xl sm:text-[2.5rem] text-slate-800 font-semibold capitalize mb-2 mt-7">
						{__(`${astra_admin.theme_name} + Spectra = ♥`, "astra")}
					</h2>
					<p className="text-base leading-[1.625rem] mb-7">
						{
							__( 'Spectra is 100% beginner friendly and enhances the default WordPress block editor.', 'astra' )
						}
					</p>
					<a href={`${astra_admin.admin_base_url}plugin-install.php?tab=plugin-information&plugin=ultimate-addons-for-gutenberg&TB_iframe=true&width=772&height=768`} className="plugin-detail thickbox open-plugin-details-modal inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white hover:text-white focus:text-white active:text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover focus:outline-none mr-4" target="_self" rel="noopener">
						<span className="mr-3">
							{__("Install Spectra - It’s free", "astra")}
						</span>
						{Astra_Admin_Icons["download"]}
					</a>
					<div className="relative pb-[25.375rem] mt-12 w-full">
						{/* Added rel=0 query parameter at the end to disable YouTube recommendations */}
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

				<div className="grid grid-cols-2 gap-12 mt-16 px-0 sm:px-8">
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

				<div className="flex flex-col items-center justify-center mt-20 mx-0 sm:mx-[4.5rem]">
					<h3 className="text-[2rem] leading-10 font-semibold text-slate-800 mb-6 text-center">
						{__(
							"Build Ultra High Performance Websites, Without Coding",
							"astra"
						)}
					</h3>
					<a href={`${astra_admin.admin_base_url}plugin-install.php?tab=plugin-information&plugin=ultimate-addons-for-gutenberg&TB_iframe=true&width=772&height=768`} className="plugin-detail thickbox open-plugin-details-modal inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra focus-visible:bg-astra-hover hover:bg-astra-hover hover:text-white focus:text-white active:text-white focus:outline-none mr-4" target="_self" rel="noopener">
						<span className="mr-3">
							{__("Install Spectra - It’s free", "astra")}
						</span>
						{Astra_Admin_Icons["download"]}
					</a>
				</div>
			</div>
		</main>
	);
};

export default SpectraScreen;
