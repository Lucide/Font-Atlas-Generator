import * as qr from "./queries";
import {draw} from "./draw";

export interface IBinding {
    readonly element: HTMLInputElement;
    action: (update?: boolean) => void;
}

export const tabFontName: IBinding = {
    element: qr.tabFontName,
    action: () => {
    }
};
export const tabFontFile: IBinding = {
    element: qr.tabFontFile,
    action: () => {
    }
};
export const fontName: IBinding = {
    element: qr.fontName,
    action: () => {
    }
};
export const fontFile: IBinding = {
    element: qr.fontFile,
    action: () => {
    }
};
export const bitmapWidth: IBinding = {
    element: qr.bitmapWidth,
    action: () => {
    }
};
export const bitmapHeight: IBinding = {
    element: qr.bitmapHeight,
    action: () => {
    }
};
export const cellsRow: IBinding = {
    element: qr.cellsRow,
    action: () => {
    }
};
export const cellsColumn: IBinding = {
    element: qr.cellsColumn,
    action: () => {
    }
};
export const cellWidth: IBinding = {
    element: qr.cellWidth,
    action: () => {
    }
};
export const cellHeight: IBinding = {
    element: qr.cellHeight,
    action: () => {
    }
};
export const fontSize: IBinding = {
    element: qr.fontSize,
    action: () => {
    }
};
export const showGrid: IBinding = {
    element: qr.showGrid,
    action: () => {
    }
};
export const charset: IBinding = {
    element: qr.charset,
    action: () => {
    }
};

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
    showGrid,
    charset
];


export function registerAll() {
    registerStandard();
    registerTabs();
    registerSizes();
    registerComplexInputs();
}

function registerStandard() {
    standard.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            draw();
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
            draw();
        });
    });
}

function registerComplexInputs(){
    qr.complexInputs.forEach((element) => {
        element.addEventListener("focusin", (event) => {
            (event.currentTarget as HTMLElement).classList.add("input-highlighted");
        });
        element.addEventListener("focusout", (event) => {
            (event.currentTarget as HTMLElement).classList.remove("input-highlighted");
        });
    });
}

export function fire(bindings: IBinding[], update: boolean, skip?: IBinding) {
    bindings.forEach((binding) => {
        if (!(skip && skip.element == binding.element)) {
            binding.action(update);
        }
    });
}