import { getUserById } from '@/app/helpers/api/user';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '../../modals/Loader';
import Swal from 'sweetalert2';

export default function PassengersCard({ passengersList }) {
	const [passengerData, setPassengerData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true); // Start loading

			const users = [];
			for (const userId of passengersList) {
				try {
					const user = await getUserById(userId);
					users.push(user);
				} catch (error) {
					Swal.fire({
						title: 'Error!',
						text: 'Error del servidor al cargar el usuario (PassengerCard)',
						icon: 'error',
					});
					users.push(null);
				}
			}

			setPassengerData(users);
			setLoading(false);
		};

		if (passengersList.length > 0) {
			fetchUsers();
		} else {
			setLoading(false);
		}
	}, [passengersList]);

	if (loading) {
		return <Loader message={'Cargando información'} />;
	}

	return (
		<div className='flex flex-col gap-2 w-full bg-opacity-50 p-2 rounded-2xl'>
			{passengerData.length > 0 ? (
				passengerData.map((user, index) => (
					<div
						key={index}
						className='bg-white border-2 border-gray-400 font-semibold p-1 rounded-full flex items-center justify-start w-full gap-1'
					>
						<Image
							src={user.photo || '/images/anonym.png'}
							alt='Picture of the author'
							width={500}
							height={500}
							priority
							className='rounded-full border-2 border-gray-400 object-cover max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] sm:min-w-[50px] sm:max-w-[50px] sm:min-h-[50px] sm:max-h-[50px] cursor-pointer sm:border-2'
						/>
						<p className='w-auto m-1'>
							{user ? `${user.name} ${user.lastname}` : 'Error loading user'}
						</p>
					</div>
				))
			) : (
				<div className='bg-white border-2 border-gray-400 font-semibold p-2 rounded-full flex justify-center'>
					No tienes pasajeros
				</div>
			)}
		</div>
	);
}
