import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type investorState = 0 | 1 | string
export type investmentState = 0 | 1 | 2 | 3 | string

export enum investorStatus { ACTIVE, BLOCKED }

export enum investmentStatus { ACTIVE, CLOSED, CANCELED, WAITING }

export interface IInvestor extends Document {
	username: string,
	fullName?: string,
	status: investorState,
	balance?: number,
	date?: Date,
	investments?: [{
		id: string,
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
	date: { type: Date, required: false },
	investments: [{
		id: String,
		date: Date,
		expires: Date,
		sum: Number,
		status: Number,
		node: String
	}]
}, { collection: 'investors' })

InvestorSchema.plugin(uniqueValidator)  // подключаем валидатор уникальности

export default mongoose.model<IInvestor>('Investor', InvestorSchema)