import parseCSSFont from "parse-css-font";
import {load as loadFont} from "webfontloader";
import {readAsArrayBuffer} from "promise-file-reader";
import type {IFont, IOptions} from "font-atlas";
import * as bd from "./bindings";
import * as qr from "./queries";
import * as draw from "./draw";

bd.tabFontName.action = () => {
    if (qr.tabFontName.checked) {
        bd.fontName.action(false);
    }
};
bd.tabFontFile.action = () => {
    if (qr.tabFontFile.checked) {
        bd.fontFile.action(false);
    }
};
bd.fontName.action = () => {
    let value = qr.fontName.value.trim();
    if (value.length == 0) {
        value = faOptions.font.family.join(" ");
    }
    qr.fontName.value = value;
    faOptions.font.family = (parseCSSFont(faOptions.font.size + " " + value) as IFont).family;
    draw.draw();
};
bd.fontFile.action = async (update) => {
    const files = qr.fontFile.files as FileList;
    if (files.length > 0) {
        if (update) {
            const font = new FontFace("custom", await readAsArrayBuffer(files[0]));
            await font.load();
            document.fonts.clear();
            document.fonts.add(font);
            console.log(document.fonts.size);
        }
        faOptions.font.family[0] = "custom";
        draw.draw();
    } else {
        bd.fontName.action();
    }
};

bd.bitmapWidth.action = (update) => {
    if (update) {
        faOptions.shape[0] = parseInt(qr.bitmapWidth.value);
    }
    qr.impreciseHighlight(qr.bitmapWidth, faOptions.shape[0] % faOptions.step[0]);
};
bd.bitmapHeight.action = (update) => {
    if (update) {
        faOptions.shape[1] = parseInt(qr.bitmapHeight.value);
    }
    qr.impreciseHighlight(qr.bitmapHeight, faOptions.shape[1] % faOptions.step[1]);
};
bd.cellsRow.action = (update) => {
    if (update) {
        faOptions.step[0] = Math.floor(faOptions.shape[0] / parseInt(qr.cellsRow.value));
    } else {
        qr.cellsRow.value = Math.floor(faOptions.shape[0] / faOptions.step[0]) + "";
    }
    qr.impreciseHighlight(qr.cellsRow, faOptions.shape[0] % faOptions.step[0]);
};
bd.cellsColumn.action = (update) => {
    if (update) {
        faOptions.step[1] = Math.floor(faOptions.shape[1] / parseInt(qr.cellsColumn.value));
    } else {
        qr.cellsColumn.value = Math.floor(faOptions.shape[1] / faOptions.step[1]) + "";
    }
    qr.impreciseHighlight(qr.cellsColumn, faOptions.shape[1] % faOptions.step[1]);
};
bd.cellWidth.action = (update) => {
    if (update) {
        faOptions.step[0] = parseInt(qr.cellWidth.value);
    } else {
        qr.cellWidth.value = faOptions.step[0] + "";
    }
    qr.impreciseHighlight(qr.cellWidth, faOptions.shape[0] % faOptions.step[0]);
};
bd.cellHeight.action = (update) => {
    if (update) {
        faOptions.step[1] = parseInt(qr.cellHeight.value);
    } else {
        qr.cellHeight.value = faOptions.step[1] + "";
    }
    qr.impreciseHighlight(qr.cellHeight, faOptions.shape[1] % faOptions.step[1]);
};

bd.fontSize.action = () => {
    faOptions.font.size = qr.fontSize.value + "pt";
};
bd.showGrid.action = () => {
    draw.setGrid(qr.showGrid.checked);
};
bd.charset.action = () => {
    const value = [...new Set(qr.charset.value)].join('')
    qr.charset.value = value;
    faOptions.chars = value;
};

//pure instantiation
const faOptions = new class implements IOptions {
    canvas = qr.canvas;
    shape = [1, 1] as [number, number];
    step = [1, 1] as [number, number];
    chars = "a";
    font = parseCSSFont("1pt serif") as IFont;
};

bd.fire([...bd.standard, ...bd.sizes], true);
loadFont({
    classes: false,
    google: {
        families: [
            "Open Sans"
        ]
    },
    active: () => {
        draw.draw();
    }
});
draw.setFAOptions(faOptions);
bd.registerAll();

