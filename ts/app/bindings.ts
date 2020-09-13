import * as qr from "./queries";
import {refresh} from "./atlas";

interface IAction {
    action: (update?: boolean) => void;
}

interface InputBinding extends IAction {
    readonly element: HTMLElement;
}

export const resize: IAction = {
    action: () => {
    }
}

export const tabFontName = emptyBinding(qr.tabFontName);
export const tabFontFile = emptyBinding(qr.tabFontFile);
export const fontName = emptyBinding(qr.fontName);
export const fontFile = emptyBinding(qr.fontFile);

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

export const tabs = [
    tabFontName,
    tabFontFile
];
export const sizes = [
    bitmapWidth,
    bitmapHeight,
    cellsRow,
    cellsColumn,
    cellWidth,
    cellHeight
];
export const standard = [
    fontName,
    fontFile,
    fontSize,
    clipCells,
    scale,
    smooth,
    offsetX,
    offsetY,
    showGrid,
    charset
];

function emptyBinding(element: HTMLElement): InputBinding {
    return {
        element: element,
        action: () => {
        }
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
    registerSizes();
    registerTabs();
    registerStandard();
    registerComplexInputs();
}

function registerActions() {
    window.addEventListener("resize", () => {
        resize.action()
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

function registerTabs() {
    tabs.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
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

export function fire(bindings: IAction[], update: boolean, skip?: IAction) {
    bindings.forEach((binding) => {
        if (!(skip && skip.action == binding.action)) {
            binding.action(update);
        }
    });
}