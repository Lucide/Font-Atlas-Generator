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

export const tabFontName: InputBinding = {
    element: qr.tabFontName,
    action: () => {
    }
};
export const tabFontFile: InputBinding = {
    element: qr.tabFontFile,
    action: () => {
    }
};
export const fontName: InputBinding = {
    element: qr.fontName,
    action: () => {
    }
};
export const fontFile: InputBinding = {
    element: qr.fontFile,
    action: () => {
    }
};

export const bitmapWidth: InputBinding = {
    element: qr.bitmapWidth,
    action: () => {
    }
};
export const bitmapHeight: InputBinding = {
    element: qr.bitmapHeight,
    action: () => {
    }
};
export const cellsRow: InputBinding = {
    element: qr.cellsRow,
    action: () => {
    }
};
export const cellsColumn: InputBinding = {
    element: qr.cellsColumn,
    action: () => {
    }
};
export const cellWidth: InputBinding = {
    element: qr.cellWidth,
    action: () => {
    }
};
export const cellHeight: InputBinding = {
    element: qr.cellHeight,
    action: () => {
    }
};

export const fontSize: InputBinding = {
    element: qr.fontSize,
    action: () => {
    }
};
export const scale: InputBinding = {
    element: qr.scale,
    action: () => {
    }
};
export const smooth: InputBinding = {
    element: qr.smooth,
    action: () => {
    }
};
export const clipCells: InputBinding = {
    element: qr.clipCells,
    action: () => {
    }
};
export const offsetX: InputBinding = {
    element: qr.offsetX,
    action: () => {
    }
};
export const offsetY: InputBinding = {
    element: qr.offsetY,
    action: () => {
    }
};
export const showGrid: InputBinding = {
    element: qr.showGrid,
    action: () => {
    }
};

export const charset: InputBinding = {
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
    clipCells,
    scale,
    smooth,
    offsetX,
    offsetY,
    showGrid,
    charset
];


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