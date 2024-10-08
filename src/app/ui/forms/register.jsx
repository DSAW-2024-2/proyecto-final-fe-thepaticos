'use client';
import React, { useState } from 'react';

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		correo: '',
		id: '',
		contacto: '',
	});

	const [errors, setErrors] = useState({
		nombre: '',
		apellido: '',
		correo: '',
		id: '',
		contacto: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = () => {
		let valid = true;
		let newErrors = {};

		Object.keys(formData).forEach((key) => {
			if (!formData[key]) {
				newErrors[key] = `el ${key} es obligatorio`;
				valid = false;
			}
		});

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log('Form submitted:', formData);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto mt-6 p-4 border rounded-lg'
		>
			{['nombre', 'apellido', 'correo', 'id', 'contacto'].map((field) => (
				<div key={field} className='mb-4'>
					<label
						htmlFor={field}
						className='block text-gray-700 mb-2 capitalize'
					>
						{field}
					</label>
					<input
						type='text'
						id={field}
						name={field}
						placeholder={`e.j: ${
							field === 'correo'
								? 'ejemplo@unisabana.edu.co'
								: field === 'contacto'
								? '312 456 7890'
								: ''
						}`}
						value={formData[field]}
						onChange={handleInputChange}
						className='w-full px-3 py-2 border rounded-lg'
					/>
					{errors[field] && (
						<p className='text-red-500 text-sm mt-1'>*{errors[field]}</p>
					)}
				</div>
			))}

			<button
				type='submit'
				className='w-full bg-green-600 text-white py-2 rounded-md font-semibold'
			>
				Registrarse
			</button>
		</form>
	);
}
