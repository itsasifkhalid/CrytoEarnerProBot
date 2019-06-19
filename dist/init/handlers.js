"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
var start_1 = __importDefault(require("../handlers/start"));
var admin_1 = __importDefault(require("../handlers/admin"));
var callbackQuery_1 = __importDefault(require("../handlers/callbackQuery"));
var Handlers = /** @class */ (function () {
    function Handlers() {
    }
    Handlers.init = function (bot) {
        try {
            start_1.default.init(bot); // Обработчик для /start
            admin_1.default.init(bot); // Обработчик для /admin
            callbackQuery_1.default.init(bot); // Обработчик для callback запросов
            logger_1.default.trace('>>> Обработчики инициализированы');
        }
        catch (_a) {
            logger_1.default.trace('XXX Произошла ошибка при инициализации обработчиков!');
            process.exit(1); // выход из приложения
        }
    };
    return Handlers;
}());
exports.default = Handlers;
