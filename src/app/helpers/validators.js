import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const userRegSchema = z.object({
	name: z
		.string()
		.min(1, 'Espacio requerido')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
		.trim(),
	lastname: z
		.string()
		.min(1, 'Espacio requerido')
		.max(50, 'No debe contener más de 50 caracteres')
		.regex(/^[a-zA-Z]+$/, 'Debe contener solo letras')
		.trim(),
	id: z
		.string()
		.length(6, 'Debe contener 6 numeros')
		.regex(/^\d{6}$/, 'Debe contener solo numeros'),
	email: z
		.string()
		.email()
		.regex(
			/@unisabana\.edu\.co$/,
			'Debe ser un correo institucional de la Universidad de la Sabana'
		),
	password: z
		.string()
		.min(6, 'Debe contener por lo menos 6 caracteres')
		.max(50, 'No debe contener más de 50 caracteres'),
	contact: z
		.string()
		.regex(/^\d/, 'Debe contener solo numeros')
		.length(10, 'Debe tener 10 dígitos'),
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
