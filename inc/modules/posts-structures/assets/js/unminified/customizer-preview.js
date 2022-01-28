/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since x.x.x
 */

 ( function( $ ) {

	var postTypesCount = AstraPostStrcturesData.post_types.length || false,
		postTypes = AstraPostStrcturesData.post_types || [],
		tablet_break_point    = astraBuilderPreview.tablet_break_point || 768,
		mobile_break_point    = astraBuilderPreview.mobile_break_point || 544;

    for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ];

		wp.customize( 'astra-settings[ast-single-' + postType + 'banner-width-type]', function( value ) {
			value.bind( function( type ) {
				console.error( type );
				if ( 'custom' === type ) {
					jQuery('.ast-entry-banner').attr( 'data-banner-width-type', 'custom' );
					var customWidthSize = wp.customize( 'astra-settings[ast-single-' + postType + 'banner-custom-width]' ).get(),
						dynamicStyle = '';
						dynamicStyle += '.ast-entry-banner[data-banner-width-type="custom"] {';
						dynamicStyle += 'max-width: ' + customWidthSize + 'px;';
						dynamicStyle += '} ';
					astra_add_dynamic_css( 'ast-single-' + postType + '-banner-width-type', dynamicStyle );
				} else {
					jQuery('.ast-entry-banner').attr( 'data-banner-width-type', 'full' );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-single-' + postType + '-horizontal-alignment]', function( value ) {
			value.bind( function( alignment ) {
				if( alignment.desktop != '' || alignment.tablet != '' || alignment.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += '.ast-entry-banner {';
					dynamicStyle += 'text-align: ' + alignment['desktop'] + ';';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += '.ast-entry-banner {';
					dynamicStyle += 'text-align: ' + alignment['tablet'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += '.ast-entry-banner {';
					dynamicStyle += 'text-align: ' + alignment['mobile'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-single-' + postType + '-horizontal-alignment', dynamicStyle );
				}
			} );
		} );

		astra_css(
			'astra-settings[ast-single-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-entry-banner'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-entry-banner[data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-text-color]',
			'color',
			'.ast-entry-banner'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-title-color]',
			'color',
			'.ast-entry-banner .entry-title'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-link-color]',
			'color',
			'.ast-entry-banner a'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-entry-banner a:hover'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-entry-banner[data-banner-background-type="custom"]', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-entry-banner[data-banner-background-type="custom"]', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-entry-banner[data-banner-background-type="custom"]', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-single-' + postType + '-banner-padding]','.ast-entry-banner', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-single-' + postType + '-banner-margin]','.ast-entry-banner', 'margin',  ['top', 'right', 'bottom', 'left' ] );
	}

} )( jQuery );
