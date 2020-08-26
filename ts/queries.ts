//CONTAINERS
export const body = document.querySelector("body") as HTMLBodyElement;
export const header = document.querySelector(".header") as HTMLDivElement;
export const preview = document.querySelector(".preview") as HTMLDivElement;
export const controls = document.querySelector(".controls") as HTMLDivElement;
export const footer = document.querySelector(".footer") as HTMLDivElement;
//CANVAS
export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
//COMPLEX INPUTS HIGHLIGHTING
export const complexInputs = document.querySelectorAll(".input-number, .input-textarea");
//INPUTS
export const tabFontName = document.querySelector("#tabFontName") as HTMLInputElement;
export const tabFontFile = document.querySelector("#tabFontFile") as HTMLInputElement;
export const fontName = document.querySelector("#fontName") as HTMLInputElement;
export const fontFile = document.querySelector("#fontFile") as HTMLInputElement;

export const bitmapWidth = document.querySelector("#bitmapWidth") as HTMLInputElement;
export const bitmapHeight = document.querySelector("#bitmapHeight") as HTMLInputElement;
export const cellsRow = document.querySelector("#cellsRow") as HTMLInputElement;
export const cellsColumn = document.querySelector("#cellsColumn") as HTMLInputElement;
export const cellWidth = document.querySelector("#cellWidth") as HTMLInputElement;
export const cellHeight = document.querySelector("#cellHeight") as HTMLInputElement;

export const fontSize = document.querySelector("#fontSize") as HTMLInputElement;
export const offsetX = document.querySelector("#offsetX") as HTMLInputElement;
export const offsetY = document.querySelector("#offsetY") as HTMLInputElement;
export const clipCells = document.querySelector("#clipCells") as HTMLInputElement;
export const showGrid = document.querySelector("#showGrid") as HTMLInputElement;
export const charset = document.querySelector("#charset") as HTMLInputElement;

//PRIVATE
const filler = document.querySelector(".filler") as HTMLDivElement;

export namespace Values {
    export const controlsMinWidth = parseInt(
        getComputedStyle(body)
            .getPropertyValue("--controls-min-width")
            .replace("px", ""));
    export const previewPadding = parseInt(
        getComputedStyle(canvas.parentElement as HTMLDivElement)
            .padding
            .replace("px", ""));
    export const controlsMinContent = controls.scrollHeight;
}

function numberContainer(complexInput: HTMLInputElement): HTMLDivElement {
    return (complexInput.parentElement) as HTMLDivElement;
}

export function impreciseHighlight(complexInput: HTMLInputElement, remainder: number) {
    if (remainder) {
        numberContainer(complexInput).classList.add("input-imprecise");
    } else {
        numberContainer(complexInput).classList.remove("input-imprecise");
    }
}

export function controlsMinContent(): number {
    return controls.scrollHeight - filler.scrollHeight;
}