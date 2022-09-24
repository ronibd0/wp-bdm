/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since x.x.x
 */

function astra_dynamic_build_css( addon, control, css_property, selector, unitSupport = false ) {
	var tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544,
		unitSuffix = unitSupport || '';

	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			if ( value.desktop || value.mobile || value.tablet ) {
				// Remove <style> first!
				control = control.replace( '[', '-' );
				control = control.replace( ']', '' );
				jQuery( 'style#' + control + '-dynamic-preview-css' ).remove();

				var DeskVal = '',
					TabletFontVal = '',
					MobileVal = '';

				if ( '' != value.desktop ) {
					DeskVal = css_property + ': ' + value.desktop;
				}
				if ( '' != value.tablet ) {
					TabletFontVal = css_property + ': ' + value.tablet;
				}
				if ( '' != value.mobile ) {
					MobileVal = css_property + ': ' + value.mobile;
				}

				// Concat and append new <style>.
				jQuery( 'head' ).append(
					'<style id="' + control + '-dynamic-preview-css">'
					+ selector + ' { ' + DeskVal + unitSuffix + ' }'
					+ '@media (max-width: ' + tablet_break_point + 'px) {' + selector + ' { ' + TabletFontVal + unitSuffix + ' } }'
					+ '@media (max-width: ' + mobile_break_point + 'px) {' + selector + ' { ' + MobileVal + unitSuffix + ' } }'
					+ '</style>'
				);
			} else {
				jQuery( 'style#' + control + '-' + addon ).remove();
			}

		} );
	} );
}

function astra_refresh_customizer( control ) {
	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			wp.customize.preview.send( 'refresh' );
		} );
	} );
}

( function( $ ) {

	var postTypesCount = AstraPostStrcturesData.post_types.length || false,
		postTypes = AstraPostStrcturesData.post_types || [],
		tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544;

	// For single layouts.
	for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ],
			layoutType = ( undefined !== wp.customize( 'astra-settings[ast-dynamic-single-title-' + postType + '-layout]' ) ) ? wp.customize( 'astra-settings[ast-dynamic-single-title-' + postType + '-layout]' ).get() : 'both';

		if( 'layout-2' === layoutType ) {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"]';
		} else if( 'layout-1' === layoutType ) {
			var selector = 'header.entry-header';
		} else {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"], header.entry-header';
		}

		astra_dynamic_build_css(
			'ast-dynamic-single-title-' + postType + '-horizontal-alignment',
			'astra-settings[ast-dynamic-single-title-' + postType + '-horizontal-alignment]',
			'text-align',
			selector
		);

		astra_dynamic_build_css(
			'ast-dynamic-single-title-' + postType + '-banner-height',
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-height]',
			'min-height',
			selector,
			'px'
		);

		astra_dynamic_build_css(
			'ast-dynamic-single-title-' + postType + '-banner-height',
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-height]',
			'min-height',
			selector,
			'px'
		);

		astra_dynamic_build_css(
			'ast-dynamic-single-title-' + postType + '-banner-background',
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-background]',
			'background-color',
			selector
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-title-' + postType + '-featured-as-background]'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-featured-overlay]'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-single-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-elements-gap]',
			'margin-bottom',
			'header.entry-header > *:not(:last-child), .ast-single-entry-banner[data-post-type="' + postType + '"] > *:not(:last-child)',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-text-color]',
			'color',
			'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-title-color]',
			'color',
			'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-link-color]',
			'color',
			'.ast-single-entry-banner[data-post-type="' + postType + '"] a, header.entry-header a, .ast-single-entry-banner[data-post-type="' + postType + '"] a *, header.entry-header a *'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-title-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-single-entry-banner[data-post-type="' + postType + '"] a:hover, header.entry-header a:hover, .ast-single-entry-banner[data-post-type="' + postType + '"] a:hover *, header.entry-header a:hover *'
		);

		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-title-' + postType + '-banner-padding]','.ast-single-entry-banner[data-post-type="' + postType + '"]', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-title-' + postType + '-banner-margin]','.ast-single-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-title-font-family]', 'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-title-font-weight]', 'font-weight', 'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-title-' + postType + '-title-font-size]', 'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-title-line-height]', 'line-height', 'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-title-text-transform]', 'text-transform', 'header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-text-font-family]', 'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-text-font-weight]', 'font-weight', 'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-title-' + postType + '-text-font-size]', 'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-text-line-height]', 'line-height', 'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-text-transform]', 'text-transform', 'header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );

		// Banner - Meta.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-meta-font-family]', 'header.entry-header .entry-meta, header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-meta-font-weight]', 'font-weight', 'header.entry-header .entry-meta, header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-title-' + postType + '-meta-font-size]', 'header.entry-header .entry-meta, header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-meta-line-height]', 'line-height', 'header.entry-header .entry-meta, header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_css( 'astra-settings[ast-dynamic-single-title-' + postType + '-meta-text-transform]', 'text-transform', 'header.entry-header .entry-meta, header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
	}

	// For archive layouts.
	for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ];

		wp.customize( 'astra-settings[ast-dynamic-archive-title-' + postType + 'banner-width-type]', function( value ) {
			value.bind( function( type ) {
				if ( 'custom' === type ) {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'custom' );
					var customWidthSize = wp.customize( 'astra-settings[ast-dynamic-archive-title-' + postType + 'banner-custom-width]' ).get(),
						dynamicStyle = '';
						dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"] {';
						dynamicStyle += 'max-width: ' + customWidthSize + 'px;';
						dynamicStyle += '} ';
					astra_add_dynamic_css( 'ast-dynamic-archive-title-' + postType + '-banner-width-type', dynamicStyle );
				} else {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'full' );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-dynamic-archive-title-' + postType + '-horizontal-alignment]', function( value ) {
			value.bind( function( alignment ) {
				if( alignment.desktop != '' || alignment.tablet != '' || alignment.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['desktop'] + ';';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['tablet'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['mobile'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-dynamic-archive-title-' + postType + '-horizontal-alignment', dynamicStyle );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-height]', function( value ) {
			value.bind( function( size ) {

				if( size.desktop != '' || size.tablet != '' || size.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.desktop + 'px;';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.tablet + 'px;';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.mobile + 'px;';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-dynamic-archive-title-' + postType + '-banner-height', dynamicStyle );
				}
			} );
		} );

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-elements-gap]',
			'margin-bottom',
			'.ast-archive-description > *:not(:last-child), .ast-archive-entry-banner[data-post-type="' + postType + '"] > *:not(:last-child)',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-text-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-title-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] h1'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-link-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a:hover'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-padding]','.ast-archive-entry-banner[data-post-type="' + postType + '"]', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-title-' + postType + '-banner-margin]','.ast-archive-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-title-font-family]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-title-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-title-' + postType + '-title-font-size]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-title-line-height]', 'line-height', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-title-text-transform]', 'text-transform', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-text-font-family]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-text-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"] *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-title-' + postType + '-text-font-size]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-text-line-height]', 'line-height', '.ast-archive-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-archive-title-' + postType + '-text-transform]', 'text-transform', '.ast-archive-entry-banner[data-post-type="' + postType + '"] *' );
	}

} )( jQuery );
