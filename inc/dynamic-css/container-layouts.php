<?php
/**
 * Container Layout - Dynamic CSS
 *
 * @package astra
 * @since 3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Container Layout - Dynamic CSS.
 *
 * @since 3.3.0
 */
function astra_container_layout_css() {
	$container_layout = astra_get_content_layout();

	$page_container_css        = '';
	$customizer_default_update = astra_get_option( 'customizer-default-layout-update', true );
	$page_title_header_padding = ( true === $customizer_default_update ) ? '2em' : '4em';

	/** @psalm-suppress InvalidCast */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
	$tablet_breakpoint = (string) astra_get_tablet_breakpoint();
	/** @psalm-suppress InvalidCast */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

	if ( 'page-builder' === $container_layout ) {

		$page_container_css = '
        .ast-page-builder-template .hentry {
            margin: 0;
          }
          .ast-page-builder-template .site-content > .ast-container {
            max-width: 100%;
            padding: 0;
          }
          .ast-page-builder-template .site-content #primary {
            padding: 0;
            margin: 0;
          }
          .ast-page-builder-template .no-results {
            text-align: center;
            margin: 4em auto;
          }
          .ast-page-builder-template .ast-pagination {
            padding: 2em;
          }

          .ast-page-builder-template .entry-header.ast-no-title.ast-no-thumbnail {
            margin-top: 0;
          }
          .ast-page-builder-template .entry-header.ast-header-without-markup {
            margin-top: 0;
            margin-bottom: 0;
          }

          .ast-page-builder-template .entry-header.ast-no-title.ast-no-meta {
            margin-bottom: 0;
          }
          .ast-page-builder-template.single .post-navigation {
            padding-bottom: 2em;
          }
          .ast-page-builder-template.single-post .site-content > .ast-container {
            max-width: 100%;
          }';

		if ( true === $customizer_default_update ) {
			$page_container_css .= '
				.single.ast-page-builder-template .entry-header {
					margin-top: ' . esc_attr( $page_title_header_padding ) . ';
					margin-left: auto;
					margin-right: auto;
				}
				.ast-single-post.ast-page-builder-template .site-main > article {
					padding-left: 20px;
					padding-right: 20px;
				}
			';
		} else {
			$page_container_css .= '
				.single.ast-page-builder-template .entry-header {
					margin-top: ' . esc_attr( $page_title_header_padding ) . ';
					margin-left: auto;
					margin-right: auto;
					padding-left: 20px;
					padding-right: 20px;
				}
				.single.ast-page-builder-template .entry-header {
					padding-left: 20px;
					padding-right: 20px;
				}
			';
		}

		$page_container_css .= '
			.ast-page-builder-template .ast-archive-description {
				margin: ' . esc_attr( $page_title_header_padding ) . ' auto 0;
				padding-left: 20px;
				padding-right: 20px;
			}
		';

		if ( true === $customizer_default_update ) {
			$page_container_css .= '
				.ast-page-builder-template .ast-row {
					margin-left: 0;
					margin-right: 0;
				}
				.single.ast-page-builder-template .entry-header + .entry-content {
					margin-bottom: 2em;
				}
				@media(min-width: ' . $tablet_breakpoint . 'px) {
					.ast-page-builder-template.archive.ast-right-sidebar .ast-row article, .ast-page-builder-template.archive.ast-left-sidebar .ast-row article {
						padding-left: 0;
						padding-right: 0;
					}
				}
			';
		}

		/** @psalm-suppress InvalidScalarArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		if ( false === astra_get_option( 'improve-gb-editor-ui', true ) ) {
			/** @psalm-suppress InvalidScalarArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$page_container_css .= '.ast-page-builder-template.ast-no-sidebar .entry-content .alignwide {
                margin-left: 0;
                margin-right: 0;
            }';
		}

		return Astra_Enqueue_Scripts::trim_css( $page_container_css );
	}
	return $page_container_css;
}
