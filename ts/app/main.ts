import {load as loadFont} from "webfontloader";
import {readAsArrayBuffer} from "promise-file-reader";
import {parse as parseCSSFont} from "css-font";
import {saveAs} from "file-saver";
import {Workbox} from "workbox-window";
import type {Message} from "common/message";
import * as atlas from "./atlas";
import type {IOptions} from "./atlas";
import * as vs from "./variation-selector";
import * as bd from "./bindings";
import * as qr from "./queries";

//INITIALIZATIONS
const FALLBACK_FONT = "Adobe Blank";
const options = new class implements IOptions {
    context2D = qr.canvas.getContext("2d") as CanvasRenderingContext2D;
    font = parseCSSFont("10pt " + FALLBACK_FONT + "," + FALLBACK_FONT);
    //pure instantiation
    size = [1, 1] as [number, number];
    scale = 1;
    smooth = true;
    offset = [1, 1] as [number, number]
    cell = [1, 1] as [number, number];
    charset = "a";
    clip = false;
    grid = false;
};

//START
if ("serviceWorker" in navigator) {
    const wb = new Workbox("sw.js");

    wb.addEventListener("activated", (event) => {
        if (!event.isUpdate) {
            console.log("new service worker activated, reloading to cache everything");
            location.reload();
        }
    });
    // wb.addEventListener("waiting", () => {
    //     wb.messageSW({
    //         type: "SKIP_WAITING"
    //     } as Message);
    // });
    navigator.serviceWorker.addEventListener("message", (event) => {
        if ((event.data as Message).type == "OFFLINE") {
            qr.offlineDecorations();
        }
    }, {
        once: true
    });
    wb.register();
}

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
bd.saveImage.action = () => {
    qr.canvas.toBlob((image) => {
        saveAs(image!, getFileName() + ".png");
    });
}
bd.exportREXPaint.action = () => {
    let content = "";
    for (let i = 0; i < options.charset.length; i++) {
        content += i + " " + options.charset.codePointAt(i) + " //" + options.charset.charAt(i) + "\r\n";
    }
    saveAs(new File([content],
        getFileName() + ".txt",
        {
            type: "text/plain;charset=utf-8",
        }));
};
bd.fontInput.tabFontName = (index) => {
    const tabFontName = qr.fontInputs[index].tabFontName;
    if (tabFontName.checked) {
        bd.fontInput.fontName(index);
        atlas.refresh();
    }
};
bd.fontInput.tabFontFile = (index) => {
    const tabFontFile = qr.fontInputs[index].tabFontFile;
    if (tabFontFile.checked) {
        bd.fontInput.fontFile(index);
        atlas.refresh();
    }
};
bd.fontInput.fontName = (index) => {
    const fontName = qr.fontInputs[index].fontName;
    let value = fontName.value.trim();
    if (value.length == 0) {
        value = options.font.family[0];
    }
    fontName.value = value;
    options.font.family[index] = value;//parseCSSFont(options.font.size + " " + value).family);
};
bd.fontInput.fontFile = (index, update) => {
    const fontFile = qr.fontInputs[index].fontFile;
    if (fontFile.files!.length > 0) {
        const file = fontFile.files![0];
        if (update) {
            readAsArrayBuffer(file).then(async (arrayBuffer) => {
                const font = new FontFace(file.name, arrayBuffer);
                await font.load();
                // document.fonts.clear();
                document.fonts.add(font);
                atlas.refresh();
            }).catch(() => {
                fontFile.value = "";
            });
        }
        options.font.family[index] = file.name;
    }/* else {
        bd.fontName.action();
    }*/
};
bd.fallbackFontsCount.action = () => {
    let diff = (parseInt(qr.fallbackFontsCount.value) + 1) - qr.fontInputs.length,
        index;
    if (diff > 0) {
        for (; diff > 0; diff--) {
            index = qr.fontInputs.length;
            options.font.family.push(FALLBACK_FONT);
            qr.addFallbackFontField();
            bd.registerFontInput(index);
            // bd.fontInput.fontName(index);
        }
    } else {
        for (; diff < 0; diff++) {
            qr.removeFallbackFontField();
            index = qr.fontInputs.length;
            options.font.family.pop();
            options.font.family[index] = FALLBACK_FONT;
            //unregister
        }
    }
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
    options.smooth = qr.smooth.checked;
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

bd.fireAll();
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
bd.unfocusOnEnter(qr.charset);

function getFileName(): string {
    let fileName = options.font.family[0];
    if (fileName.lastIndexOf(".") != -1) {
        return fileName.substr(0, fileName.lastIndexOf("."));
    }
    return fileName;
}