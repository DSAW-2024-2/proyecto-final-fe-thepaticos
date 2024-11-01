import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const userRegSchema = z.object({
	name: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
		.trim(),
	lastname: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
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
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
		.trim()
		.optional(),
	lastname: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
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
		.regex(/^([A-Z]{3})(\d{3})$/, 'Debe contener 3 letras y 3 Numeros')
		.min(1, 'Este campo es obligatorio'),
	brand: z.string().min(1, 'Este campo es obligatorio'),
	model: z.string().min(1, 'Este campo es obligatorio'),
	seats: z
		.string()
		.min(1, 'Este campo es obligatorio')
		.regex(/^[1-6]$/)
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
export const rideSchema = z.object({
	origin: z.string(),
	destination: z.string(),
	route: z.array(z.string()),
	departure: z.string().datetime(),
	available_seats: z.coerce.number().min(1).max(6),
	fee: z.coerce.number().positive(),
});