<?php

namespace Astra\E2E\Customizer_Settings;

function bootstrap() {
    add_action(
        'init',
        function () {
            if ( is_customize_preview() ) {
                add_action( 'wp_footer', __NAMESPACE__ . '\\dump_customizer_settings' );
            }
        }
    );
}

function dump_customizer_settings() {
    $customizer_settings = get_option( 'astra-settings', array() );

    echo '<pre>';
    echo wp_json_encode( $customizer_settings, JSON_PRETTY_PRINT );
    echo '</pre>';
}
