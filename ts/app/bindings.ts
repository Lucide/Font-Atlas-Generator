import * as qr from "./queries";
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

export const saveImage = emptyBinding(qr.saveImage);
export const exportREXPaint = emptyBinding(qr.exportREXPaint);

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
export const fontColor = emptyBinding(qr.fontColor);
export const scale = emptyBinding(qr.scale);
export const smooth = emptyBinding(qr.smooth);
export const clipCells = emptyBinding(qr.clipCells);
export const offsetX = emptyBinding(qr.offsetX);
export const offsetY = emptyBinding(qr.offsetY);
export const showGrid = emptyBinding(qr.showGrid);
export const backgroundColor = emptyBinding(qr.backgroundColor);
export const transparentBackground = emptyBinding(qr.transparentBackground);

export const charset = emptyBinding(qr.charset);

export const exports = [
    saveImage,
    exportREXPaint,
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
    fallbackFontsCount,
    fontSize,
    fontColor,
    clipCells,
    scale,
    smooth,
    offsetX,
    offsetY,
    showGrid,
    backgroundColor,
    transparentBackground,
];

const CHARSET_REFRESH_DEBOUNCE_MS = 2000;
let charsetRefreshTimer: ReturnType<typeof setTimeout> | undefined;

function emptyAction(): Action {
    return {
        action: () => {
        }
    };
}

function emptyBinding(element: HTMLElement): InputBinding {
    return {
        element: element,
        action: () => {
        }
    };
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
    registerExports();
    registerFontInput(0);
    registerSizes();
    registerStandard();
    registerCharset();
    registerComplexInputs();
}

function registerActions() {
    window.addEventListener("resize", () => {
        resize.action()
    });
}

function registerExports() {
    exports.forEach((binding) => {
        binding.element.addEventListener("click", () => {
            binding.action(true);
        });
    });
}

export function registerMessageBox(index: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        qr.messageBoxes[index].ok.addEventListener("click", () => {
            qr.removeMessageBox(index);
            resolve(true);
        }, {once: true});
        if (!qr.messageBoxes[index].notification) {
            qr.messageBoxes[index].cancel!.addEventListener("click", () => {
                qr.removeMessageBox(index);
                resolve(false);
            }, {once: true});
        }
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
        const onUpdate = () => {
            binding.action(true);
            refresh();
        };
        if (binding.element instanceof HTMLInputElement && binding.element.type === "color") {
            binding.element.addEventListener("input", onUpdate);
        } else {
            binding.element.addEventListener("change", onUpdate);
        }
    });
}

export function applyCharsetNow() {
    if (charsetRefreshTimer !== undefined) {
        clearTimeout(charsetRefreshTimer);
        charsetRefreshTimer = undefined;
    }
    charset.action(true);
    refresh();
}

function registerCharset() {
    const scheduleRefresh = () => {
        if (charsetRefreshTimer !== undefined) {
            clearTimeout(charsetRefreshTimer);
        }
        charsetRefreshTimer = setTimeout(() => {
            charsetRefreshTimer = undefined;
            charset.action(true);
            refresh();
        }, CHARSET_REFRESH_DEBOUNCE_MS);
    };
    charset.element.addEventListener("input", scheduleRefresh);
}

function registerSizes() {
    sizes.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            fire(sizes, false, [binding]);
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
    fire([...sizes, ...standard, charset], true);
}

function fire(actions: Action[], update: boolean, skip?: Action[]) {
    actions.forEach((binding) => {
        if (!(skip && skip.includes(binding))) {
            binding.action(update);
        }
    });
}