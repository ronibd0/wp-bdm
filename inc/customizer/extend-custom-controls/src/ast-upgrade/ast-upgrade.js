import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';

const UpgradeComponent = props => {

	const {
		title,
		svg,
	} = props.control.params;

	const upgradeSvg = parse( svgIcons[svg] ),
		lockIcon = parse( svgIcons['upgradeLock'] );

	let htmlTitle = null;

	if ( title ) {
		htmlTitle = <span className="ast-upgrade-section-title">{title}</span>;
	}

	const renderUpgrdaeBtn = () => {
		return <a href={window.AstraBuilderCustomizerData.upgradeUrl} target='_blank' className="ast-upgrade-trigger">
			<span className='ast-upgrade-pro-innerwrap'>
				{upgradeSvg}
				<span className='ast-upgrade-cta'>
					{ lockIcon }
					{ htmlTitle }
				</span>
			</span>
		</a>;
	};

	return <>
		<div className="ast-upgrade-pro-wrap">
			{ renderUpgrdaeBtn() }
		</div>
	</>;
};

UpgradeComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( UpgradeComponent );
