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
    transparentBackground: boolean;
    fontColor: string;
    backgroundColor: string;
}

let options: IOptions;
let outputCtx: CanvasRenderingContext2D,
    renderCtx: CanvasRenderingContext2D;

export function setOptions(o: IOptions) {
    options = o;
    outputCtx = options.context2D;
    renderCtx = (document.createElement("canvas") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
}

function initText(ctx: CanvasRenderingContext2D, fontColor: string) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = fontColor;
}

function clear(ctx: CanvasRenderingContext2D, transparent: boolean, backgroundColor: string) {
    if (transparent) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

export function refresh() {
    drawContent(options, outputCtx, false);
    drawGrid(options);
}

export function exportImage(callback: (blob: Blob | null) => void) {
    if (options.transparentBackground) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        drawContent(options, ctx, true);
        canvas.toBlob(callback);
    } else {
        options.context2D.canvas.toBlob(callback);
    }
}

function drawContent(o: IOptions, targetCtx: CanvasRenderingContext2D, transparent: boolean) {
    targetCtx.save();
    [targetCtx.canvas.width, targetCtx.canvas.height] = [o.size[0], o.size[1]];
    clear(targetCtx, transparent, o.backgroundColor);
    targetCtx.imageSmoothingEnabled = o.smooth;
    [renderCtx.canvas.width, renderCtx.canvas.height] = o.clip ? [o.cell[0] * o.scale, o.cell[1] * o.scale] : [o.size[0] * o.scale, o.size[1] * o.scale];
    renderCtx.setTransform(1, 0, 0, 1, 0, 0);
    renderCtx.scale(o.scale, o.scale);
    initText(renderCtx, o.fontColor);
    renderCtx.font = stringifyCSSFont(o.font);
    if (o.clip) {
        drawClipped(o, targetCtx);
    } else {
        drawUnclipped(o, targetCtx);
    }
    targetCtx.restore();
}

function drawClipped(o: IOptions, targetCtx: CanvasRenderingContext2D) {
    let i = 0;
    for (let y = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; y += o.cell[1]) {
        for (let x = 0; x + o.cell[0] <= o.size[0] && i < o.charset.length; x += o.cell[0]) {
            renderCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
            renderCtx.fillText(textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
            targetCtx.drawImage(renderCtx.canvas, x, y, o.cell[0], o.cell[1]);
            i++;
        }
    }
}

function drawUnclipped(o: IOptions, targetCtx: CanvasRenderingContext2D) {
    let i = 0;
    for (let y = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; y += o.cell[1]) {
        for (let x = 0; x + o.cell[0] <= o.size[0] && i < o.charset.length; x += o.cell[0]) {
            renderCtx.fillText(textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
            i++
        }
    }
    targetCtx.drawImage(renderCtx.canvas, 0, 0, o.size[0], o.size[1]);
}

function drawGrid(o: IOptions) {
    outputCtx.save();
    if (o.grid) {
        const pixelOffset = 0.5;
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

export function highlightCell(index: number) {
    const o: IOptions = options;
    outputCtx.save();
    const pixelOffset = 0.5;
    outputCtx.strokeStyle = "#ff0000";
    outputCtx.lineWidth = 1;
    const indX = index % (Math.floor(o.size[0] / o.cell[0]) + 1);
    const indY = Math.floor(index / Math.floor(o.size[1] / o.cell[1]));
    outputCtx.beginPath();
    outputCtx.rect(o.cell[0] * indX + pixelOffset, o.cell[1] * indY + pixelOffset, o.cell[0], o.cell[1]);
    outputCtx.stroke();
    outputCtx.restore();
}