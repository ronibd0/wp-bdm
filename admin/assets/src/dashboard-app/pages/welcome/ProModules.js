import { __ } from '@wordpress/i18n';
import ToolTip from './ToolTip';
const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );

const ProModules = () => {

	const AllProModules = [
		{
			name: __( 'Colors & Background', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-colors-background' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'Typography', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-typography' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'Spacing', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-container-layout' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'Blog Pro', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-blog' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'Nav Menu', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.admin_base_url + 'nav-menus.php' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
		},
		{
			name: __( 'Sticky Header', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-sticky-header' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'Page Headers', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.admin_base_url + 'nav-menus.php' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
		},
		{
			name: __( 'Custom Layouts', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.admin_url + '?page=' + astra_admin.home_slug + '&path=custom-layouts' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
		},
		{
			name: __( 'Site Layouts', 'astra' ),
			links: <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[panel]=woocommerce' } rel="noreferrer"> { __( 'Customize', 'astra' ) } </a>
		},
		{
			name: __( 'WooCommerce', 'astra' ),
			section: astra_admin.customize_url + '?autofocus[panel]=woocommerce',
			links: <span> <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[panel]=woocommerce' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
				<a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ 'https://wpastra.com/docs-category/astra-pro-modules/woo/' } rel="noreferrer"> | { __( 'Documentation', 'astra' ) } </a> </span>
		},
		{
			name: __( 'Easy Digital Downloads', 'astra' ),
			links: <span> <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-edd-group' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
				<a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ 'https://wpastra.com/docs-category/astra-pro-modules/easy-digital-downloads-module/' } rel="noreferrer"> | { __( 'Documentation', 'astra' ) } </a> </span>
		},
		{
			name: __( 'LearnDash', 'astra' ),
			links: <span> <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-learndash' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
				<a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ 'https://wpastra.com/docs-category/astra-pro-modules/learndash-astra-pro-modules/' } rel="noreferrer"> | { __( 'Documentation', 'astra' ) } </a>
				</span>
		},
		{
			name: __( 'LifterLMS', 'astra' ),
			links: <span> <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.customize_url + '?autofocus[section]=section-lifterlms' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
				<a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ 'https://wpastra.com/docs-category/astra-pro-modules/lifterlms-astra-pro/' } rel="noreferrer"> | { __( 'Documentation', 'astra' ) } </a> </span>
		},
		{
			name: __( 'White Label', 'astra' ),
			links: <span> <a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ astra_admin.admin_url + '?page=' + astra_admin.home_slug + '&path=settings&settings=white-label' } rel="noreferrer"> { __( 'Settings', 'astra' ) } </a>
				<a className={ classNames(
					! astra_admin.pro_available
					? 'pointer-events-none'
					: '',
					'focus:text-slate-300 text-slate-300 text-base truncate leading-7 focus:text-astra focus-visible:text-astra-hover active:text-astra-hover hover:text-astra-hover'
				) } href={ 'https://wpastra.com/docs-category/astra-pro-modules/white-label/' } rel="noreferrer"> | { __( 'Documentation', 'astra' ) } </a> </span>
		},
	];

	const renderBlockCards = AllProModules.map( ( block, index ) => {
		return <div
			key={index}
			className={ classNames(
				! astra_admin.pro_available
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md h-20 px-4 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition spectra-icon-transition group'
			) }
		>
			<div className="uagb-admin-block-card__title flex-1 min-w-0">
				<p className="text-base font-medium text-slate-800 leading-7">
					{ block.name }
				</p>
				{ block.links }
			</div>

			{
				! astra_admin.pro_available && <div className="relative inline-flex flex-shrink-0 py-0.5 px-1 text-[0.625rem] leading-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem]">
					{ __( 'PRO', 'astra' ) }
				</div>
			}
			{
				! astra_admin.pro_available && <ToolTip />
			}
		</div>
	} );

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-2 gap-6 sm:grid-cols-2 pt-6">
			{ renderBlockCards }
		</div>
	);
};

export default ProModules;
