"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.trace = function (data) {
        this.logger.log('trace', data);
    };
    Logger.debug = function (data) {
        this.logger.log('debug', data);
    };
    Logger.error = function (data) {
        this.logger.log('error', data);
    };
    Logger.warn = function (data) {
        this.logger.log('warn', data);
    };
    Logger.fatal = function (data) {
        this.logger.log('fatal', data);
    };
    Logger.notify = function (data) {
        this.logger.info(data);
    };
    Logger.logger = require('simple-node-logger').createSimpleLogger(path.join(process.cwd(), 'logs', 'logfile.log'));
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=logger.js.map