import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const userRegSchema = z.object({
	plate: z
		.string()
		.length(6, 'Debe contener 6 caracteres')
		.regex(
			/^[A-Z]{3}\d{3}$/,
			'Debe tener 3 letras Mayúsculas seguidas de 3 números'
		)
		.trim(),
	brand: z
		.string()
		.min(1, 'Espacio requerido')
		.max(50, 'La marca no debe contener más de 50 caracteres')
		.regex(
			/^[a-zA-Z0-9\s-]+$/,
			'La marca solo debe contener letras, números, espacios o guiones'
		)
		.trim(),
	model: z
		.string()
		.min(1, 'Espacio requerido')
		.max(50, 'El modelo no debe contener más de 50 caracteres')
		.regex(
			/^[a-zA-Z0-9\s-]+$/,
			'El modelo solo debe contener letras, números, espacios o guiones'
		)
		.trim(),
	seats: z
		.string()
		.regex(/^[2-9]+$/, 'Debes ingresar un número entre 2 y 9')
		.min(2, 'Debe tener al menos 2 asientos')
		.max(15, 'La capacidad máxima permitida es 15'),

	SOAT: z
		.any()
		.refine(
			(fileList) =>
				!fileList || fileList.length === 0 || fileList[0].size <= 1048576,
			{
				message: 'El archivo no debe pesar más de 1MB',
			}
		)
		.refine(
			(fileList) =>
				!fileList ||
				fileList.length === 0 ||
				ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
			{
				message: 'El archivo debe ser una imagen (JPEG, PNG o GIF)',
			}
		),
	photo: z
		.any()
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
