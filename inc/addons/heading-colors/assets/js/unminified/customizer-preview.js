/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since 3.0.0
 */

( function( $ ) {

	var headingSelectors = 'h1, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6';

	if( astraHeadingColorOptions.maybeApplyHeadingColorForTitle ) {
		headingSelectors += ',.ast-archive-title, .entry-title a';
	}

	/**
	 * Content <h1> to <h6> headings
	 */
	astra_css( 'astra-settings[heading-base-color]', 'color', headingSelectors );


	function headingDynamicCss(slug, onlyLineHeight = false ) {
		let anchorSupport = '';
		let WidthTitleSupport = '';

		// Check if anchors should be loaded in the CSS for headings.
		if( astraCustomizer.includeAnchorsInHeadindsCss ) {
			anchorSupport = ',.entry-content ' + slug + ' a';
		}

		// Add widget title support to font-weight preview CSS.
		if( astraCustomizer.font_weights_widget_title_support ) {
			WidthTitleSupport = ',' + slug + '.widget-title';
		}

		if( ! onlyLineHeight ) {
			astra_generate_outside_font_family_css( 'astra-settings[font-family-'+ slug +']', slug + ', .entry-content ' + slug + anchorSupport );
			astra_generate_font_weight_css( 'astra-settings[font-family-'+ slug +']', 'astra-settings[font-weight-'+ slug +']', 'font-weight', slug + ', .entry-content ' + slug + anchorSupport + WidthTitleSupport );
		}

		wp.customize( 'astra-settings[font-extras-'+ slug +']', function( value ) {

			value.bind( function( data ) {
				let elementorSupport = '';
				let dynamicStyle;

				if ( astraCustomizer.page_builder_button_style_css ) {
					elementorSupport = ',.elementor-widget-heading '+ slug +'.elementor-heading-title';
				}
				
				if( onlyLineHeight ) {
					// Line Height
					const globalSelectorLineHeight = slug + ', .entry-content '+ slug + elementorSupport + anchorSupport;
					dynamicStyle += globalSelectorLineHeight + '{';
					dynamicStyle += 'line-height : ' + data['line-height'] + data['line-height-unit'] + ';}' ;
					astra_add_dynamic_css( 'font-extras-line-height'+ slug, dynamicStyle );

				}  else {

					const globalSelector = slug +', .entry-content ' + slug + anchorSupport;
					dynamicStyle = globalSelector + '{';
					dynamicStyle += 'letter-spacing : ' + data['letter-spacing'] + data['letter-spacing-unit'] + ";" ;
					dynamicStyle += 'text-decoration : ' + data['text-decoration'] + ";";
					dynamicStyle += 'text-transform : ' + data['text-transform']  + ';}' ;
					astra_add_dynamic_css( 'font-extras-'+ slug, dynamicStyle );
				}
	
			});
		});
	}

	// Page builder elementor CSS for line height.
	headingDynamicCss('h1', true);
	headingDynamicCss('h2', true);
	headingDynamicCss('h3', true);
	headingDynamicCss('h4', true);
	headingDynamicCss('h5', true);
	headingDynamicCss('h6', true);

	// Dynamic heading css 
	headingDynamicCss('h1', false);
	headingDynamicCss('h2', false);
	headingDynamicCss('h3', false);
	headingDynamicCss('h4', false);
	headingDynamicCss('h5', false);
	headingDynamicCss('h6', false);


	if ( astraCustomizer.page_builder_button_style_css ) {

		var ele_btn_font_family = '';
		var ele_btn_font_weight = '';
		var ele_btn_font_size = '';
		var ele_btn_transform = '';
		var ele_btn_line_height = '';
		var ele_btn_letter_spacing = '';

		if ( 'color-typo' == astraCustomizer.elementor_default_color_font_setting || 'typo' == astraCustomizer.elementor_default_color_font_setting ) {
			// Button Typo
			ele_btn_font_family = ',.elementor-button-wrapper .elementor-button, .elementor-button-wrapper .elementor-button:visited';
			ele_btn_font_weight = ',.elementor-button-wrapper .elementor-button, .elementor-button-wrapper .elementor-button:visited';
			ele_btn_font_size = ',.elementor-button-wrapper .elementor-button.elementor-size-sm, .elementor-button-wrapper .elementor-button.elementor-size-xs, .elementor-button-wrapper .elementor-button.elementor-size-md, .elementor-button-wrapper .elementor-button.elementor-size-lg, .elementor-button-wrapper .elementor-button.elementor-size-xl, .elementor-button-wrapper .elementor-button';
			ele_btn_transform = ',.elementor-button-wrapper .elementor-button, .elementor-button-wrapper .elementor-button:visited';
			ele_btn_line_height = ',.elementor-button-wrapper .elementor-button, .elementor-button-wrapper .elementor-button:visited';
			ele_btn_letter_spacing = ',.elementor-button-wrapper .elementor-button, .elementor-button-wrapper .elementor-button:visited', 'px';
		}

		// Button Typo
		astra_generate_outside_font_family_css( 'astra-settings[font-family-button]', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_font_family );
		astra_generate_font_weight_css( 'astra-settings[font-family-button]', 'astra-settings[font-weight-button]', 'font-weight', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_font_weight );
		astra_css( 'astra-settings[text-transform-button]', 'text-transform', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_transform );
		astra_responsive_font_size( 'astra-settings[font-size-button]', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_font_size );
		astra_css( 'astra-settings[theme-btn-line-height]', 'line-height', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_line_height );
		astra_css( 'astra-settings[theme-btn-letter-spacing]', 'letter-spacing', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], .wp-block-button .wp-block-button__link, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' + ele_btn_letter_spacing, 'px' );

	} else {
		// Button Typo
		astra_generate_outside_font_family_css( 'astra-settings[font-family-button]', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]' );
		astra_generate_font_weight_css( 'astra-settings[font-family-button]', 'astra-settings[font-weight-button]', 'font-weight', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]' );
		astra_css( 'astra-settings[text-transform-button]', 'text-transform', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]' );
		astra_responsive_font_size( 'astra-settings[font-size-button]', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]' );
		astra_css( 'astra-settings[theme-btn-line-height]', 'line-height', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]' );
		astra_css( 'astra-settings[theme-btn-letter-spacing]', 'letter-spacing', 'button, .ast-button, .ast-custom-button, input#submit, input[type="button"], input[type="submit"], input[type="reset"]', 'px' );
	}

} )( jQuery );
