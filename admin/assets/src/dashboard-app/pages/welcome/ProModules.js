import { __ } from '@wordpress/i18n';
import ToolTip from './ToolTip';
const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const ProModules = () => {

	const AllProModules = [
		{
			name: __( 'Colors & Background', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[control]=custom_logo',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Typography', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-colors-background',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Spacing', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-typography',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Blog Pro', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-header-builder-layout',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Nav Menu', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-container-layout',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Sticky Header', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-buttons',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Page Headers', 'astra' ),
			section: astra_admin.admin_base_url + 'nav-menus.php',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Custom Layouts', 'astra' ),
			section: astra_admin.admin_url + '?page=' + astra_admin.home_slug + '&path=settings',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'Site Layouts', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[panel]=woocommerce',
			isPro: true,
			type: 'Customize',
		},
		{
			name: __( 'WooCommerce', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
			type: 'Settings | Documentation',
		},
		{
			name: __( 'Easy Digital Download', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
			type: 'Settings | Documentation',
		},
		{
			name: __( 'LearnDash', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
			type: 'Settings | Documentation',
		},
		{
			name: __( 'LifterLMS', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
			type: 'Settings | Documentation',
		},
		{
			name: __( 'White Label', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
			type: 'Settings | Documentation',
		},
	];

	const renderBlockCards = AllProModules.map( ( block, index ) => {
		return <div
			key={index}
			className={ classNames(
				block.isPro
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md h-20 px-4 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition spectra-icon-transition group'
			) }
		>
			<div className="uagb-admin-block-card__title flex-1 min-w-0">
				<p className="text-base font-medium text-slate-800 leading-7">
					{ block.name }
				</p>
				<a
					className={ classNames(
						block.isPro
						? 'pointer-events-none'
						: '',
						'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
					) }
					href={ block.section } rel="noreferrer">{block.type}
				</a>
			</div>

			{
				block.isPro && <div className="relative inline-flex flex-shrink-0 py-0.5 px-1 text-[0.625rem] leading-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
					{ __( 'PRO', 'astra' ) }
				</div>
			}
			<ToolTip />
		</div>
	} );

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-2 gap-6 sm:grid-cols-2 pt-6">
			{ renderBlockCards }
		</div>
	);
};

export default ProModules;
