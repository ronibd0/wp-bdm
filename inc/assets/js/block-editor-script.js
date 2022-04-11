
window.addEventListener( 'load', function(e) {
	astra_onload_function();
});

function astra_onload_function() {

	/* Do things after DOM has fully loaded */

	var astraMetaBox = document.querySelector( '#astra_settings_meta_box' );
	if( astraMetaBox != null ){

			document.querySelector('#site-content-layout').addEventListener('change',function( event ) {

				var bodyClass = document.querySelector('body'),
					contentLayout = document.getElementById('site-content-layout').value;
				switch( contentLayout ) {
					case 'content-boxed-container':
						bodyClass.classList.add('ast-separate-container');
						bodyClass.classList.remove('ast-two-container' , 'ast-page-builder-template' , 'ast-plain-container');
					break;
					case 'boxed-container':
						bodyClass.classList.add('ast-separate-container' , 'ast-two-container');
						bodyClass.classList.remove('ast-page-builder-template' , 'ast-plain-container');
					break;
					case 'page-builder':
						bodyClass.classList.add('ast-page-builder-template');
						bodyClass.classList.remove('ast-two-container' , 'ast-plain-container' , 'ast-separate-container');
					break;
					case 'plain-container':
						bodyClass.classList.add('ast-plain-container');
						bodyClass.classList.remove('ast-two-container' , 'ast-page-builder-template' , 'ast-separate-container');
					break;
				}
			});

		var titleCheckbox = document.getElementById('site-post-title'),
			titleBlock = document.querySelector('.editor-post-title__block');

		if( null === titleCheckbox ) {
			titleCheckbox = document.querySelector('.site-post-title input');
		}

		titleCheckbox.addEventListener('change',function() {

			if( titleCheckbox.checked ){
				titleBlock.style.opacity = '0.2';
			} else {
				titleBlock.style.opacity = '1.0';
			}
		});
	}

	wp.data.subscribe(function () {
		setTimeout( function () {
			/**
			 * In WP-5.9 block editor comes up with color palette showing color-code canvas, but with theme var() CSS its appearing directly as it is. So updated them on wp.data event.
			 */
			const customColorPickerButtons = document.querySelectorAll( '.components-color-palette__custom-color' );

			for ( let btnCount = 0; btnCount < customColorPickerButtons.length; btnCount++ ) {
				const colorCode = customColorPickerButtons[btnCount].innerText;
				if ( colorCode.indexOf( 'var(--ast-global-color' ) > -1 ) {
					customColorPickerButtons[btnCount].innerHTML = '<span class="ast-theme-block-color-name">' + astraColors[ colorCode ] + '</span>';
				}
			}

			var spacerBlocks = document.querySelectorAll( '.wp-block.wp-block-spacer' );

			for ( var item = 0;  item < spacerBlocks.length; item++ ) {

				var block = spacerBlocks[item];

				let style = getComputedStyle(block),
					height = parseInt(style.height) || 0;

				block.querySelector( '.components-resizable-box__container' ).setAttribute( 'data-spaceheight', height + 'px' );
			}
		}, 1 );
	});
}

document.body.addEventListener('mousedown', function () {


	var blockCss = document.getElementById('astra-block-editor-styles-css');
	var inlineCss = document.getElementById('astra-block-editor-styles-inline-css');


	var blockFixCss = blockCss.cloneNode(true);
	var blockInlineCss = inlineCss.cloneNode(true);

	setTimeout( function() {

		let tabletPreview = document.getElementsByClassName('is-tablet-preview');
		let mobilePreview = document.getElementsByClassName('is-mobile-preview');

		if (0 !== tabletPreview.length || 0 !== mobilePreview.length) {
			var styleTagId = 'astra-block-editor-styles-inline-css';
			var styleTagBlockId = 'astra-block-editor-styles-css';
			let preview = tabletPreview[0] || mobilePreview[0];

				let iframe = preview.getElementsByTagName('iframe')[0];
				let iframeDocument = iframe.contentWindow.document || iframe.contentDocument;

				let element = iframeDocument.getElementById(
					styleTagId
				);
				let elementBlock = iframeDocument.getElementById(
					styleTagBlockId
				);
				if ( (null === element || undefined === element)&& (null === elementBlock || undefined === elementBlock )) {

						iframeDocument.head.appendChild( blockFixCss );
						iframeDocument.head.appendChild( blockInlineCss );
				}
		}
	}, 1000);

});