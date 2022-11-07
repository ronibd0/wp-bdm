import { TextSkeleton } from '@Skeleton';

const SettingsContainerSkeleton = () => {

	return (
		<>
			<div className="lg:col-span-9 w-full mt-10 mb-8 font-semibold text-2xl px-12 border-l">
				<TextSkeleton fontSize="35px" width="225px" />
				<TextSkeleton width="80%" />
				<div className='h-8' />
				<TextSkeleton fontSize="35px" width="300px" />
				<TextSkeleton width="60%" />
				<div className='h-8' />
				<TextSkeleton fontSize="35px" width="210px" />
				<TextSkeleton width="65%" />
			</div>
		</>
	);
};

export default SettingsContainerSkeleton;
