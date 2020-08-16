import fontAtlas from "font-atlas";
import type {IOptions} from "font-atlas";
import * as qr from "./queries";

let grid: boolean;
let faOptions: IOptions;

export function setGrid(value: boolean) {
    grid = value;
}

export function setFAOptions(options: IOptions) {
    faOptions = options;
}

export function draw() {
    fontAtlas(faOptions);
    if (grid) {
        drawGrid();
    }
}

function drawGrid() {
    let ctx: CanvasRenderingContext2D = qr.canvas.getContext("2d") as CanvasRenderingContext2D,
        pixelOffset = 0.5;
    ctx.strokeStyle = "#7FFF00";
    ctx.lineWidth = 1;
    for (let y = faOptions.step[1]; y < faOptions.shape[1]; y += faOptions.step[1]) {
        ctx.beginPath();
        ctx.moveTo(pixelOffset, y + pixelOffset);
        ctx.lineTo(faOptions.shape[0] + pixelOffset, y + pixelOffset);
        ctx.stroke();
    }
    for (let x = faOptions.step[0]; x < faOptions.shape[0]; x += faOptions.step[0]) {
        ctx.beginPath();
        ctx.moveTo(x + pixelOffset, pixelOffset);
        ctx.lineTo(x + pixelOffset, faOptions.shape[1] + pixelOffset);
        ctx.stroke();
    }
}