import { getUserById } from '@/app/helpers/api/user';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PassengersCard({ passengersList }) {
	const [passengerData, setPassengerData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true); // Start loading

			const users = await Promise.all(
				passengersList.map(async (userId) => {
					try {
						return await getUserById(userId);
					} catch (error) {
						console.error('Error fetching user:', error);
						return null;
					}
				})
			);

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
		return (
			<div className='fixed inset-0 flex items-center justify-center z-50'>
				<div className='bg-white rounded-lg shadow-lg p-5 w-[300px] h-[350px]'>
					<div className='flex flex-col justify-center items-center gap-10 text-[#028747] font-bold text-lg'>
						Cargando Información ...
						<div className='w-[150px] h-[150px] border-[10px] border-t-[10px] border-t-[#028747] border-gray-200 rounded-full animate-spin'></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-2 bg-[#028747] bg-opacity-50 p-2 rounded-2xl'>
			{passengerData.length > 0 ? (
				passengerData.map((user, index) => (
					<div
						key={index}
						className='bg-white border-2 border-gray-400 font-semibold p-1 rounded-full flex items-center justify-center w-fit gap-1'
					>
						<Image
							src={user.photo || '/images/anonym.png'}
							alt='Picture of the author'
							width={40}
							height={40}
							priority
							className='rounded-full border-2 border-gray-400'
						/>
						<p className='w-auto m-1'>
							{user ? `${user.name} ${user.lastname}` : 'Error loading user'}
						</p>
					</div>
				))
			) : (
				<div className='bg-white border-2 border-gray-400 font-semibold p-2 rounded-full'>
					No se encuentran registrados pasajeros
				</div>
			)}
		</div>
	);
}
