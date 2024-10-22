'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function AsyncImageLoader({
	getImageUrl,
	alt,
	width,
	height,
	className = '',
}) {
	const [imageUrl, setImageUrl] = (useState < string) | (null > null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = (useState < string) | (null > null);

	useEffect(() => {
		const fetchImageUrl = async () => {
			try {
				const url = await getImageUrl();
				setImageUrl(url);
			} catch (err) {
				setError('Failed to load image');
				console.error('Error fetching image URL:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImageUrl();
	}, [getImageUrl]);

	if (error) {
		return <div className='text-red-500'>{error}</div>;
	}

	return (
		<div className={`relative ${className}`} style={{ width, height }}>
			{isLoading && (
				<div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
					<Loader2 className='h-8 w-8 animate-spin text-gray-500' />
				</div>
			)}
			{imageUrl && (
				<Image
					src={imageUrl}
					alt={alt}
					width={width}
					height={height}
					className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
					onLoadingComplete={() => setIsLoading(false)}
				/>
			)}
		</div>
	);
}


<AsyncImageLoader
	getImageUrl={vehicle?.photo}
	alt='Imagen carro'
	width={400}
	height={400}
	className='h-[60px] w-[60px] object-fill sm:w-[120px] sm:h-[120px] rounded-[5px] border-[2px] border-[#696C70]'
/>;