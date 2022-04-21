import PropTypes from 'prop-types';
import {__} from '@wordpress/i18n';
import {useState} from 'react';
import Select from 'react-select';

const FontVariantComponent = props => {

	const {
		description,
		label,
		name,
		variant,
	} = props.control.params;

	const [ propValue, setValue ] = useState( props.control.setting.get() || [] );
	const [ fontVal, setfontVal ] = useState( wp.customize.control( variant ).setting.get() || 'inherit');

	// If settings are changed externally.
	const getUpatedFontVariantOptions = () => {
		document.addEventListener( 'AstraGlobalFontChanged', function (e) {
			setValue( null );
			if(  'inherit' === e.detail.font ) {
				setfontVal( '' );
			} else {
				setfontVal( wp.customize.control( variant ).setting.get() );
			}
		});
	}

	getUpatedFontVariantOptions();

	const fontVariants = window.AstraBuilderCustomizerData.googleFonts;
	let fontName = fontVal.split(','),
		fontFamily = fontName[0].replace(/['"]+/g, '');

	if( undefined === fontVariants[fontFamily] ) {
		return null;
	}

	let labelHtml = label ? <span>{label}</span> : '',
		descriptionHtml = description ? <span className="description customize-control-description">{description}</span> : null;

	const prepareToSave = ( variants ) => {
		let fontVariantVal = Object.entries( variants ).map( ( [ key, name ] ) => {
			if( 'string' == typeof name ) {
				return name;
			} else {
				return name.value;
			}
		} );
		let unique = [...new Set(fontVariantVal)];
		let stringFontVariant = unique.join(",");
		setValue(stringFontVariant);
		props.control.setting.set(stringFontVariant);
	};

	const updateValues = (newVal) => {
		prepareToSave( newVal );
	};

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

	const variantValue = 'string' === typeof propValue ? propValue.split(',') : propValue;
	let selectedVariants = null;
	if( variantValue && variantValue.length ) {
		selectedVariants = Object.entries( variantValue ).map( ( [ key, name ] ) => {
			return ( { label: variantLabels[ name ], value: name } );
		} );
	}

	return <>
		<label className="customize-control-title">
			{labelHtml}
			{descriptionHtml}
		</label>
		<div className='ast-customizer-font-varient-wrap'>
			<Select
				name = { name }
				value = { selectedVariants }
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
