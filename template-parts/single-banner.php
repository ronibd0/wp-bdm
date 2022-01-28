<?php
/**
 * Template part for displaying single post's entry banner.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Astra
 * @since x.x.x
 */

global $post;
$post_type = $post->post_type;

// Conditionally updating data attr & class.
$attr = 'class="ast-single-entry-banner"';
if( is_customize_preview() ) {
	$attr = 'class="ast-single-entry-banner ast-post-banner-highlight site-header-focus-item" data-section="ast-single-' . esc_attr( $post_type ) . '"';
}

?>

<section <?php echo $attr; ?>>

	<?php
		if ( is_customize_preview() ) {
			Astra_Builder_UI_Controller::render_banner_customizer_edit_button();
		}
	?>

	<?php astra_banner_order_markup( astra_get_option( 'ast-single-' . $post_type . '-structure', array( 'ast-single-' . $post_type . '-title', 'ast-single-' . $post_type . '-breadcrumb' ) ) ); ?>

</section>
