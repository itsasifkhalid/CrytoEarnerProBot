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
// Схема ожидаемой инвестиции
exports.ExpectedInvestmentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true }
}, { collection: 'expectedInvestments' });
exports.ExpectedInvestmentSchema.plugin(mongoose_unique_validator_1.default); // подключаем валидатор уникальности
exports.default = mongoose_1.default.model('ExpectedInvestment', exports.ExpectedInvestmentSchema);
//# sourceMappingURL=expectedInvestment.js.map