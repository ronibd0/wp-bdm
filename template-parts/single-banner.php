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
$post_id = $post->ID;

?>

<section class="ast-single-entry-banner ast-single-<?php echo esc_attr( $post_type ); ?>">

<?php astra_banner_order_markup( astra_get_option( 'single-' . $post_type . '-structure', array() ) ); ?>

</section>
