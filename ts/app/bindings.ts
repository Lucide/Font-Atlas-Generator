import * as qr from "./queries";
import type {FontInput} from "./queries";
import {refresh} from "./atlas";

interface Action {
    action: (update?: boolean) => void;
}

interface InputBinding extends Action {
    readonly element: HTMLElement;
}

interface FontInputActions {
    tabFontName: (index: number, update?: boolean) => void,
    tabFontFile: (index: number, update?: boolean) => void,
    fontName: (index: number, update?: boolean) => void,
    fontFile: (index: number, update?: boolean) => void
}

export const resize: Action = emptyAction();

export const fontInput: FontInputActions = {
    tabFontName: emptyAction,
    tabFontFile: emptyAction,
    fontName: emptyAction,
    fontFile: emptyAction
}

export const fallbackFontsCount = emptyBinding(qr.fallbackFontsCount);

export const bitmapWidth = emptyBinding(qr.bitmapWidth);
export const bitmapHeight = emptyBinding(qr.bitmapHeight);
export const cellsRow = emptyBinding(qr.cellsRow);
export const cellsColumn = emptyBinding(qr.cellsColumn);
export const cellWidth = emptyBinding(qr.cellWidth);
export const cellHeight = emptyBinding(qr.cellHeight);

export const fontSize = emptyBinding(qr.fontSize);
export const scale = emptyBinding(qr.scale);
export const smooth = emptyBinding(qr.smooth);
export const clipCells = emptyBinding(qr.clipCells);
export const offsetX = emptyBinding(qr.offsetX);
export const offsetY = emptyBinding(qr.offsetY);
export const showGrid = emptyBinding(qr.showGrid);

export const charset = emptyBinding(qr.charset);

export const sizes = [
    bitmapWidth,
    bitmapHeight,
    cellsRow,
    cellsColumn,
    cellWidth,
    cellHeight
];
export const standard = [
    fallbackFontsCount,
    fontSize,
    clipCells,
    scale,
    smooth,
    offsetX,
    offsetY,
    showGrid,
    charset
];

function emptyAction(): Action {
    return {
        action: () => {
        }
    };
}

function emptyBinding(element: HTMLElement): InputBinding {
    return {
        element: element,
        action: emptyAction
    }
}

export function unfocusOnEnter(element: HTMLElement) {
    element.addEventListener("keydown", (event) => {
        if (!event.isComposing && event.key == "Enter") {
            element.blur();
        }
    });
}

export function registerAll() {
    registerActions();
    registerFontInput(0);
    registerSizes();
    registerStandard();
    registerComplexInputs();
}

function registerActions() {
    window.addEventListener("resize", () => {
        resize.action()
    });
}

export function registerFontInput(index: number) {
    qr.fontInputs[index].tabFontName.addEventListener("change", () => {
        fontInput.tabFontName(index, true);//, qr.fontInputs[index].tabFontName);
    });
    qr.fontInputs[index].tabFontFile.addEventListener("change", () => {
        fontInput.tabFontFile(index, true);//, qr.fontInputs[index].tabFontFile);
    });
    qr.fontInputs[index].fontName.addEventListener("change", () => {
        fontInput.fontName(index, true);//, qr.fontInputs[index].fontName);
        refresh();
    });
    qr.fontInputs[index].fontFile.addEventListener("change", () => {
        fontInput.fontFile(index, true);//, qr.fontInputs[index].fontFile);
        refresh();
    });
}

function registerStandard() {
    standard.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            refresh();
        });
    });
}

function registerSizes() {
    sizes.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            fire(sizes, false, binding);
            refresh();
        });
    });
}

function registerComplexInputs() {
    qr.complexInputs.forEach((element) => {
        element.addEventListener("focusin", (event) => {
            (event.currentTarget as HTMLElement).classList.add("input-highlighted");
        });
        element.addEventListener("focusout", (event) => {
            (event.currentTarget as HTMLElement).classList.remove("input-highlighted");
        });
    });
}

export function fireAll() {
    fontInput.fontName(0, true);
    // fontInput.fontFile(0, true);
    fire([...sizes, ...standard], true);
}

function fire(bindings: Action[], update: boolean, skip?: Action) {
    bindings.forEach((binding) => {
        if (!(skip && skip.action == binding.action)) {
            binding.action(update);
        }
    });
}