import mongoose, { type ObjectId } from 'mongoose';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IMessage {
	_id: ObjectId;
	room: ObjectId;
	sender: ObjectId;
	body: string;
	type: string;
	createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
	{
		room: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		body: {
			type: String
		},
		type: {
			type: String,
			default: 'text'
		}
	},
	{ timestamps: true }
);

export default models.Message || model('Message', messageSchema);
