import {stringify as stringifyCSSFont} from "css-font";
import type {IFont} from "css-font";
import {textStyle} from "./variation-selector";

export interface IOptions {
    context2D: CanvasRenderingContext2D;
    font: IFont;
    size: [number, number];
    scale: number;
    smooth: boolean;
    cell: [number, number];
    offset: [number, number];
    charset: string;
    clip: boolean;
    grid: boolean;
}

let options: IOptions;
let outputCtx: CanvasRenderingContext2D,
    canvasCtx: CanvasRenderingContext2D,
    cellCtx: CanvasRenderingContext2D;

export function setOptions(o: IOptions) {
    options = o;
    outputCtx = options.context2D;
    canvasCtx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
    cellCtx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
}

function initText(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
}

function clear(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function refresh() {
    draw(options);
    drawGrid(options);
}

function draw(o: IOptions) {
    outputCtx.save();
    [outputCtx.canvas.width, outputCtx.canvas.height] = [o.size[0], o.size[1]];
    clear(outputCtx);
    outputCtx.imageSmoothingEnabled = o.smooth;
    if (o.clip) {
        drawClipped(o);
    } else {
        drawUnclipped(o);
    }
    outputCtx.restore();
}

function drawClipped(o: IOptions) {
    [cellCtx.canvas.width, cellCtx.canvas.height] = [o.cell[0] * o.scale, o.cell[1] * o.scale];
    cellCtx.scale(o.scale, o.scale);
    initText(cellCtx);
    cellCtx.font = stringifyCSSFont(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        outputCtx.drawImage(cellCtx.canvas, x, y, o.cell[0], o.cell[1]);
    }
}

function drawUnclipped(o: IOptions) {
    [canvasCtx.canvas.width, canvasCtx.canvas.height] = [o.size[0] * o.scale, o.size[1] * o.scale];
    canvasCtx.scale(o.scale, o.scale);
    initText(canvasCtx);
    canvasCtx.font = stringifyCSSFont(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        canvasCtx.fillText(textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
    outputCtx.drawImage(canvasCtx.canvas, 0, 0, o.size[0], o.size[1]);
}

function drawGrid(o: IOptions) {
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