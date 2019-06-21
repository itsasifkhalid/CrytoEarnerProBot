import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IUser extends Document {
    chatId: number
    username?: string
    name?: string
    isAdmin?: boolean
}

// Схема пользователя
export const UserSchema: Schema = new Schema({
    chatId: { type: Number, required: true, unique: true },
    username: { type: String, unique: true },
    name: { type: String },
    isAdmin: { type: Boolean }
}, { collection: 'users' })

UserSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IUser>('User', UserSchema)