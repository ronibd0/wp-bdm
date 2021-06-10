import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "react";

const ButtonPresetsComponent = (props) => {
	const { title, options } = props.control.params;

	let value = props.control.setting.get();

	useEffect(() => {}, []);

	const onChangePreset = (presetKey) => {
		let borderRadius = options[presetKey]["border-radius"];
		let btnBackgroundColor = options[presetKey]["button-bg-color"];
		let btnColor = options[presetKey]["button-color"];
		let borderWidth = options[presetKey]["border-size"];
		let padding = options[presetKey]["button-padding"];

		/// Padding
		props.customizer
			.control("astra-settings[theme-button-padding]")
			.setting.set(padding);

		props.customizer.control("astra-settings[theme-button-padding]").renderContent();

		// Border Radius.
		props.customizer
			.control("astra-settings[button-radius]")
			.setting.set(borderRadius);
		props.customizer.control("astra-settings[button-radius]").renderContent();

		// Border size.
		props.customizer.control( "astra-settings[theme-button-border-group-border-size]" ).setting.set( borderWidth );
		props.customizer.control( "astra-settings[theme-button-border-group-border-size]").renderContent();

		let control = props.customizer.control("astra-settings[button-bg-color]");

		control.setting.set( btnBackgroundColor );

		props.customizer.control("astra-settings[theme-button-bg-color-group]").renderContent();

		props.customizer
			.control("astra-settings[button-color]")
			.setting.set(btnColor);

		props.customizer.control("astra-settings[theme-button-color-group]").renderContent();


	};

	const renderBtnPresetHtml = () => {
		let htmlContent = Object.entries(options).map(([key, value]) => {
			return (
				<div className="ast-btn-style-item">
					<img src={value['src']}
					onClick={() => onChangePreset(key)}
					></img>
				</div>
			);
		});

		return htmlContent;
	};

	return (
		<>
			<label>
				<span className="customize-control-title">{title}</span>
			</label>

			<div className="ast-btn-preset-wrap">{renderBtnPresetHtml()}</div>
		</>
	);
};

ButtonPresetsComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(ButtonPresetsComponent);
