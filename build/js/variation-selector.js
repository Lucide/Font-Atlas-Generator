"use strict";
//https://www.npmjs.com/package/strip-variation-selectors
Object.defineProperty(exports, "__esModule", { value: true });
exports.textStyle = exports.removeAll = void 0;
function removeAll(s) {
    return s.replace(/([\u180B-\u180D\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])/g, "");
}
exports.removeAll = removeAll;
function textStyle(s) {
    return s.replace(/./gu, "$&\uFE0E");
}
exports.textStyle = textStyle;
