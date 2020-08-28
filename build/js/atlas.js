"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.setOptions = void 0;
const css_font_1 = require("css-font");
const variation_selector_1 = require("./variation-selector");
let options;
let outputCtx, canvasCtx, cellCtx;
function setOptions(o) {
    options = o;
    outputCtx = options.context2D;
    canvasCtx = document.createElement("canvas").getContext("2d");
    cellCtx = document.createElement("canvas").getContext("2d");
}
exports.setOptions = setOptions;
function initText(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
}
function clear(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function refresh() {
    draw(options);
    drawGrid(options);
}
exports.refresh = refresh;
function draw(o) {
    [outputCtx.canvas.width, outputCtx.canvas.height] = [o.size[0], o.size[1]];
    [canvasCtx.canvas.width, canvasCtx.canvas.height] = [o.size[0] * o.scale, o.size[1] * o.scale];
    [cellCtx.canvas.width, cellCtx.canvas.height] = [o.cell[0] * o.scale, o.cell[1] * o.scale];
    canvasCtx.scale(o.scale, o.scale);
    cellCtx.scale(o.scale, o.scale);
    initText(canvasCtx);
    initText(cellCtx);
    if (o.clip) {
        drawClipped(o);
    }
    else {
        drawUnclipped(o);
    }
    outputCtx.save();
    clear(outputCtx);
    outputCtx.imageSmoothingEnabled = o.smooth;
    outputCtx.drawImage(canvasCtx.canvas, 0, 0, o.size[0], o.size[1]);
    outputCtx.restore();
}
function drawClipped(o) {
    cellCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        canvasCtx.drawImage(cellCtx.canvas, x, y, o.cell[0], o.cell[1]);
    }
}
function drawUnclipped(o) {
    canvasCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        canvasCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
}
function drawGrid(o) {
    outputCtx.save();
    if (o.grid) {
        let pixelOffset = 0.5;
        outputCtx.strokeStyle = "#7FFF00";
        outputCtx.lineWidth = 1;
        for (let y = o.cell[1]; y < o.size[1]; y += o.cell[1]) {
            outputCtx.beginPath();
            outputCtx.moveTo(pixelOffset, y + pixelOffset);
            outputCtx.lineTo(o.size[0] + pixelOffset, y + pixelOffset);
            outputCtx.stroke();
        }
        for (let x = o.cell[0]; x < o.size[0]; x += o.cell[0]) {
            outputCtx.beginPath();
            outputCtx.moveTo(x + pixelOffset, pixelOffset);
            outputCtx.lineTo(x + pixelOffset, o.size[1] + pixelOffset);
            outputCtx.stroke();
        }
    }
    outputCtx.restore();
}
