import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IAdmin extends Document {
    username: string,
    password: string
}

// Схема админа
export const AdminSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
}, { collection: 'admins' })


AdminSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IAdmin>('Admin', AdminSchema)