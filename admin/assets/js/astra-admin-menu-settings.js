/**
 * Astra admin settings.
 *
 * @since x.x.x
 */

(function($){

	AstraAdminDashboardApp = {

		init: function()
		{
			this._bind();
		},

		/**
		 * Binds events for the Astra Theme.
		 *
		 * @since x.x.x
		 * @access private
		 * @method _bind
		 */
		_bind: function()
		{
			$( document ).on('click' , '.astra-activate-recommended-plugin', AstraAdminDashboardApp._activatePlugin);
			$( document ).on('click' , '.astra-install-recommended-plugin', AstraAdminDashboardApp._installNow );

			$( document ).on('wp-plugin-installing'      , AstraAdminDashboardApp._pluginInstalling);
			$( document ).on('wp-plugin-install-success' , AstraAdminDashboardApp._activatePlugin);
			$( document ).on('wp-plugin-install-error'   , AstraAdminDashboardApp._installError);

			$( document ).on('click' , '.astra-deactivate-recommended-plugin', AstraAdminDashboardApp._deactivatePlugin);
			$( document ).on('click', '.ast-builder-migrate', AstraAdminDashboardApp._migrate );
			$( document ).on('click', '.ast-disable-notices', AstraAdminDashboardApp._disableNotices );
		},

		_disableNotices: function( e ) {

			e.stopPropagation();
			e.preventDefault();

			var $this = $( this );

			if ( $this.hasClass( 'updating-message' ) ) {
				return;
			}

			$this.addClass( 'updating-message' );

			var data = {
				action: 'ast-disable-pro-notices',
				value: $(this).attr( 'data-value' ),
				security: astra.notices_ajax_nonce,
			};

			if ( data.value == '1' ) {
				$this.text( astra.noticeEnablingText );
			} else {
				$this.text( astra.noticeDisablingText );
			}

			$.ajax({
				url: astra.ajaxUrl,
				type: 'POST',
				data: data,
				success: function( response ) {
					$this.removeClass( 'updating-message' );
					if ( response.success ) {
						if ( data.value == '1' ) {
							$this.text( astra.noticeDisableText );
						} else {
							$this.text( astra.noticeEnableText );
						}
						location.reload(true);
					}
				}
			})
		},

		_migrate: function( e ) {

			e.stopPropagation();
			e.preventDefault();

			var $this = $( this );

			if ( $this.hasClass( 'updating-message' ) ) {
				return;
			}

			$this.addClass( 'updating-message' );

			var data = {
				action: 'ast-migrate-to-builder',
				value: $(this).attr( 'data-value' ),
				nonce: astra.ajax_nonce,
			};

			$.ajax({
				url: astra.ajaxUrl,
				type: 'POST',
				data: data,
				success: function( response ) {
					$this.removeClass( 'updating-message' );
					if ( response.success ) {
						if ( data.value == '1' ) {
							// Change button classes & text.
							$this.text( astra.old_header_footer );
							$this.attr( 'data-value', '0' );
						} else {
							// Change button classes & text.
							$this.text( astra.migrate_to_builder );
							$this.attr( 'data-value', '1' );
						}
					}
				}
			})
		},

		/**
		 * Plugin Installation Error.
		 */
		_installError: function( event, response ) {

			var $card = jQuery( '.astra-install-recommended-plugin' );

			$card
				.removeClass( 'button-primary' )
				.addClass( 'disabled' )
				.html( wp.updates.l10n.installFailedShort );
		},

		/**
		 * Installing Plugin
		 */
		_pluginInstalling: function(event, args) {
			event.preventDefault();

			var slug = args.slug;

			var $card = jQuery( '.astra-install-recommended-plugin' );
			var activatingText = astra.plugin_activating_text;

			$card.each(function( index, element ) {
				element = jQuery( element );
				if ( element.data('slug') === slug ) {
					element.addClass('updating-message');
					element.html( activatingText );
				}
			});
		},

		/**
		 * Activate Success
		 */
		_activatePlugin: function( event, response ) {

			var $message = jQuery(event.target);
			var $init = $message.data('init');
			var activatedSlug = $init;

			if (typeof $init === 'undefined') {
				var $message = jQuery('.astra-install-recommended-plugin[data-slug=' + response.slug + ']');
				activatedSlug = response.slug;
			}

			// Transform the 'Install' button into an 'Activate' button.
			var $init = $message.data('init');
			var activatingText = astra.plugin_activating_text;
			var astraPluginRecommendedNonce = astra.pluginManagerNonce;

			$message.removeClass( 'install-now installed button-disabled updated-message' )
				.addClass('updating-message')
				.html( activatingText );

			// WordPress adds "Activate" button after waiting for 1000ms. So we will run our activation after that.
			$.ajax({
				url: astra.ajaxUrl,
				type: 'POST',
				data: {
					'action' : 'astra_recommended_plugin_activate',
					'nonce'  : astraPluginRecommendedNonce,
					'init'   : $init,
				},
				success: function( response ) {
					console.error( response );
				}
			})

			setTimeout( function() {


			}, 1200 );

		},

		/**
		 * Activate Success.
		 */
		_deactivatePlugin: function( event, response ) {

			event.preventDefault();

			var $message = jQuery(event.target);

			var $init = $message.data('init');

			if (typeof $init === 'undefined') {
				var $message = jQuery('.astra-install-recommended-plugin[data-slug=' + response.slug + ']');
			}

			// Transform the 'Install' button into an 'Activate' button.
			var $init = $message.data('init');
			var deactivatingText = $message.data('deactivating-text') || astra.recommendedPluiginDeactivatingText;
			var settingsLink = $message.data('settings-link');
			var activateText = astra.plugin_activate_text;
			var astraPluginRecommendedNonce = astra.pluginManagerNonce;

			$message.removeClass( 'install-now installed button-disabled updated-message' )
				.addClass('updating-message')
				.html( deactivatingText );

			// WordPress adds "Activate" button after waiting for 1000ms. So we will run our activation after that.
			setTimeout( function() {

				$.ajax({
					url: astra.ajaxUrl,
					type: 'POST',
					data: {
						'action'            : 'astra_recommended_plugin_deactivate',
						'nonce'             : astraPluginRecommendedNonce,
						'init'              : $init,
					},
				})
				.done(function (result) {

					if( result.success ) {
						var output = '<button class="astra-activate-recommended-plugin" data-init="'+ $init +'" data-settings-link="'+ settingsLink +'" data-settings-link-text="'+ activateText +'" aria-label="'+ activateText +'">'+ activateText +'</button>';
						$message.removeClass( 'astra-activate-recommended-plugin astra-install-recommended-plugin button button-primary install-now activate-now updating-message' );

						$message.parent('.ast-addon-link-wrapper').parent('.astra-recommended-plugin').removeClass('active');

						$message.parents('.ast-addon-link-wrapper').html( output );

					} else {

						$message.removeClass( 'updating-message' );

					}
				});

			}, 1200 );
		},

		/**
		 * Install Now.
		 */
		_installNow: function(event)
		{
			event.preventDefault();

			var $button 	= jQuery( event.target ),
				$document   = jQuery(document);

			if ( $button.hasClass( 'updating-message' ) || $button.hasClass( 'button-disabled' ) ) {
				return;
			}

			$button.html( astra.plugin_installing_text );

			if ( wp.updates.shouldRequestFilesystemCredentials && ! wp.updates.ajaxLocked ) {
				wp.updates.requestFilesystemCredentials( event );

				$document.on( 'credential-modal-cancel', function() {
					var $message = $( '.astra-install-recommended-plugin.updating-message' );

					$message
						.addClass('astra-activate-recommended-plugin')
						.removeClass( 'updating-message astra-install-recommended-plugin' )
						.text( wp.updates.l10n.installNow );

					wp.a11y.speak( wp.updates.l10n.updateCancel, 'polite' );
				} );
			}

			wp.updates.installPlugin( {
				slug:    $button.data( 'slug' )
			});
		},
	};

	/**
	 * Initialize AstraAdminDashboardApp.
	 */
	$(function(){
		AstraAdminDashboardApp.init();
	});

})(jQuery);
