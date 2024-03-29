import dbConnect from '$lib/database/connectDB';
import message from '$lib/models/message';
import room from '$lib/models/room';

import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const GET: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	try {
		const token = cookies.get('token') as string;
		if (!token) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const { _id } = decodeJwt(token) as IUser;
		const { id } = params;
		await dbConnect();

		const fetchedRoom = await room
			.findOne({ _id: new mongoose.Types.ObjectId(id), members: _id })
			.populate({
				path: 'members', select: { _id: true, username: true, avatar: true }
			})
			.lean();

		const messages = await message
			.find({ room: new mongoose.Types.ObjectId(id) })
			.lean()
			.populate([{
				path: 'sender',
			}, {
				path: 'seenBy',
			}])

		if (!fetchedRoom) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}

		return json({ success: true, room: fetchedRoom, messages }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
