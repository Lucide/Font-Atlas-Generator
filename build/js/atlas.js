"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.setOptions = void 0;
const css_font_1 = require("css-font");
const variation_selector_1 = require("./variation-selector");
let gOptions;
let canvasCtx, cellCtx;
function setOptions(options) {
    gOptions = options;
    canvasCtx = options.context2D;
    cellCtx = document.createElement("canvas").getContext("2d");
}
exports.setOptions = setOptions;
function refresh(options) {
    if (options) {
        draw(options);
        drawGrid(options);
    }
    else {
        draw(gOptions);
        drawGrid(gOptions);
    }
}
exports.refresh = refresh;
function initContext(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
}
function draw(o) {
    canvasCtx.save();
    [canvasCtx.canvas.width, canvasCtx.canvas.height] = o.resolution;
    [cellCtx.canvas.width, cellCtx.canvas.height] = o.cell;
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, o.resolution[0], o.resolution[1]);
    if (o.clip) {
        drawClipped(o);
    }
    else {
        drawUnclipped(o);
    }
    canvasCtx.restore();
}
function drawClipped(o) {
    initContext(cellCtx);
    cellCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        canvasCtx.drawImage(cellCtx.canvas, x, y);
    }
}
function drawUnclipped(o) {
    initContext(canvasCtx);
    canvasCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        canvasCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
}
function drawGrid(o) {
    if (o.grid) {
        let pixelOffset = 0.5;
        canvasCtx.strokeStyle = "#7FFF00";
        canvasCtx.lineWidth = 1;
        for (let y = o.cell[1]; y < o.resolution[1]; y += o.cell[1]) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(pixelOffset, y + pixelOffset);
            canvasCtx.lineTo(o.resolution[0] + pixelOffset, y + pixelOffset);
            canvasCtx.stroke();
        }
        for (let x = o.cell[0]; x < o.resolution[0]; x += o.cell[0]) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(x + pixelOffset, pixelOffset);
            canvasCtx.lineTo(x + pixelOffset, o.resolution[1] + pixelOffset);
            canvasCtx.stroke();
        }
    }
}
