import { __ } from '@wordpress/i18n';
const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const QuickSettings = () => {

	const AllQuickLinks = [
		{
			name: __( 'Site Identity', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[control]=custom_logo',
			isPro: false,
		},
		{
			name: __( 'Color Options', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-colors-background',
			isPro: false,
		},
		{
			name: __( 'Typography', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-typography',
			isPro: false,
		},
		{
			name: __( 'Header Builder', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-header-builder-layout',
			isPro: false,
		},
		{
			name: __( 'Layout', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-container-layout',
			isPro: false,
		},
		{
			name: __( 'Button', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-buttons',
			isPro: false,
		},
		{
			name: __( 'Nav Menu', 'astra' ),
			section: astra_admin.admin_base_url + 'nav-menus.php',
			isPro: true,
		},
		{
			name: __( 'White Label', 'astra' ),
			section: astra_admin.admin_url + '?page=' + astra_admin.home_slug + '&path=settings',
			isPro: true,
		},
		{
			name: __( 'WooCommerce', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[panel]=woocommerce',
			isPro: true,
		},
		{
			name: __( 'Sticky Headers', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[section]=section-sticky-header',
			isPro: true,
		},
	];

	const renderBlockCards = AllQuickLinks.map( ( block, index ) => {
		return <div
			key={index}
			className={ classNames(
				block.isPro
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md h-20 p-4 flex items-center gap-x-4 snap-start hover:shadow-md transition spectra-icon-transition'
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
						'focus:text-slate-400 text-slate-400 text-base truncate leading-7 focus:text-spectra focus-visible:text-spectra-hover active:text-spectra-hover hover:text-spectra-hover'
					) }
					href={ block.section } rel="noreferrer">{__( 'Customize', 'astra' )}
				</a>
			</div>

			{
				block.isPro && <div className="relative inline-flex flex-shrink-0 py-0.5 px-1 text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
					{ __( 'PRO', 'astra' ) }
				</div>
			}
		</div>
	} );

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-2 gap-6 sm:grid-cols-2 pt-6">
			{ renderBlockCards }
		</div>
	);
};

export default QuickSettings;
