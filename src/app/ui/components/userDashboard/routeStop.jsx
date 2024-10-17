export default function routeStop({ stops }) {
	const routeStops = [];
	for (let i = 0; i < stops.length; i++) {
		routeStops.push(
			<button
				key={i}
				className='bg-white rounded-full px-1 text-[12px] sm:text-lg font-semibold'
			>
				{stops[i]}
			</button>
		);
	}
	return <div className='flex flex-wrap gap-1'>{routeStops}</div>;
}
