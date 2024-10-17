import BeatLoader from 'react-spinners/BeatLoader';
export default function Loader() {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-5'>
				<BeatLoader color='#7b2fb0' />
			</div>
		</div>
	);
}
