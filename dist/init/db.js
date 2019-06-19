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
var mongoose_1 = __importDefault(require("mongoose"));
var logger_js_1 = __importDefault(require("./logger.js"));
var config = require(path.join(process.cwd(), 'config', 'config.json'));
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.connect = function () {
        // Проверка окружения и смена url базы данных
        this.url = process.env.NODE_ENV === 'production' ? config.prod.dbUrl : config.dev.dbUrl;
        // Подключение к базе данных
        mongoose_1.default.connect(this.url, { useNewUrlParser: true, keepAlive: true, useCreateIndex: true }, function (err) {
            if (err) {
                logger_js_1.default.fatal("XXX \u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043A MongoDB! \u0422\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438: \n" + err.message);
                process.exit(1); // Выход из приложения
            }
            else {
                logger_js_1.default.trace('>>> База данных подключена');
            }
        });
    };
    return DB;
}());
exports.default = DB;
//# sourceMappingURL=db.js.map