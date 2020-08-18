import {stringify as stringifyCSSFont} from "css-font";
import type {IFont} from "css-font";

export interface IOptions {
    canvas: HTMLCanvasElement;
    font: IFont;
    resolution: [number, number];
    cell: [number, number];
    charset: string;
    grid: boolean;
}

let gOptions: IOptions;

export function setOptions(options: IOptions) {
    gOptions = options;
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

function atlas(options: IOptions) {
    let canvas = options.canvas;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = options.resolution[0]
    canvas.height = options.resolution[1]

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = stringifyCSSFont(options.font);

    for (let x = options.cell[0], y = options.cell[1], i = 0; y <= options.resolution[1] && i < options.charset.length; x += options.cell[0], i++) {
        if (x > options.resolution[0]) {
            x = options.cell[0];
            y += options.cell[1];
        }
        ctx.fillText(options.charset.charAt(i) + "\uFE0E", x - options.cell[0] / 2, y - options.cell[1] / 2);
    }
}

function drawGrid(options: IOptions) {
    if (options.grid) {
        let ctx: CanvasRenderingContext2D = options.canvas.getContext("2d") as CanvasRenderingContext2D,
            pixelOffset = 0.5;
        ctx.strokeStyle = "#7FFF00";
        ctx.lineWidth = 1;
        for (let y = options.cell[1]; y < options.resolution[1]; y += options.cell[1]) {
            ctx.beginPath();
            ctx.moveTo(pixelOffset, y + pixelOffset);
            ctx.lineTo(options.resolution[0] + pixelOffset, y + pixelOffset);
            ctx.stroke();
        }
        for (let x = options.cell[0]; x < options.resolution[0]; x += options.cell[0]) {
            ctx.beginPath();
            ctx.moveTo(x + pixelOffset, pixelOffset);
            ctx.lineTo(x + pixelOffset, options.resolution[1] + pixelOffset);
            ctx.stroke();
        }
    }
}