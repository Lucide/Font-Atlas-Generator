//PRIVATE
const fallbackFontTemplate = document.querySelector(".fallbackFontTemplate") as HTMLDivElement;
const controlsFiller = document.querySelector(".controls .filler") as HTMLDivElement;
const charsetFiller = document.querySelector(".charset .filler") as HTMLDivElement;
//CONTAINERS
export const body = document.querySelector("body") as HTMLBodyElement;
export const header = document.querySelector(".header") as HTMLDivElement;
export const preview = document.querySelector(".preview") as HTMLDivElement;
export const controls = document.querySelector(".controls") as HTMLDivElement;
export const fontsInputs = document.querySelector(".fontsInputs") as HTMLDivElement;
export const gridInputs = document.querySelector(".gridInputs") as HTMLDivElement;
export const charsets = document.querySelector(".charset") as HTMLDivElement;
export const footer = document.querySelector(".footer") as HTMLDivElement;
//CANVAS
export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
//COMPLEX INPUTS HIGHLIGHTING
export const complexInputs = document.querySelectorAll(".input-number, .input-textarea");
//INPUTS
export const fallbackFontsCount = document.querySelector("#fallbackFontsCount") as HTMLInputElement;

export const bitmapWidth = document.querySelector("#bitmapWidth") as HTMLInputElement;
export const bitmapHeight = document.querySelector("#bitmapHeight") as HTMLInputElement;
export const cellsRow = document.querySelector("#cellsRow") as HTMLInputElement;
export const cellsColumn = document.querySelector("#cellsColumn") as HTMLInputElement;
export const cellWidth = document.querySelector("#cellWidth") as HTMLInputElement;
export const cellHeight = document.querySelector("#cellHeight") as HTMLInputElement;

export const fontSize = document.querySelector("#fontSize") as HTMLInputElement;
export const scale = document.querySelector("#scale") as HTMLSelectElement;
export const smooth = document.querySelector("#smooth") as HTMLInputElement;
export const clipCells = document.querySelector("#clipCells") as HTMLInputElement;
export const offsetX = document.querySelector("#offsetX") as HTMLInputElement;
export const offsetY = document.querySelector("#offsetY") as HTMLInputElement;
export const showGrid = document.querySelector("#showGrid") as HTMLInputElement;

export const charset = document.querySelector("#charset") as HTMLTextAreaElement;

export interface FontInput {
    container: HTMLDivElement
    tabFontName: HTMLInputElement
    tabFontFile: HTMLInputElement
    fontName: HTMLInputElement
    fontFile: HTMLInputElement
}

export const fontInputs: FontInput[] = [
    {
        container: document.querySelector(".mandatoryFont") as HTMLDivElement,
        tabFontName: document.querySelector("#tabFontName") as HTMLInputElement,
        tabFontFile: document.querySelector("#tabFontFile") as HTMLInputElement,
        fontName: document.querySelector("#fontName") as HTMLInputElement,
        fontFile: document.querySelector("#fontFile") as HTMLInputElement
    }
];

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

export function addFallbackFontField() {
    const count = fontInputs.length;
    const fontInputElement = fallbackFontTemplate.cloneNode(true) as HTMLDivElement;
    let fontInput: FontInput = {
        container: fontInputElement,
        tabFontName: fontInputElement.querySelector("#tabFFontName") as HTMLInputElement,
        tabFontFile: fontInputElement.querySelector("#tabFFontFile") as HTMLInputElement,
        fontName: fontInputElement.querySelector("#ffontName") as HTMLInputElement,
        fontFile: fontInputElement.querySelector("#ffontFile") as HTMLInputElement
    }
    fontInput.tabFontName.setAttribute("id", "#tabFont" + count + "Name");
    fontInput.tabFontName.setAttribute("name", "tab-group-font" + count);
    fontInput.tabFontFile.setAttribute("id", "#tabFont" + count + "File");
    fontInput.tabFontFile.setAttribute("name", "tab-group-font" + count);
    fontInput.fontName.setAttribute("id", "#font" + count + "Name");
    fontInput.fontFile.setAttribute("id", "#font" + count + "File");

    fontInputElement.querySelector("label[for=\"tabFFontName\"]")?.setAttribute("for", fontInput.tabFontName.id);
    fontInputElement.querySelector("label[for=\"tabFFontFile\"]")?.setAttribute("for", fontInput.tabFontFile.id);
    fontInputElement.classList.remove("fallbackFontTemplate");

    fontInputs.push(fontInput);
    fontsInputs.appendChild(fontInputElement);
}

export function removeFallbackFontField() {
    if (fontInputs.length > 1) {
        fontsInputs.removeChild(fontsInputs.lastChild!);
        fontInputs.pop();
    }
}

export function offlineDecorations() {
    header.classList.add("offline");
}

export function impreciseHighlight(complexInput: HTMLInputElement, remainder: number) {
    if (remainder) {
        numberContainer(complexInput).classList.add("input-imprecise");
    } else {
        numberContainer(complexInput).classList.remove("input-imprecise");
    }
}

export function controlsMinHeight(): number {
    return controls.scrollHeight - controlsFiller.offsetHeight;
}

export function charsetMinHeight(): number {
    return charsets.scrollHeight - charsetFiller.offsetHeight;
}
