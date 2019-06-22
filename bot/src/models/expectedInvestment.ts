import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IExpectedInvestment extends Document {
	id: string,
	chatId: number
}

// Схема ожидаемой инвестиции
export const ExpectedInvestmentSchema: Schema = new Schema({
	id: { type: String, required: true, unique: true },
	chatId: { type: Number, required: true }
}, { collection: 'expectedInvestments' })

ExpectedInvestmentSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IExpectedInvestment>('ExpectedInvestment', ExpectedInvestmentSchema)