'use client';
import { useAuth } from '@/app/contexts/sessionContext';
import { getVehicleRides } from '@/app/helpers/api/vehicles';
import RouteCard from '@/app/ui/components/driverDashboard/routeCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import Loader from '@/app/ui/modals/Loader';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getRides = async () => {
			try {
				if (user?.vehicle_plate) {
					const resRides = await getVehicleRides(user.vehicle_plate);
					setRides(resRides);
				}
			} catch (error) {
				Swal.fire({
					title: 'Error!',
					text: 'Error del servidor al cargar las rutas del vehiculo',
					icon: 'error',
				});
			} finally {
				setLoading(false);
			}
		};
		getRides();
	}, [user]);

	const reloadRides = async () => {
		setLoading(true);
		try {
			if (user?.vehicle_plate) {
				const resRides = await getVehicleRides(user.vehicle_plate);
				setRides(resRides);
			}
		} catch (error) {
			Swal.fire({
				title: 'Error!',
				text: 'Error del servidor al recargar las rutas',
				icon: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Loader message={'Cargando información'} />;
	}

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 flex justify-center'>
				<div
					className={`w-fit h-fit p-5 bg-[#D9D9D9] bg-opacity-50 rounded-lg shadow-gray-600 shadow-md overflow-auto
					${
						rides.length === 1
							? 'flex w-fit justify-center'
							: 'grid sm:grid-cols-2 md:grid-cols-2 gap-6'
					}`}
				>
					{rides.length === 0 ? (
						<p className='text-gray-500 text-lg col-span-2 font-semibold'>
							No tienes rutas publicadas.
						</p>
					) : (
						rides.map((ride, index) => {
							return (
								<RouteCard key={index} ride={ride} reloadRides={reloadRides} />
							);
						})
					)}
				</div>
			</section>
		</section>
	);
}
