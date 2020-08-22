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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const webfontloader_1 = require("webfontloader");
const promise_file_reader_1 = require("promise-file-reader");
const css_font_1 = require("css-font");
const atlas = __importStar(require("./atlas"));
const vs = __importStar(require("./variation-selector"));
const bd = __importStar(require("./bindings"));
const qr = __importStar(require("./queries"));
const FALLBACK_FONT = "Adobe Blank";
const options = new class {
    constructor() {
        this.context2D = qr.canvas.getContext("2d");
        //pure instantiation
        this.resolution = [1, 1];
        this.offset = [1, 1];
        this.cell = [1, 1];
        this.charset = "a";
        this.font = css_font_1.parse("10pt Adobe NotDef");
        this.clip = false;
        this.grid = false;
    }
};
bd.tabFontName.action = () => {
    if (qr.tabFontName.checked) {
        bd.fontName.action();
        atlas.refresh();
    }
};
bd.tabFontFile.action = () => {
    if (qr.tabFontFile.checked) {
        bd.fontFile.action(false);
        atlas.refresh();
    }
};
bd.fontName.action = () => {
    let value = qr.fontName.value.trim();
    if (value.length == 0) {
        value = options.font.family.join(" ");
    }
    qr.fontName.value = value;
    options.font.family = strictFontFamily(css_font_1.parse(options.font.size + " " + value).family);
};
bd.fontFile.action = (update) => {
    const files = qr.fontFile.files;
    if (files.length > 0) {
        if (update) {
            promise_file_reader_1.readAsArrayBuffer(files[0]).then((arrayBuffer) => __awaiter(void 0, void 0, void 0, function* () {
                const font = new FontFace("custom", arrayBuffer);
                yield font.load();
                document.fonts.clear();
                document.fonts.add(font);
                atlas.refresh();
            })).catch(() => {
                qr.fontFile.value = "";
            });
        }
        options.font.family = strictFontFamily(["custom"]);
    } /* else {
        bd.fontName.action();
    }*/
};
bd.bitmapWidth.action = (update) => {
    if (update) {
        options.resolution[0] = parseInt(qr.bitmapWidth.value);
    }
    qr.impreciseHighlight(qr.bitmapWidth, options.resolution[0] % options.cell[0]);
};
bd.bitmapHeight.action = (update) => {
    if (update) {
        options.resolution[1] = parseInt(qr.bitmapHeight.value);
    }
    qr.impreciseHighlight(qr.bitmapHeight, options.resolution[1] % options.cell[1]);
};
bd.cellsRow.action = (update) => {
    if (update) {
        options.cell[0] = Math.floor(options.resolution[0] / parseInt(qr.cellsRow.value));
    }
    else {
        qr.cellsRow.value = Math.floor(options.resolution[0] / options.cell[0]) + "";
    }
    qr.impreciseHighlight(qr.cellsRow, options.resolution[0] % options.cell[0]);
};
bd.cellsColumn.action = (update) => {
    if (update) {
        options.cell[1] = Math.floor(options.resolution[1] / parseInt(qr.cellsColumn.value));
    }
    else {
        qr.cellsColumn.value = Math.floor(options.resolution[1] / options.cell[1]) + "";
    }
    qr.impreciseHighlight(qr.cellsColumn, options.resolution[1] % options.cell[1]);
};
bd.cellWidth.action = (update) => {
    if (update) {
        options.cell[0] = parseInt(qr.cellWidth.value);
    }
    else {
        qr.cellWidth.value = options.cell[0] + "";
    }
    qr.impreciseHighlight(qr.cellWidth, options.resolution[0] % options.cell[0]);
};
bd.cellHeight.action = (update) => {
    if (update) {
        options.cell[1] = parseInt(qr.cellHeight.value);
    }
    else {
        qr.cellHeight.value = options.cell[1] + "";
    }
    qr.impreciseHighlight(qr.cellHeight, options.resolution[1] % options.cell[1]);
};
bd.fontSize.action = () => {
    options.font.size = qr.fontSize.value + "pt";
};
bd.offsetX.action = () => {
    options.offset[0] = parseInt(qr.offsetX.value);
};
bd.offsetY.action = () => {
    options.offset[1] = parseInt(qr.offsetY.value);
};
bd.clipCells.action = () => {
    options.clip = qr.clipCells.checked;
};
bd.showGrid.action = () => {
    options.grid = qr.showGrid.checked;
};
bd.charset.action = () => {
    const value = [...new Set(vs.removeAll(qr.charset.value))].join("");
    qr.charset.value = vs.textStyle((value));
    options.charset = value;
};
bd.fire([...bd.standard, ...bd.sizes], true);
webfontloader_1.load({
    classes: false,
    custom: {
        families: ["DejaVu Sans Mono", FALLBACK_FONT],
        testStrings: {
            "DejaVu Sans Mono": options.charset,
            "FALLBACK_FONT": options.charset
        }
    },
    active: () => {
        atlas.refresh();
    }
});
atlas.setOptions(options);
bd.registerAll();
function strictFontFamily(fontFamily) {
    return [fontFamily[0], FALLBACK_FONT];
}
