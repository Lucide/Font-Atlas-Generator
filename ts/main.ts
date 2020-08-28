import {load as loadFont} from "webfontloader";
import {readAsArrayBuffer} from "promise-file-reader";
import {parse as parseCSSFont} from "css-font";
import * as atlas from "./atlas";
import type {IOptions} from "./atlas";
import * as vs from "./variation-selector";
import * as bd from "./bindings";
import * as qr from "./queries";

//INITIALIZATIONS
const FALLBACK_FONT = "Adobe Blank";
const options = new class implements IOptions {
    context2D = qr.canvas.getContext("2d") as CanvasRenderingContext2D;
    //pure instantiation
    size = [1, 1] as [number, number];
    scale = 1;
    smooth = true;
    offset = [1, 1] as [number, number]
    cell = [1, 1] as [number, number];
    charset = "a";
    font = parseCSSFont("10pt Adobe NotDef");
    clip = false;
    grid = false;
};

//ACTIONS
bd.resize.action = () => {
    qr.body.style.setProperty("--preview-content-width", options.size[0] + 35 + "px");
    qr.body.style.setProperty("--preview-height", (
        (qr.footer.getBoundingClientRect().bottom + window.scrollY <= window.innerHeight) ?
            Math.max(
                qr.controlsMinHeight() - qr.charsets.offsetHeight,
                Math.min(
                    options.size[1] + 35,
                    window.innerHeight - qr.header.offsetHeight - qr.charsetMinHeight() - qr.footer.offsetHeight
                )
            ) :
            Math.min(
                options.size[1] + 35,
                qr.controlsMinHeight()
            )
    ) + "px");
}

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
    options.font.family = strictFontFamily(parseCSSFont(options.font.size + " " + value).family);
};
bd.fontFile.action = (update) => {
    const files = qr.fontFile.files as FileList;
    if (files.length > 0) {
        if (update) {
            readAsArrayBuffer(files[0]).then(async (arrayBuffer) => {
                const font = new FontFace("custom", arrayBuffer);
                await font.load();
                document.fonts.clear();
                document.fonts.add(font);
                atlas.refresh();
            }).catch(() => {
                qr.fontFile.value = "";
            });
        }
        options.font.family = strictFontFamily(["custom"]);
    }/* else {
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
    } else {
        qr.cellsRow.value = Math.floor(options.size[0] / options.cell[0]) + "";
    }
    qr.impreciseHighlight(qr.cellsRow, options.size[0] % options.cell[0]);
};
bd.cellsColumn.action = (update) => {
    if (update) {
        options.cell[1] = Math.floor(options.size[1] / parseInt(qr.cellsColumn.value));
    } else {
        qr.cellsColumn.value = Math.floor(options.size[1] / options.cell[1]) + "";
    }
    qr.impreciseHighlight(qr.cellsColumn, options.size[1] % options.cell[1]);
};
bd.cellWidth.action = (update) => {
    if (update) {
        options.cell[0] = parseInt(qr.cellWidth.value);
    } else {
        qr.cellWidth.value = options.cell[0] + "";
    }
    qr.impreciseHighlight(qr.cellWidth, options.size[0] % options.cell[0]);
};
bd.cellHeight.action = (update) => {
    if (update) {
        options.cell[1] = parseInt(qr.cellHeight.value);
    } else {
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
}
bd.smooth.action = () => {
    options.smooth=qr.smooth.checked;
}
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
loadFont({
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
function strictFontFamily(fontFamily: string[]): string[] {
    return [fontFamily[0], FALLBACK_FONT];
}