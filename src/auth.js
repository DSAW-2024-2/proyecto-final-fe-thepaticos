import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { Auth } from './app/helpers/api/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
	},
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					let user = null;

					user = await Auth.signin(credentials.email, credentials.password);

					if (!user) {
						throw new Error('User not found');
					}

					return { token: user.token };
				} catch (error) {
					console.log(error);
				}
				//NEXTJS YA TIENE INTEGRADO EL MANEJO DE ERRORES
			},
		}),
	],
});
