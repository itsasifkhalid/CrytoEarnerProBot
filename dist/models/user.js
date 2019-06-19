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
// Схема пользователя
exports.UserSchema = new mongoose_1.Schema({
    chatId: { type: Number, required: true, unique: true },
    username: { type: String, unique: true },
    name: { type: String },
    isAdmin: { type: Boolean }
}, { collection: 'users' });
exports.UserSchema.plugin(mongoose_unique_validator_1.default); // подключаем валидатор уникальности
exports.default = mongoose_1.default.model('User', exports.UserSchema);
