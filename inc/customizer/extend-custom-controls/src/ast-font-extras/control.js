import FontHeightComponent from './ast-font-extras.js';

export const astFontExtrasControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(
			<FontHeightComponent control={control} />,
			control.container[0]
		);
	},
});
