"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = __importDefault(require("./init/bot"));
var db_1 = __importDefault(require("./init/db"));
var handlers_1 = __importDefault(require("./init/handlers"));
var middlewares_1 = __importDefault(require("./init/middlewares"));
var scenes_1 = __importDefault(require("./init/scenes"));
var bot = bot_1.default.configure(); // конфигурируем бот
middlewares_1.default.init(bot); // инициализируем прослойки
scenes_1.default.init(bot); // инициализируем сцены
handlers_1.default.init(bot); // инициализируем обработчики
db_1.default.connect(); // подключаемся к БД
//# sourceMappingURL=index.js.map