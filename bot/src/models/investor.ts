import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type investorState = 0 | 1
export type investmentState = 0 | 1 | 2 | 3

export enum investorStatus { ACTIVE, BLOCKED }

export enum investmentStatus { ACTIVE, CLOSED, CANCELED, WAITING }

export interface IInvestor extends Document {
	username: string,
	fullName?: string,
	status: investorState,
	balance?: number,
	investments?: [{
		date: Date,
		expires: Date,
		sum: number,
		status: investmentState,
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
}, { collection: 'investors' })

InvestorSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IInvestor>('Investor', InvestorSchema)