import {stringify as stringifyCSSFont} from "css-font";
import type {IFont} from "css-font";
import * as vs from "./variation-selector";

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
let ctx: CanvasRenderingContext2D,
    cellCtx: CanvasRenderingContext2D;

export function setOptions(options: IOptions) {
    gOptions = options;
    ctx = options.context2D;
    cellCtx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
}

export function refresh(options?: IOptions) {
    if (options) {
        atlas(options);
        drawGrid(options);
    } else {
        atlas(gOptions);
        drawGrid(gOptions);
    }
}

function atlas(o: IOptions) {
    [ctx.canvas.width, ctx.canvas.height] = o.resolution;
    [cellCtx.canvas.width, cellCtx.canvas.height] = o.cell;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, o.resolution[0], o.resolution[1]);

    ctx.font = stringifyCSSFont(o.font);
    cellCtx.font = ctx.font;
    ctx.textAlign = "center";
    cellCtx.textAlign = ctx.textAlign;
    ctx.textBaseline = "middle";
    cellCtx.textBaseline = ctx.textBaseline;
    ctx.fillStyle = "white";
    cellCtx.fillStyle = ctx.fillStyle;

    if (o.clip) {
        clipped(o);
    } else {
        unclipped(o);
    }
}

function clipped(o: IOptions) {
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(vs.textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        ctx.drawImage(cellCtx.canvas, x, y);
    }
}

function unclipped(o: IOptions) {
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.resolution[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.resolution[0]) {
            x = 0;
            y += o.cell[1];
        }
        ctx.fillText(vs.textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
}

function drawGrid(o: IOptions) {
    if (o.grid) {
        let pixelOffset = 0.5;
        ctx.strokeStyle = "#7FFF00";
        ctx.lineWidth = 1;
        for (let y = o.cell[1]; y < o.resolution[1]; y += o.cell[1]) {
            ctx.beginPath();
            ctx.moveTo(pixelOffset, y + pixelOffset);
            ctx.lineTo(o.resolution[0] + pixelOffset, y + pixelOffset);
            ctx.stroke();
        }
        for (let x = o.cell[0]; x < o.resolution[0]; x += o.cell[0]) {
            ctx.beginPath();
            ctx.moveTo(x + pixelOffset, pixelOffset);
            ctx.lineTo(x + pixelOffset, o.resolution[1] + pixelOffset);
            ctx.stroke();
        }
    }
}