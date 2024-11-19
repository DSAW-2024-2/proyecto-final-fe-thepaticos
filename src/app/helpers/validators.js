import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const userRegSchema = z.object({
	name: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
		.trim(),
	lastname: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
		.trim(),
	id: z
		.string()
		.length(6, 'Debe contener 6 numeros')
		.regex(/^\d{6}$/, 'Debe contener solo numeros'),
	email: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.email('Correo inválido')
		.regex(
			/@unisabana\.edu\.co$/,
			'Debe ser un correo institucional de la Universidad de la Sabana'
		),
	password: z
		.string()
		.min(6, 'Debe contener por lo menos 6 caracteres')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>-])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/,
			'Debe tener mayúsculas y minúsculas, un número y un carácter especial'
		),
	contact: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.regex(/^\d/, 'Debe contener solo numeros')
		.length(10, 'Debe tener 10 dígitos'),
	photo: z
		.any()
		.optional()
		.refine(
			(fileList) =>
				!fileList || fileList.length === 0 || fileList[0].size <= 2097152,
			{
				message: 'La foto no debe pesar más de 1MB',
			}
		)
		.refine(
			(fileList) =>
				!fileList ||
				fileList.length === 0 ||
				ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
			{
				message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
			}
		),
});
export const userModifySchema = z.object({
	name: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
		.trim()
		.optional(),
	lastname: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
		.trim()
		.optional(),
	contact: z
		.string()
		.regex(/^\d/, 'Debe contener solo numeros')
		.length(10, 'Debe tener 10 dígitos')
		.optional(),
	photo: z
		.any()
		.optional()
		.refine(
			(fileList) =>
				!fileList || fileList.length === 0 || fileList[0].size <= 2097152,
			{
				message: 'La foto no debe pesar más de 2MB',
			}
		)
		.refine(
			(fileList) =>
				!fileList ||
				fileList.length === 0 ||
				ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
			{
				message: 'La foto debe ser una imagen en formato (JPEG, PNG o GIF)',
			}
		),
});
export const vehicleSchema = z.object({
	plate: z
		.string()
		.regex(
			/^([A-Z]{3})(\d{3})$/,
			'Debe contener 3 letras mayúsculas y 3 Numeros'
		)
		.min(1, 'Este campo es obligatorio')
		.max(6, 'Solo debe tener 3 letras y 3 números'),
	brand: z.string().min(1, 'Este campo es obligatorio'),
	model: z.string().min(1, 'Este campo es obligatorio'),
	seats: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.regex(/^[2-6]$/, 'Debe transportar de 2 a 6 pasajeros')
		.transform((val) => Number(val)),
	soat: z
		.any()
		.refine(
			(fileList) =>
				!fileList || fileList.length === 0 || fileList[0].size <= 1048576,
			{
				message: 'La foto no debe pesar más de 1MB',
			}
		)
		.refine(
			(fileList) =>
				!fileList ||
				fileList.length === 0 ||
				ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
			{
				message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
			}
		),
	vehiclePhoto: z
		.any()
		.refine(
			(fileList) =>
				!fileList || fileList.length === 0 || fileList[0].size <= 1048576,
			{
				message: 'La foto no debe pesar más de 1MB',
			}
		)
		.refine(
			(fileList) =>
				!fileList ||
				fileList.length === 0 ||
				ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
			{
				message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
			}
		),
});

export const partialVehicleSchema = vehicleSchema
	.pick({
		brand: true,
		model: true,
		soat: true,
		vehiclePhoto: true,
	})
	.partial();

export const rideSchema = z.object({
	vehicle_plate: z.string().min(1, 'La placa del vehículo es obligatoria'),
	available_seats: z.coerce
		.number('Los asientos disponibles deben ser un número')
		.min(1, 'La cantidad mínima de asientos disponibles es 1'),

	departure: z.coerce.date('La fecha no es válida').refine(
		(date) => {
			const allowedTime = new Date();
			allowedTime.setHours(allowedTime.getHours() + 1);
			allowedTime.setSeconds(0);
			allowedTime.setMinutes(allowedTime.getMinutes() - 2);
			return date.getTime() >= allowedTime.getTime();
		},
		{ message: 'La reserva debe ser al menos una hora adelante' }
	),

	destination: z
		.string()
		.min(1, 'El destino es obligatorio y debe tener al menos un carácter'),

	fee: z.coerce
		.number({ message: 'La tarifa debe ser un número' })
		.positive({ message: 'La tarifa debe ser un valor positivo' }),

	origin: z
		.string()
		.min(1, 'El origen es obligatorio y debe tener al menos un carácter'),

	route: z.array(z.string()).min(2, 'La ruta debe tener al menos dos paradas'),
});

export const partialRideSchema = rideSchema.pick({
	vehicle_plate: true,
	available_seats: true,
	departure: false,
	destination: true,
	fee: true,
	origin: true,
	route: true,
});
