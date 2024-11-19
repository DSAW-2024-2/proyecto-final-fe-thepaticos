'use client';
import { getAvaliableRides } from '@/app/helpers/api/ride';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);
	const searchParams = useSearchParams();
	const seats = searchParams.get('seats');
	const origin = searchParams.get('origin');
	const destination = searchParams.get('destination');
	const router = useRouter();
	const pathname = usePathname();
	const hasFilters = Boolean(seats || origin || destination);

	const handleResetFilters = () => {
		router.push(pathname);
	};

	useEffect(() => {
		const getRides = async () => {
			try {
				const queryParams = {
					origin: origin || '',
					destination: destination || '',
					seats: seats ? Number(seats) : 1,
				};

				const AvaliableRides = await getAvaliableRides(queryParams);
				setRides(AvaliableRides);
			} catch (error) {
				Swal.fire({
					title: 'Error!',
					text: 'Error del servidor al cargar los viajes disponibles',
					icon: 'error',
				});
			}
		};
		getRides();
	}, [searchParams, destination, origin, seats]);

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<div className='flex flex-wrap gap-2 justify-center items-center'>
				<FilterButton />
				<button
					onClick={handleResetFilters}
					className={`${
						hasFilters ? 'bg-[#028747]' : 'hidden'
					} hover:bg-[#d9534f] text-white rounded-full h-fit w-fit p-1 sm:p-2`}
				>
					{hasFilters ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='white'
								d='M14.73 20.83L17.58 18l-2.85-2.83l1.42-1.41L19 16.57l2.8-2.81l1.42 1.41L20.41 18l2.81 2.83l-1.42 1.41L19 19.4l-2.85 2.84zM13 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L7.29 16.7a.99.99 0 0 1-.29-.83v-5.12L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L13 10.75zM5.04 5L9 10.06v5.52l2 2v-7.53L14.96 5z'
							/>
						</svg>
					) : (
						<></>
					)}
				</button>
			</div>
			<div className='flex items-center justify-between w-auto gap-2'>
				{origin || destination || seats ? (
					<>
						<h2 className='text-lg font-bold'>Filtros Actuales:</h2>
						<div>
							{origin && (
								<span className='font-bold'>
									Origen: <span className='font-normal'>{origin}</span>
								</span>
							)}
						</div>
						<div>
							{destination && (
								<span className='font-bold'>
									Destino: <span className='font-normal'>{destination}</span>
								</span>
							)}
						</div>
						<div>
							{seats && (
								<span className='font-bold'>
									Cupos: <span className='font-normal'>{seats}</span>
								</span>
							)}
						</div>
					</>
				) : null}
			</div>
			<section className='w-full h-screen p-5 pt-0 flex justify-center'>
				<div className='flex flex-col bg-[#D9D9D9] justify-start items-start shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-[70%] overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg lg:grid lg:grid-cols-2 gap-2'>
					{rides &&
						rides.map((ride, index) => (
							<AvailableTripCard key={index} ride={ride} />
						))}
				</div>
			</section>
		</section>
	);
}
