import dbConnect from '$lib/database/connectDB';
import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (!token) {
		return await resolve(event);
	}
	try {
		await dbConnect();
		const loggedInUser = decodeJwt(token) as IUser;
		console.log(loggedInUser);

		event.locals.user = loggedInUser;
	} catch (err) {
		console.error(err);
	}

	return await resolve(event);
};
