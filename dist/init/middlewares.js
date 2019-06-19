"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chatLogging_1 = __importDefault(require("../middlewares/chatLogging"));
var addUsers_1 = __importDefault(require("../middlewares/addUsers"));
var logger_1 = __importDefault(require("./logger"));
var session = require('telegraf/session');
var Middlewares = /** @class */ (function () {
    function Middlewares() {
    }
    Middlewares.init = function (bot) {
        try {
            bot.use(addUsers_1.default); // прослойка добавления пользователя в базу
            bot.use(chatLogging_1.default); // прослойка логирования переписки
            bot.use(session()); // прослойка для использования сессий
            logger_1.default.trace('>>> Прослойки инициализированы');
        }
        catch (_a) {
            logger_1.default.trace('XXX Произошла ошибка при инициализации прослоек!');
            process.exit(1); // выход из приложения
        }
    };
    return Middlewares;
}());
exports.default = Middlewares;
