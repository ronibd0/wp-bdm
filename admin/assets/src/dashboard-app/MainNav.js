import { Disclosure } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import ChangeLogPopup from './ChangeLogPopup';

export default function MainNav() {
	const menus = wp.hooks.applyFilters( 'astra_dashboard.main_navigation', [
			{
				name: __( 'Welcome', 'astra' ),
				slug: astra_admin.home_slug,
				path: '',
			},
			{
				name: __( 'Settings', 'astra' ),
				slug: astra_admin.home_slug,
				path: 'settings',
			},
			{
				name: __( 'Starter Templates', 'astra' ),
				slug: astra_admin.home_slug,
				path: 'starter-templates',
			},
			{
				name: __( 'Free vs Pro', 'astra' ),
				slug: astra_admin.home_slug,
				path: 'free-vs-pro',
			},
		]
	);

	const query = new URLSearchParams( useLocation()?.search );
	const activePage = query.get( 'page' )
		? query.get( 'page' )
		: astra_admin.home_slug;
	const activePath = query.get( 'path' ) ? query.get( 'path' ) : '';

	if ( activePath === 'spectra' ) {
		return <></>;
	}
	return (
		<Disclosure as="nav" className="bg-white shadow">
			<div className="max-w-3xl mx-auto px-6 lg:max-w-full">
				<div className="relative flex justify-between h-16">
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<a href={astra_admin.astra_base_url} className="flex-shrink-0 flex items-center">
							<img
								className="lg:block h-[2.6rem] w-auto"
								src={ astra_admin.logo_url }
								alt="Workflow"
							/>
						</a>
						<div className="sm:ml-8 sm:flex sm:space-x-8">
							{ menus.map( ( menu, key ) => (
								<>
									{ menu.path === 'starter-templates' && astra_admin.starter_templates_data.is_available
										? ( <a index={ key } key={ `?page=${ menu.slug }&path=${ menu.path }` } href={ astra_admin.starter_templates_data.redirection_link } target="_self" className={ `${
											activePage === menu.slug && activePath === menu.path
												? 'border-astra text-astra active:text-astra focus:text-astra focus-visible:text-astra-hover hover:text-astra-hover inline-flex items-center px-1 border-b-2 text-sm leading-[0.875rem] font-medium'
												: 'border-transparent text-slate-500 active:text-astra focus-visible:border-slate-300 focus-visible:text-slate-800 hover:border-slate-300 hover:text-slate-800 inline-flex items-center px-1 border-b-2 text-sm leading-[0.875rem] font-medium'
										}` }>
											{ menu.name }
										</a> )
										: (
											<Link
												index={ key }
												key={ `?page=${ menu.slug }&path=${ menu.path }` }
												to={ {
													pathname: 'admin.php',
													search: `?page=${ menu.slug }${
														'' !== menu.path ? '&path=' + menu.path : ''
													}`,
												}
												}
												className={ `${
													activePage === menu.slug && activePath === menu.path
														? 'border-astra text-astra active:text-astra focus:text-astra focus-visible:text-astra-hover hover:text-astra-hover inline-flex items-center px-1 border-b-2 text-sm leading-[0.875rem] font-medium'
														: 'border-transparent text-slate-500 active:text-astra focus-visible:border-slate-300 focus-visible:text-slate-800 hover:border-slate-300 hover:text-slate-800 inline-flex items-center px-1 border-b-2 text-sm leading-[0.875rem] font-medium'
												}` }
											>
												{ menu.name }
											</Link>
										)
									}
								</>
							) ) }
						</div>
					</div>
					{
						astra_admin.show_self_branding &&
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<div className="text-sm font-medium leading-6 text-slate-600 mr-8">
								{ __( 'Knowledge base', 'astra' ) }
							</div>
							<div className="flex items-center text-sm font-medium leading-[1.375rem] text-slate-400 mr-8 divide-x divide-slate-200 gap-3">
								<div className="">
									{ astra_admin.version }
								</div>
								{ wp.hooks.applyFilters( 'astra_dashboard.after_navigation_version', <span/> ) }
							</div>
							<ChangeLogPopup />
						</div>
					}
					{
						! astra_admin.show_self_branding &&
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<div className="flex items-center text-sm font-medium leading-[1.375rem] text-slate-400 mr-8 divide-x divide-slate-200 gap-3">
								<div className="">
									{ astra_admin.version }
								</div>
								{ wp.hooks.applyFilters( 'astra_dashboard.after_navigation_version', <span/> ) }
							</div>
						</div>
					}
				</div>
			</div>
		</Disclosure>
	)
}
