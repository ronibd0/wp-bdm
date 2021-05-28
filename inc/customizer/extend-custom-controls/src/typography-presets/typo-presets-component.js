import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import {useState, useEffect} from 'react';

const TypoPresetControl = props => {

	const {
		title,
		options
	} = props.control.params;

	const [props_value, setPropsValue] = useState(props.control.setting.get());

    useEffect(() => {

    }, []);

	const onPresetClick = (value) => {

		let bodyFontFamilyControl = props.customizer.control(
			"astra-settings[body-font-family]"
		);

		let headingFontFamilyControl = props.customizer.control(
			"astra-settings[headings-font-family]"
		);

		let bodyFontFamily     = options[value]['body-font-family'];
		let headingsFontFamily = options[value]['headings-font-family'];

		bodyFontFamilyControl.setting.set( bodyFontFamily );

		console.log( bodyFontFamilyControl );

		headingFontFamilyControl.setting.set( headingsFontFamily );

		setPropsValue( value );
		props.control.setting.set(value);

		var event = new CustomEvent('AstRemoteUpdateFonts', {
			'detail': 'typography'
		});
		document.dispatchEvent(event);
	};

	const List = ({ className, options, selected }) => {
		return (
			<ul className={`ast-font-selector ${className}`}>
				{
				   Object.entries(options).map(
					([key, item]) => {
						let bodyFont = item["body-font-family"] || '';
						let headingFont = item["headings-font-family"] || '';
						let preview = item["preview"] || '';
						return (
							<li
								className={
									"ast-typo-preset-item " +
									(props_value === key
										? "active"
										: "")
								}
								key={key}
								onClick={() => onPresetClick(key)}
							>
								{ '' !== preview
									?
									<img src={preview} />
									:
									<>
										{
											headingFont ? <Typography font={headingFont} large>{headingFont}</Typography> : ''}
										{bodyFont ? <Typography font={bodyFont}>{bodyFont}</Typography> : ''}
									</>
								}
							</li>
						)
					}
				)}
			</ul>
		)
	}

    return (
        <>
            <label>
				<span className="customize-control-title" >
				{title}</span>
			</label>

			<List className="ast-typo-presets" options={options} selected={props_value} />
        </>
    )
}

TypoPresetControl.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( TypoPresetControl );
