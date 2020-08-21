import {stringify as stringifyCSSFont} from "css-font";
import type {IFont} from "css-font";
import {textStyle} from "./variation-selector";

export interface IOptions {
    context2D: CanvasRenderingContext2D;
    font: IFont;
    resolution: [number, number];
    cell: [number, number];
    offset: [number, number];
    charset: string;
    clip: boolean;
    grid: boolean;
}

let gOptions: IOptions;
let canvasCtx: CanvasRenderingContext2D,
    cellCtx: CanvasRenderingContext2D;

export function setOptions(options: IOptions) {
    gOptions = options;
    canvasCtx = options.context2D;
    cellCtx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
}

export function refresh(options?: IOptions) {
    if (options) {
        draw(options);
        drawGrid(options);
    } else {
        draw(gOptions);
        drawGrid(gOptions);
    }
}

function initContext(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
}

function draw(o: IOptions) {
    canvasCtx.save();
    [canvasCtx.canvas.width, canvasCtx.canvas.height] = o.resolution;
    [cellCtx.canvas.width, cellCtx.canvas.height] = o.cell;

    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, o.resolution[0], o.resolution[1]);

    if (o.clip) {
        drawClipped(o);
    } else {
        drawUnclipped(o);
    }
    canvasCtx.restore();
}

function drawClipped(o: IOptions) {
    initContext(cellCtx);
    cellCtx.font = stringifyCSSFont(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        canvasCtx.drawImage(cellCtx.canvas, x, y);
    }
}

function drawUnclipped(o: IOptions) {
    initContext(canvasCtx);
    canvasCtx.font = stringifyCSSFont(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        canvasCtx.fillText(textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
}

function drawGrid(o: IOptions) {
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