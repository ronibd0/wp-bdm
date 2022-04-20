import PropTypes from 'prop-types';
import {__} from '@wordpress/i18n';
import {useEffect, useState} from 'react';
import Select from 'react-select';

const FontVariantComponent = props => {

	const {
		description,
		label,
		variant,
	} = props.control.params;

	const [ propValue, setValue ] = useState( props.control.setting.get() || []);

	// If settings are changed externally.
	// useEffect( () => {
	// 	setValue(prevState => ({
	// 		...prevState,
	// 		value: props.control.setting.get()
	// 	}));
	// }, [props]);

	const variantValue = 'string' == typeof propValue ? propValue.split(',') : propValue;

	let setFont = wp.customize.control( variant ).setting.get();

	if ( 'inherit' === setFont || '' === setFont ) {
		return null;
	}

	let labelHtml = label ? <span>{label}</span> : '',
		descriptionHtml = description ? <span className="description customize-control-description">{description}</span> : null;

	const fontVariants = window.AstraBuilderCustomizerData.googleFonts;

	const prepareToSave = ( variants ) => {
		let fontVariantVal = Object.entries( variants ).map( ( [ key, name ] ) => {
			return [ name.value ];
		} );
		let stringFontVariant = fontVariantVal.join(",");
		props.control.setting.set(stringFontVariant);
	};

	const updateValues = (newVal) => {
		console.error( newVal );
		setValue(newVal);
		prepareToSave( newVal );
	};

	let fontName = setFont.split(','),
		fontFamily = fontName[0].replace(/['"]+/g, '');

	if ( ! fontVariants[fontFamily][0] ) {
		return null;
	}

	if ( fontVariants[fontFamily][0].length < 1 ) {
		return null;
	}

	const variants = [...fontVariants[fontFamily][0]];
	const variantLabels = window.AstraBuilderCustomizerData.variantLabels;
	const options = Object.entries( variants ).map( ( [ key, name ] ) => {
		return ( { label: variantLabels[ name ], value: name } );
	} );

	return <>
		<label className="customize-control-title">
			{labelHtml}
			{descriptionHtml}
		</label>
		<div className='ast-customizer-font-varient-wrap'>
			<Select
				value = {variantValue}
				options = { options }
				isMulti = { true }
				onChange = { ( value ) => updateValues( value )}
				className = "ast-variant-select"
			/>
		</div>
	</>;
};

FontVariantComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( FontVariantComponent );
