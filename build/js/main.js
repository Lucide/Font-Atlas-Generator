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
//INITIALIZATIONS
const FALLBACK_FONT = "Adobe Blank";
const options = new class {
    constructor() {
        this.context2D = qr.canvas.getContext("2d");
        //pure instantiation
        this.size = [1, 1];
        this.scale = 1;
        this.smooth = true;
        this.offset = [1, 1];
        this.cell = [1, 1];
        this.charset = "a";
        this.font = css_font_1.parse("10pt Adobe NotDef");
        this.clip = false;
        this.grid = false;
    }
};
//ACTIONS
bd.resize.action = () => {
    qr.body.style.setProperty("--preview-content-width", options.size[0] + 35 + "px");
    qr.body.style.setProperty("--preview-height", ((qr.footer.getBoundingClientRect().bottom + window.scrollY <= window.innerHeight) ?
        Math.max(qr.controlsMinHeight() - qr.charsets.offsetHeight, Math.min(options.size[1] + 35, window.innerHeight - qr.header.offsetHeight - qr.charsetMinHeight() - qr.footer.offsetHeight)) :
        Math.min(options.size[1] + 35, qr.controlsMinHeight())) + "px");
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
        options.size[0] = parseInt(qr.bitmapWidth.value);
        bd.resize.action();
    }
    qr.impreciseHighlight(qr.bitmapWidth, options.size[0] % options.cell[0]);
};
bd.bitmapHeight.action = (update) => {
    if (update) {
        options.size[1] = parseInt(qr.bitmapHeight.value);
        bd.resize.action();
    }
    qr.impreciseHighlight(qr.bitmapHeight, options.size[1] % options.cell[1]);
};
bd.cellsRow.action = (update) => {
    if (update) {
        options.cell[0] = Math.floor(options.size[0] / parseInt(qr.cellsRow.value));
    }
    else {
        qr.cellsRow.value = Math.floor(options.size[0] / options.cell[0]) + "";
    }
    qr.impreciseHighlight(qr.cellsRow, options.size[0] % options.cell[0]);
};
bd.cellsColumn.action = (update) => {
    if (update) {
        options.cell[1] = Math.floor(options.size[1] / parseInt(qr.cellsColumn.value));
    }
    else {
        qr.cellsColumn.value = Math.floor(options.size[1] / options.cell[1]) + "";
    }
    qr.impreciseHighlight(qr.cellsColumn, options.size[1] % options.cell[1]);
};
bd.cellWidth.action = (update) => {
    if (update) {
        options.cell[0] = parseInt(qr.cellWidth.value);
    }
    else {
        qr.cellWidth.value = options.cell[0] + "";
    }
    qr.impreciseHighlight(qr.cellWidth, options.size[0] % options.cell[0]);
};
bd.cellHeight.action = (update) => {
    if (update) {
        options.cell[1] = parseInt(qr.cellHeight.value);
    }
    else {
        qr.cellHeight.value = options.cell[1] + "";
    }
    qr.impreciseHighlight(qr.cellHeight, options.size[1] % options.cell[1]);
};
bd.fontSize.action = () => {
    options.font.size = qr.fontSize.value + "pt";
};
bd.clipCells.action = () => {
    options.clip = qr.clipCells.checked;
};
bd.scale.action = () => {
    const scale = 1 << qr.scale.selectedIndex;
    options.scale = scale;
    qr.smooth.disabled = (scale == 1);
};
bd.smooth.action = () => {
    options.smooth = qr.smooth.checked;
};
bd.offsetX.action = () => {
    options.offset[0] = parseInt(qr.offsetX.value);
};
bd.offsetY.action = () => {
    options.offset[1] = parseInt(qr.offsetY.value);
};
bd.showGrid.action = () => {
    options.grid = qr.showGrid.checked;
};
bd.charset.action = () => {
    const value = [...new Set(vs.removeAll(qr.charset.value))].join("");
    qr.charset.value = vs.textStyle((value));
    options.charset = value;
};
//START
bd.fire([...bd.sizes, ...bd.standard], true);
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
//DEFINITIONS
function strictFontFamily(fontFamily) {
    return [fontFamily[0], FALLBACK_FONT];
}
