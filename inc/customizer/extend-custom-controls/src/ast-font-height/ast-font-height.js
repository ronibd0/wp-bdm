import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Fragment } from "@wordpress/element";

const FontHeightComponent = ( props ) => {
	const { title } = props.control.params;

	const [propsValue, setPropsValue] = useState(props.control.setting.get())

	useEffect(() => {
		console.log(props)
		console.log(props.control.setting.get())
	});

	const transformFont = (value) => {
		console.log(propsValue)
		setPropsValue(value);
		props.control.setting.set(value);
	}

	return (
		<Fragment>
			<div className="ast-font-styling">
				<div className="ast-font-height-wrapper">
					<div className="ast-font-height-input">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="2.6665" y="1.3335" width="10.6667" height="1.33333" fill="#9CA3AF"/>
							<rect x="2.6665" y="13.3335" width="10.6667" height="1.33333" fill="#9CA3AF"/>
							<path d="M4.6665 12H5.88003L6.56684 9.83784H9.438L10.1196 12H11.3332L8.62726 4H7.37758L4.6665 12ZM7.99209 5.32502H8.01275L9.123 8.83992H6.87668L7.99209 5.32502Z" fill="#9CA3AF"/>
						</svg>
						<input type="text" name="font-height" />
					</div>
					<div className="ast-font-unit-wrapper">
						<span>PX</span>
						<span>EM</span>
					</div>
				</div>
				<div className="ast-font-spacing-wrapper">
					<div className="ast-font-spacing-input">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="1.3335" y="2.6665" width="1.33333" height="10.6667" fill="#9CA3AF"/>
							<rect x="13.3335" y="2.6665" width="1.33333" height="10.6667" fill="#9CA3AF"/>
							<path d="M4.6665 12H5.88003L6.56684 9.83784H9.438L10.1196 12H11.3332L8.62726 4H7.37758L4.6665 12ZM7.99209 5.32502H8.01275L9.123 8.83992H6.87668L7.99209 5.32502Z" fill="#9CA3AF"/>
						</svg>
						<input type="text" name="font-height" />
					</div>
					<div className="ast-font-unit-wrapper">
						<span>PX</span>
						<span>%</span>
					</div>
				</div>
			</div>

			<div className="ast-font-styling-second">
				<div className="ast-font-transform-wrapper">
					<div
						className={`ast-font-item-type font-trans-lowercase ${propsValue['text-transform'] === 'lowercase' ? 'active' : ''} `}
						onClick={() => transformFont('lowercase')}
					>
						aa
					</div>
					<div className={`ast-font-item-type font-trans-capitalize ${propsValue['text-transform'] === 'capitalize' ? 'active' : ''} `}
						onClick={() => transformFont('capitalize')}>Aa</div>
					<div className={`ast-font-item-type font-trans-uppercase ${propsValue['text-transform'] === 'uppercase' ? 'active' : ''} `}
						onClick={() => transformFont('uppercase')}>AA</div>
				</div>
				<div className="ast-font-decoration-wrapper">
					<div className="ast-font-item-type ast-font-deco-default">Aa</div>
					<div className="ast-font-item-type ast-font-deco-underline">Aa</div>
					<div className="ast-font-item-type ast-font-deco-linethrough">AA</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(FontHeightComponent);
