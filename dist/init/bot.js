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
var path = __importStar(require("path"));
var telegraf_1 = __importDefault(require("telegraf"));
var logger_1 = __importDefault(require("./logger"));
var config = require(path.join(process.cwd(), 'config', 'config.json'));
var Bot = /** @class */ (function () {
    function Bot() {
    }
    Bot.configure = function () {
        // Проверка окружения и смена токена
        this.token = process.env.NODE_ENV === 'production' ? config.prod.token : config.dev.token;
        var bot = new telegraf_1.default(this.token); // Создание обьекта
        bot.launch(); // Запуск
        logger_1.default.trace('>>> Бот сконфигурирован');
        return bot;
    };
    return Bot;
}());
exports.default = Bot;
