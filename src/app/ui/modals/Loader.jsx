export default function Loader() {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-5 w-[300px] h-[350px]'>
				<div className='flex flex-col justify-center items-center gap-10'>
					Cargando ...
					<div className='w-[150px] h-[150px] border-[10px] border-t-[10px] border-t-[#028747] border-gray-200 rounded-full animate-spin'></div>
				</div>
			</div>
		</div>
	);
}
