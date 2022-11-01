import { __ } from '@wordpress/i18n';
const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const QuickSettings = () => {

	const allQuickLinks = astra_admin.quick_settings;

	const onQuickSettingTrigger = ( sectionLink ) => {
		window.open(
			sectionLink,
			'_self'
		);
	};

	const renderQuickLinks = Object.entries( allQuickLinks ).map( ( [ index, block ] ) => {
		return <div
			key={index}
			data-redirection_link={block.quick_url}
			onClick={() =>
				onQuickSettingTrigger(
					block.quick_url
				)
			}
			className={ classNames(
				block.isPro
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md cursor-pointer h-20 px-4 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition spectra-icon-transition group'
			) }
		>
			<div className="uagb-admin-block-card__title flex-1 min-w-0">
				<div className="text-base font-medium text-slate-800 leading-7">
					{ block.title }
				</div>
				<a
					className={ classNames(
						block.isPro
						? 'pointer-events-none'
						: '',
						'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover group-hover:text-astra-hover'
					) }
					href={ block.quick_url } rel="noreferrer">{__( 'Customize', 'astra' )}
				</a>
			</div>

			<div className="relative inline-flex flex-shrink-0 py-0.5 px-1 text-[0.625rem] leading-[0.625rem] text-gray-50 rounded-[0.1875rem] group-hover:text-slate-300">
				<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.79815 1.63672H13.6976M13.6976 1.63672V11.5362M13.6976 1.63672L0.969727 14.3646" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>
		</div>
	} );

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-3 gap-6 sm:grid-cols-3 pt-6">
			{ renderQuickLinks }
		</div>
	);
};

export default QuickSettings;
