"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textStyle = exports.removeAll = void 0;
const variation_selector_1 = require("@regexp-extra/variation-selector");
function removeAll(s) {
    return s.replace(variation_selector_1.VARIATION_SELECTOR, "");
}
exports.removeAll = removeAll;
function textStyle(s) {
    return s.replace(/./g, "$&\uFE0E");
}
exports.textStyle = textStyle;
