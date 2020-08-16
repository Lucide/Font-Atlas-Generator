export const body = document.querySelector("body") as HTMLBodyElement;
//CANVAS
export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
//COMPLEX INPUTS HIGHLIGHTING
export const complexInputs = document.querySelectorAll(".input-number, .input-textarea");
//INPUT
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
export const showGrid = document.querySelector("#showGrid") as HTMLInputElement;
export const charset = document.querySelector("#charset") as HTMLInputElement;

function numberContainer(complexInput: HTMLInputElement): HTMLDivElement {
    return (complexInput.parentElement) as HTMLDivElement;
}

export function impreciseHighlight(complexInput: HTMLInputElement, remainder:number){
    if (remainder) {
        numberContainer(complexInput).classList.add("input-imprecise");
    } else {
        numberContainer(complexInput).classList.remove("input-imprecise");
    }
}