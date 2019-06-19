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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../init/logger"));
var functions_1 = require("../helpers/functions");
var admin_1 = __importDefault(require("../controllers/admin"));
// Немного модулей без типов ES5
var Markup = require('telegraf/markup');
var WizardScene = require('telegraf/scenes/wizard');
/**
 * Сцена добавления админов
 */
exports.default = new WizardScene('addAdmins', 
// Запрашиваем перечень chatId
function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var keyboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyboard = Markup.keyboard([
                    Markup.button('Назад')
                ]).oneTime().resize().extra();
                return [4 /*yield*/, ctx.replyWithMarkdown('Перешлите мне сообщение от будущего админа ⏩\n*Он должен быть пользователем бота!*', keyboard)];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.wizard.next()];
        }
    });
}); }, 
// Финальное действие
function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var adminId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ctx.message.text === 'Назад')) return [3 /*break*/, 2];
                return [4 /*yield*/, admin_1.default.send(ctx)];
            case 1:
                _a.sent();
                return [2 /*return*/, ctx.scene.leave()];
            case 2:
                _a.trys.push([2, 5, , 7]);
                adminId = ctx.message.forward_from.id;
                console.log(ctx);
                console.log(adminId);
                return [4 /*yield*/, functions_1.addAdmin(adminId)]; // добавляем админов
            case 3:
                _a.sent(); // добавляем админов
                return [4 /*yield*/, ctx.reply('Операция прошла успешно! 🎉', admin_1.default.keyboard)];
            case 4:
                _a.sent();
                logger_1.default.notify("\u041D\u043E\u0432\u044B\u0439 \u0430\u0434\u043C\u0438\u043D(" + adminId + ") \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D! \uD83C\uDF89 \u0410\u0434\u043C\u0438\u043D: @" + ctx.from.username);
                return [3 /*break*/, 7];
            case 5:
                err_1 = _a.sent();
                return [4 /*yield*/, ctx.reply('Не удалось добавить новых админов, приносим извинения.\nВозможно, Вы ввели некорректные данные', admin_1.default.keyboard)];
            case 6:
                _a.sent();
                logger_1.default.error(err_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, ctx.scene.leave()];
        }
    });
}); });
