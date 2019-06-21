import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export enum investorStatus { ACTIVE, BLOCKED }
export enum investmentStatus { ACTIVE, CLOSED, CANCELED, WAITING }

export interface IInvestor extends Document {
	username: string,
	fullName?: string,
	status: number,
	balance?: number,
	investments?: [{
		date: Date,
		expires: Date,
		sum: number,
		status: number,
		node: string
	}]
}

// Схема инвестора
export const InvestorSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	fullName: { type: String, required: false },
	status: { type: Number, required: true },
	balance: { type: Number, required: false },
	investments: [{
		date: Date,
		expires: Date,
		sum: Number,
		status: Number,
		node: String
	}]
})

InvestorSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IInvestor>('Investor', InvestorSchema)