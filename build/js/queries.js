"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.impreciseHighlight = exports.charset = exports.showGrid = exports.clipCells = exports.offsetY = exports.offsetX = exports.fontSize = exports.cellHeight = exports.cellWidth = exports.cellsColumn = exports.cellsRow = exports.bitmapHeight = exports.bitmapWidth = exports.fontFile = exports.fontName = exports.tabFontFile = exports.tabFontName = exports.complexInputs = exports.canvas = exports.body = void 0;
exports.body = document.querySelector("body");
//CANVAS
exports.canvas = document.querySelector("canvas");
//COMPLEX INPUTS HIGHLIGHTING
exports.complexInputs = document.querySelectorAll(".input-number, .input-textarea");
//INPUT
exports.tabFontName = document.querySelector("#tabFontName");
exports.tabFontFile = document.querySelector("#tabFontFile");
exports.fontName = document.querySelector("#fontName");
exports.fontFile = document.querySelector("#fontFile");
exports.bitmapWidth = document.querySelector("#bitmapWidth");
exports.bitmapHeight = document.querySelector("#bitmapHeight");
exports.cellsRow = document.querySelector("#cellsRow");
exports.cellsColumn = document.querySelector("#cellsColumn");
exports.cellWidth = document.querySelector("#cellWidth");
exports.cellHeight = document.querySelector("#cellHeight");
exports.fontSize = document.querySelector("#fontSize");
exports.offsetX = document.querySelector("#offsetX");
exports.offsetY = document.querySelector("#offsetY");
exports.clipCells = document.querySelector("#clipCells");
exports.showGrid = document.querySelector("#showGrid");
exports.charset = document.querySelector("#charset");
function numberContainer(complexInput) {
    return (complexInput.parentElement);
}
function impreciseHighlight(complexInput, remainder) {
    if (remainder) {
        numberContainer(complexInput).classList.add("input-imprecise");
    }
    else {
        numberContainer(complexInput).classList.remove("input-imprecise");
    }
}
exports.impreciseHighlight = impreciseHighlight;
