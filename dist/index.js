"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var fs = require("fs");
var Config = /** @class */ (function () {
    function Config(filePath, defaults) {
        if (filePath === void 0) { filePath = null; }
        if (defaults === void 0) { defaults = {}; }
        this.filePath = filePath;
        var fileValues = {};
        if (filePath) {
            try {
                fileValues = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
            }
            catch (e) {
                throw new Error("File does not exists, or failed reading json content of config file \"" + this.filePath + "\"");
            }
        }
        this.store = Object.assign(defaults, fileValues);
    }
    Config.prototype.has = function (key) {
        var value = helpers_1.getFromDotNotation(key.split("."), this.store);
        return !helpers_1.isUndefined(value);
    };
    Config.prototype.get = function (key, _default) {
        var value = helpers_1.getFromDotNotation(key.split("."), this.store);
        if (helpers_1.isUndefined(value) && !helpers_1.isUndefined(_default))
            value = _default;
        if (helpers_1.isUndefined(value))
            throw new Error("\"" + key + "\" not found, and no default value is assigned!");
        return value;
    };
    Config.prototype.is = function (key, value) {
        return this.get(key) === value;
    };
    Config.prototype.set = function (key, value) {
        helpers_1.setByDotNotation(key.split("."), value, this.store);
        return this;
    };
    Config.prototype.unset = function (key) {
        helpers_1.unsetByDotNotation(key.split("."), this.store);
        return this;
    };
    Config.prototype.getStore = function () {
        return this.store;
    };
    Config.prototype.size = function () {
        return Object.keys(this.store).length;
    };
    Config.prototype.clear = function () {
        this.store = {};
        return this;
    };
    Config.prototype.getFilePath = function () {
        return this.filePath;
    };
    Config.prototype.path = function () {
        this.checkFilePath();
        return this.filePath;
    };
    Config.prototype.save = function () {
        this.checkFilePath();
        fs.writeFileSync(this.filePath, JSON.stringify(this.store, null, 2));
        return this;
    };
    Config.prototype.checkFilePath = function () {
        if (!this.filePath)
            throw new Error("No config file path has been specified!");
    };
    return Config;
}());
exports.default = Config;
