"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var logger_1 = __importDefault(require("../init/logger"));
/**
 * Получает список пользователей
 * @async
 * @function getUsers
 * @returns { Promise<IUser[]> }
 */
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.find({})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUsers = getUsers;
/**
 * Получает список админов
 * @async
 * @function getAdmins
 * @returns { Promise<IUser[]> }
 */
function getAdmins() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.find({ isAdmin: true })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAdmins = getAdmins;
/**
 * Проверяет является ли пользователь админом
 * @async
 * @function isAdmin
 * @param chatId
 * @returns { Promise<Boolean> }
 */
function isAdmin(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.find({ chatId: chatId, isAdmin: true })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.length > 0 ? true : false];
            }
        });
    });
}
exports.isAdmin = isAdmin;
/**
 * Проводит глобальную рассылку
 * @async
 * @function sendGlobal
 * @param ctx
 * @returns { Promise<void> }
 */
function sendGlobal(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var users, _i, users_1, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.find({})];
                case 1:
                    users = _a.sent();
                    for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                        user = users_1[_i];
                        if (user.chatId != ctx.from.id) {
                            try {
                                ctx.telegram.sendCopy(user.chatId, ctx.message);
                            }
                            catch (err) {
                                throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443: " + err.message);
                            }
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendGlobal = sendGlobal;
/**
 * Добавляет нового админа
 * @async
 * @function addAdmin
 * @param chatId
 * @returns { Promise<void> }
 */
function addAdmin(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, user_1.default.findOne({ chatId: chatId })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user.set('isAdmin', true)
                        // Сохраняем его
                    ]; // делаем юзера админом
                case 2:
                    _a.sent(); // делаем юзера админом
                    // Сохраняем его
                    return [4 /*yield*/, user.save(function (err) {
                            if (!err)
                                logger_1.default.notify('Добавлен новый админ!');
                        })];
                case 3:
                    // Сохраняем его
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0430\u0434\u043C\u0438\u043D\u0430: " + err_1.message);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addAdmin = addAdmin;
/**
 * Отстраняет админа
 * @async
 * @function dismissAdmin
 * @param chatId
 * @returns { Promise<void> }
 */
function dismissAdmin(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_1.default.updateOne({ chatId: chatId }, { isAdmin: false })];
                case 1:
                    _a.sent();
                    logger_1.default.notify('Админ успешно отстранён!');
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0430\u0434\u043C\u0438\u043D\u0430: " + err_2.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.dismissAdmin = dismissAdmin;
//# sourceMappingURL=functions.js.map