"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fire = exports.registerAll = exports.standard = exports.sizes = exports.tabs = exports.charset = exports.showGrid = exports.clipCells = exports.offsetY = exports.offsetX = exports.fontSize = exports.cellHeight = exports.cellWidth = exports.cellsColumn = exports.cellsRow = exports.bitmapHeight = exports.bitmapWidth = exports.fontFile = exports.fontName = exports.tabFontFile = exports.tabFontName = exports.resize = void 0;
const qr = __importStar(require("./queries"));
const atlas_1 = require("./atlas");
exports.resize = {
    action: () => {
    }
};
exports.tabFontName = {
    element: qr.tabFontName,
    action: () => {
    }
};
exports.tabFontFile = {
    element: qr.tabFontFile,
    action: () => {
    }
};
exports.fontName = {
    element: qr.fontName,
    action: () => {
    }
};
exports.fontFile = {
    element: qr.fontFile,
    action: () => {
    }
};
exports.bitmapWidth = {
    element: qr.bitmapWidth,
    action: () => {
    }
};
exports.bitmapHeight = {
    element: qr.bitmapHeight,
    action: () => {
    }
};
exports.cellsRow = {
    element: qr.cellsRow,
    action: () => {
    }
};
exports.cellsColumn = {
    element: qr.cellsColumn,
    action: () => {
    }
};
exports.cellWidth = {
    element: qr.cellWidth,
    action: () => {
    }
};
exports.cellHeight = {
    element: qr.cellHeight,
    action: () => {
    }
};
exports.fontSize = {
    element: qr.fontSize,
    action: () => {
    }
};
exports.offsetX = {
    element: qr.offsetX,
    action: () => {
    }
};
exports.offsetY = {
    element: qr.offsetY,
    action: () => {
    }
};
exports.clipCells = {
    element: qr.clipCells,
    action: () => {
    }
};
exports.showGrid = {
    element: qr.showGrid,
    action: () => {
    }
};
exports.charset = {
    element: qr.charset,
    action: () => {
    }
};
exports.tabs = [
    exports.tabFontName,
    exports.tabFontFile
];
exports.sizes = [
    exports.bitmapWidth,
    exports.bitmapHeight,
    exports.cellsRow,
    exports.cellsColumn,
    exports.cellWidth,
    exports.cellHeight
];
exports.standard = [
    exports.fontName,
    exports.fontFile,
    exports.fontSize,
    exports.offsetX,
    exports.offsetY,
    exports.clipCells,
    exports.showGrid,
    exports.charset
];
function registerAll() {
    registerActions();
    registerStandard();
    registerTabs();
    registerSizes();
    registerComplexInputs();
}
exports.registerAll = registerAll;
function registerActions() {
    window.addEventListener("resize", () => {
        exports.resize.action();
    });
}
function registerStandard() {
    exports.standard.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            atlas_1.refresh();
        });
    });
}
function registerTabs() {
    exports.tabs.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
        });
    });
}
function registerSizes() {
    exports.sizes.forEach((binding) => {
        binding.element.addEventListener("change", () => {
            binding.action(true);
            fire(exports.sizes, false, binding);
            atlas_1.refresh();
        });
    });
}
function registerComplexInputs() {
    qr.complexInputs.forEach((element) => {
        element.addEventListener("focusin", (event) => {
            event.currentTarget.classList.add("input-highlighted");
        });
        element.addEventListener("focusout", (event) => {
            event.currentTarget.classList.remove("input-highlighted");
        });
    });
}
function fire(bindings, update, skip) {
    bindings.forEach((binding) => {
        if (!(skip && skip.action == binding.action)) {
            binding.action(update);
        }
    });
}
exports.fire = fire;
