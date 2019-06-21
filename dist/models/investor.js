"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var investorStatus;
(function (investorStatus) {
    investorStatus[investorStatus["ACTIVE"] = 0] = "ACTIVE";
    investorStatus[investorStatus["BLOCKED"] = 1] = "BLOCKED";
})(investorStatus = exports.investorStatus || (exports.investorStatus = {}));
var investmentStatus;
(function (investmentStatus) {
    investmentStatus[investmentStatus["ACTIVE"] = 0] = "ACTIVE";
    investmentStatus[investmentStatus["CLOSED"] = 1] = "CLOSED";
    investmentStatus[investmentStatus["CANCELED"] = 2] = "CANCELED";
    investmentStatus[investmentStatus["WAITING"] = 3] = "WAITING";
})(investmentStatus = exports.investmentStatus || (exports.investmentStatus = {}));
// Схема инвестора
exports.InvestorSchema = new mongoose_1.Schema({
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
}, { collection: 'investors' });
exports.InvestorSchema.plugin(mongoose_unique_validator_1.default); // подключаем валидатор уникальности
exports.default = mongoose_1.default.model('Investor', exports.InvestorSchema);
//# sourceMappingURL=investor.js.map