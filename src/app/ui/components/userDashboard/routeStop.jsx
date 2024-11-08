export default function routeStop({ stops }) {
	const routeStops = [];
	for (let i = 0; i < stops.length; i++) {
		routeStops.push(
			<button
				key={i}
				className='bg-white rounded-full px-1 text-[12px] sm:text-lg font-semibold text-gray-800 
				hover:bg-gradient-to-r hover:from-[#028747] hover:to-[#025C31] hover:text-white 
				hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-default'
			>
				{stops[i]}
			</button>
		);
	}
	return <div className='flex flex-wrap gap-1'>{routeStops}</div>;
}
