import { ChevronRight } from 'lucide-react';

export default function RouteLineItem({ items }) {
	return (
		<div className='max-w-md mx-auto bg-white shadow-lg rounded-lg'>
			<div className='px-4 py-5 sm:p-6'>
				<h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
					Paradas:
				</h3>
				<div className='overflow-y-auto my-4'>
					<ul role='list' className='-mb-8'>
						{items.map((item, itemIdx) => (
							<li key={itemIdx}>
								<div className='relative pb-8'>
									{itemIdx !== items.length - 1 ? (
										<span
											className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
											aria-hidden='true'
										/>
									) : null}
									<div className='relative flex space-x-3'>
										<div>
											<span className='h-8 w-8 rounded-full bg-[#028747] flex items-center justify-center ring-8 ring-white text-white'>
												{String.fromCharCode(65 + itemIdx)}
											</span>
										</div>
										<div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
											<div>
												<p className='mt-1 text-sm text-gray-600'>{item}</p>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
