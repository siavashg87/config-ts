"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = exports.unsetByDotNotation = exports.setByDotNotation = exports.getRoot = exports.getFromDotNotation = void 0;
var getFromDotNotation = function (keys, store) {
    if (!keys.length)
        throw new Error("Key is empty!");
    var key = keys.shift();
    return !keys.length || !store[key] ? store[key] : exports.getFromDotNotation(keys, store[key]);
};
exports.getFromDotNotation = getFromDotNotation;
var getRoot = function (keys, store) {
    if (!keys.length)
        throw new Error("Key is empty!");
    var lastProp = keys.pop();
    var root = keys.length ? exports.getFromDotNotation(keys, store) : store;
    if (exports.isUndefined(root))
        throw new Error("path \"" + __spreadArrays(keys, [lastProp]).join(".") + "\" cannot be set! Make sure upper levels are of type object. Settings object property without defining top level object will cause this error!");
    return { root: root, lastProp: lastProp };
};
exports.getRoot = getRoot;
var setByDotNotation = function (keys, value, store) {
    var _a = exports.getRoot(keys, store), root = _a.root, lastProp = _a.lastProp;
    root[lastProp] = value;
};
exports.setByDotNotation = setByDotNotation;
var unsetByDotNotation = function (keys, store) {
    var _a = exports.getRoot(keys, store), root = _a.root, lastProp = _a.lastProp;
    delete root[lastProp];
};
exports.unsetByDotNotation = unsetByDotNotation;
var isUndefined = function (value) { return typeof value === "undefined"; };
exports.isUndefined = isUndefined;
