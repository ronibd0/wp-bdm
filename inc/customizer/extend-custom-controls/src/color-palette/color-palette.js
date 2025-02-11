import PropTypes from "prop-types";
import AstraColorPickerControl from "../common/astra-color-picker-control";
import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";

const ColorPaletteComponent = (props) => {
	const value = props.control.setting.get();
	const defaultValue = props.control.params.default;
	let labelHtml = null;
	const { label, name } = props.control.params;
	let UpdatePaletteEvent;

	const [state, setState] = value ? useState(value) : useState(defaultValue);

	useEffect(() => {
		// If settings are changed externally.
		if (state !== value) {
			setState(value);
		}
	}, [props]);

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	const handleChangeComplete = (colorIndex, color) => {
		let updateState = {
			...state,
		};

		let value;

		if (typeof color === "string") {
			value = color;
		} else if (
			undefined !== color.rgb &&
			undefined !== color.rgb.a &&
			1 !== color.rgb.a
		) {
			value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
		} else {
			value = color.hex;
		}

		updateState.palettes[updateState.currentPalette][colorIndex] = value;
		updateValues(updateState);
	};

	const updateValues = (stateObj) => {
		setState(stateObj);
		props.control.setting.set({
			...stateObj,
			flag: !props.control.setting.get().flag,
		});

		let globalPaletteControl = props.customizer.control(
			"astra-settings[global-color-palette]"
		);

		var globalPalette = globalPaletteControl.setting.get();

		globalPalette.palette = stateObj.palettes[stateObj.currentPalette];
		globalPaletteControl.setting.set({
			...globalPalette,
			flag: !globalPaletteControl.setting.get().flag,
		});
	};

	const onPaletteChange = (paletteKey) => {
		let updateState = {
			...state,
		};

		updateState.currentPalette = paletteKey;
		updateValues(updateState);
	};

	const handleColorReset = (index, color) => {
		let updateState = {
			...state,
		};

		const resetValue =
			defaultValue.palettes[updateState.currentPalette][index];

		updateState.palettes[updateState.currentPalette][index] = resetValue;
		updateValues(updateState);
	};

	var paletteColors = (
		<>
			<div className="ast-single-palette-wrap">
				{state.palettes[state.currentPalette].map((value, index) => {
					const paletteLables = astra.customizer.globalPaletteLabels;
					return (
							<div>
								<div className="ast-color-picker-wrap">
									<AstraColorPickerControl
										color={value ? value : ""}
										onChangeComplete={(color, backgroundType) =>
											handleChangeComplete(index, color)
										}
										backgroundType={"color"}
										allowGradient={false}
										allowImage={false}
										disablePalette={true}
										onColorResetClick={(
											color,
											backgroundType
										) => handleColorReset(index, color)}
									/>
								</div>
								<div className="ast-color-picker-custom-tooltip-wrapper">
									<span className="ast-color-picker-custom-tooltip" data-title={ paletteLables[index] }></span>
								</div>
							</div>
					);
				})}
			</div>
		</>
	);

	var paletteOptions = (
		<>
			{Object.keys(state.palettes).map((paletteKey, index) => {
				return (
					<div
						className={
							"ast-color-palette-wrap " +
							(paletteKey === state.currentPalette
								? "active"
								: "")
						}
						key={index}
					>
						<section onClick={() => onPaletteChange(paletteKey)}>
							{state.palettes[paletteKey].map((color, index) => {
								if( index < 4 ) {
									return (
										<div className="ast-single-color-container" style={{ backgroundColor: color }} key={index}></div>
									)
								} else {
									return ('')
								}
							})}
							<span className="ast-palette-label-wrap">
								{__("Style", "astra") + " " + (index + 1)}
							</span>
						</section>
					</div>
				);
			})}
		</>
	);

	const updatePaletteVariables = (e) => {
		clearTimeout(UpdatePaletteEvent);

		// Throttle events when user tries to drag inside color picker.
		UpdatePaletteEvent = setTimeout(function () {
			document.dispatchEvent(
				new CustomEvent("AstUpdatePaletteVariables", {})
			);
		}, 200);
	};

	document.addEventListener(
		"AstPaletteUpdated",
		updatePaletteVariables,
		false
	);

	return (
		<>
			<div className="ast-toggle-desc-wrap">
				<label className="customizer-text">{labelHtml}</label>
				<span className="ast-adv-toggle-icon dashicons" data-control={name}></span>

			</div>

			<div className="ast-color-palette-wrapper">{paletteColors}</div>

			<div className="ast-field-settings-wrap">
				<div className="ast-field-settings-modal">
					<div className="ast-color-palette-container">
						{paletteOptions}
					</div>
				</div>
			</div>
		</>
	);
};

ColorPaletteComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default ColorPaletteComponent;
