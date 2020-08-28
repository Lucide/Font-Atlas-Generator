(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.setOptions = void 0;
const css_font_1 = require("css-font");
const variation_selector_1 = require("./variation-selector");
let options;
let outputCtx, canvasCtx, cellCtx;
function setOptions(o) {
    options = o;
    outputCtx = options.context2D;
    canvasCtx = document.createElement("canvas").getContext("2d");
    cellCtx = document.createElement("canvas").getContext("2d");
}
exports.setOptions = setOptions;
function initText(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
}
function clear(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function refresh() {
    draw(options);
    drawGrid(options);
}
exports.refresh = refresh;
function draw(o) {
    outputCtx.save();
    [outputCtx.canvas.width, outputCtx.canvas.height] = [o.size[0], o.size[1]];
    clear(outputCtx);
    outputCtx.imageSmoothingEnabled = o.smooth;
    if (o.clip) {
        drawClipped(o);
    }
    else {
        drawUnclipped(o);
    }
    outputCtx.restore();
}
function drawClipped(o) {
    [cellCtx.canvas.width, cellCtx.canvas.height] = [o.cell[0] * o.scale, o.cell[1] * o.scale];
    cellCtx.scale(o.scale, o.scale);
    initText(cellCtx);
    cellCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        cellCtx.clearRect(0, 0, o.cell[0], o.cell[1]);
        cellCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), o.offset[0] + o.cell[0] / 2, o.offset[1] + o.cell[1] / 2);
        outputCtx.drawImage(cellCtx.canvas, x, y, o.cell[0], o.cell[1]);
    }
}
function drawUnclipped(o) {
    [canvasCtx.canvas.width, canvasCtx.canvas.height] = [o.size[0] * o.scale, o.size[1] * o.scale];
    canvasCtx.scale(o.scale, o.scale);
    initText(canvasCtx);
    canvasCtx.font = css_font_1.stringify(o.font);
    for (let x = 0, y = 0, i = 0; y + o.cell[1] <= o.size[1] && i < o.charset.length; x += o.cell[0], i++) {
        if (x + o.cell[0] > o.size[0]) {
            x = 0;
            y += o.cell[1];
        }
        canvasCtx.fillText(variation_selector_1.textStyle(o.charset.charAt(i)), x + o.offset[0] + o.cell[0] / 2, y + o.offset[1] + o.cell[1] / 2);
    }
    outputCtx.drawImage(canvasCtx.canvas, 0, 0, o.size[0], o.size[1]);
}
function drawGrid(o) {
    outputCtx.save();
    if (o.grid) {
        let pixelOffset = 0.5;
        outputCtx.strokeStyle = "#7FFF00";
        outputCtx.lineWidth = 1;
        for (let y = o.cell[1]; y < o.size[1]; y += o.cell[1]) {
            outputCtx.beginPath();
            outputCtx.moveTo(pixelOffset, y + pixelOffset);
            outputCtx.lineTo(o.size[0] + pixelOffset, y + pixelOffset);
            outputCtx.stroke();
        }
        for (let x = o.cell[0]; x < o.size[0]; x += o.cell[0]) {
            outputCtx.beginPath();
            outputCtx.moveTo(x + pixelOffset, pixelOffset);
            outputCtx.lineTo(x + pixelOffset, o.size[1] + pixelOffset);
            outputCtx.stroke();
        }
    }
    outputCtx.restore();
}

},{"./variation-selector":5,"css-font":10}],2:[function(require,module,exports){
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
exports.fire = exports.registerAll = exports.standard = exports.sizes = exports.tabs = exports.charset = exports.showGrid = exports.offsetY = exports.offsetX = exports.clipCells = exports.smooth = exports.scale = exports.fontSize = exports.cellHeight = exports.cellWidth = exports.cellsColumn = exports.cellsRow = exports.bitmapHeight = exports.bitmapWidth = exports.fontFile = exports.fontName = exports.tabFontFile = exports.tabFontName = exports.resize = void 0;
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
exports.scale = {
    element: qr.scale,
    action: () => {
    }
};
exports.smooth = {
    element: qr.smooth,
    action: () => {
    }
};
exports.clipCells = {
    element: qr.clipCells,
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
    exports.clipCells,
    exports.scale,
    exports.smooth,
    exports.offsetX,
    exports.offsetY,
    exports.showGrid,
    exports.charset
];
function registerAll() {
    registerActions();
    registerSizes();
    registerTabs();
    registerStandard();
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

},{"./atlas":1,"./queries":4}],3:[function(require,module,exports){
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

},{"./atlas":1,"./bindings":2,"./queries":4,"./variation-selector":5,"css-font":10,"promise-file-reader":18,"webfontloader":21}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charsetMinHeight = exports.controlsMinHeight = exports.impreciseHighlight = exports.Values = exports.charset = exports.showGrid = exports.offsetY = exports.offsetX = exports.clipCells = exports.smooth = exports.scale = exports.fontSize = exports.cellHeight = exports.cellWidth = exports.cellsColumn = exports.cellsRow = exports.bitmapHeight = exports.bitmapWidth = exports.fontFile = exports.fontName = exports.tabFontFile = exports.tabFontName = exports.complexInputs = exports.canvas = exports.footer = exports.charsets = exports.controls = exports.preview = exports.header = exports.body = void 0;
//CONTAINERS
exports.body = document.querySelector("body");
exports.header = document.querySelector(".header");
exports.preview = document.querySelector(".preview");
exports.controls = document.querySelector(".controls");
exports.charsets = document.querySelector(".charset");
exports.footer = document.querySelector(".footer");
//CANVAS
exports.canvas = document.querySelector("canvas");
//COMPLEX INPUTS HIGHLIGHTING
exports.complexInputs = document.querySelectorAll(".input-number, .input-textarea");
//INPUTS
exports.tabFontName = document.querySelector("#tabFontName");
exports.tabFontFile = document.querySelector("#tabFontFile");
exports.fontName = document.querySelector("#fontName");
exports.fontFile = document.querySelector("#fontFile");
exports.bitmapWidth = document.querySelector("#bitmapWidth");
exports.bitmapHeight = document.querySelector("#bitmapHeight");
exports.cellsRow = document.querySelector("#cellsRow");
exports.cellsColumn = document.querySelector("#cellsColumn");
exports.cellWidth = document.querySelector("#cellWidth");
exports.cellHeight = document.querySelector("#cellHeight");
exports.fontSize = document.querySelector("#fontSize");
exports.scale = document.querySelector("#scale");
exports.smooth = document.querySelector("#smooth");
exports.clipCells = document.querySelector("#clipCells");
exports.offsetX = document.querySelector("#offsetX");
exports.offsetY = document.querySelector("#offsetY");
exports.showGrid = document.querySelector("#showGrid");
exports.charset = document.querySelector("#charset");
//PRIVATE
const controlsFiller = document.querySelector(".controls .filler");
const charsetFiller = document.querySelector(".charset .filler");
var Values;
(function (Values) {
    Values.controlsMinWidth = parseInt(getComputedStyle(exports.body)
        .getPropertyValue("--controls-min-width")
        .replace("px", ""));
    Values.previewPadding = parseInt(getComputedStyle(exports.canvas.parentElement)
        .padding
        .replace("px", ""));
    Values.controlsMinContent = exports.controls.scrollHeight;
})(Values = exports.Values || (exports.Values = {}));
function numberContainer(complexInput) {
    return (complexInput.parentElement);
}
function impreciseHighlight(complexInput, remainder) {
    if (remainder) {
        numberContainer(complexInput).classList.add("input-imprecise");
    }
    else {
        numberContainer(complexInput).classList.remove("input-imprecise");
    }
}
exports.impreciseHighlight = impreciseHighlight;
function controlsMinHeight() {
    return exports.controls.scrollHeight - controlsFiller.offsetHeight;
}
exports.controlsMinHeight = controlsMinHeight;
function charsetMinHeight() {
    return exports.charsets.scrollHeight - charsetFiller.offsetHeight;
}
exports.charsetMinHeight = charsetMinHeight;

},{}],5:[function(require,module,exports){
"use strict";
//https://www.npmjs.com/package/strip-variation-selectors
Object.defineProperty(exports, "__esModule", { value: true });
exports.textStyle = exports.removeAll = void 0;
function removeAll(s) {
    return s.replace(/([\u180B-\u180D\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])/g, "");
}
exports.removeAll = removeAll;
function textStyle(s) {
    return s.replace(/./gu, "$&\uFE0E");
}
exports.textStyle = textStyle;

},{}],6:[function(require,module,exports){
module.exports=[
	"xx-small",
	"x-small",
	"small",
	"medium",
	"large",
	"x-large",
	"xx-large",
	"larger",
	"smaller"
]

},{}],7:[function(require,module,exports){
module.exports=[
	"normal",
	"condensed",
	"semi-condensed",
	"extra-condensed",
	"ultra-condensed",
	"expanded",
	"semi-expanded",
	"extra-expanded",
	"ultra-expanded"
]

},{}],8:[function(require,module,exports){
module.exports=[
	"normal",
	"italic",
	"oblique"
]

},{}],9:[function(require,module,exports){
module.exports=[
	"normal",
	"bold",
	"bolder",
	"lighter",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900"
]

},{}],10:[function(require,module,exports){
'use strict'

module.exports = {
	parse: require('./parse'),
	stringify: require('./stringify')
}

},{"./parse":12,"./stringify":13}],11:[function(require,module,exports){
'use strict'

var sizes = require('css-font-size-keywords')

module.exports = {
	isSize: function isSize(value) {
		return /^[\d\.]/.test(value)
			|| value.indexOf('/') !== -1
			|| sizes.indexOf(value) !== -1
	}
}

},{"css-font-size-keywords":6}],12:[function(require,module,exports){
'use strict'

var unquote = require('unquote')
var globalKeywords = require('css-global-keywords')
var systemFontKeywords = require('css-system-font-keywords')
var fontWeightKeywords = require('css-font-weight-keywords')
var fontStyleKeywords = require('css-font-style-keywords')
var fontStretchKeywords = require('css-font-stretch-keywords')
var splitBy = require('string-split-by')
var isSize = require('./lib/util').isSize


module.exports = parseFont


var cache = parseFont.cache = {}


function parseFont (value) {
	if (typeof value !== 'string') throw new Error('Font argument must be a string.')

	if (cache[value]) return cache[value]

	if (value === '') {
		throw new Error('Cannot parse an empty string.')
	}

	if (systemFontKeywords.indexOf(value) !== -1) {
		return cache[value] = {system: value}
	}

	var font = {
		style: 'normal',
		variant: 'normal',
		weight: 'normal',
		stretch: 'normal',
		lineHeight: 'normal',
		size: '1rem',
		family: ['serif']
	}

	var tokens = splitBy(value, /\s+/)
	var token

	while (token = tokens.shift()) {
		if (globalKeywords.indexOf(token) !== -1) {
			['style', 'variant', 'weight', 'stretch'].forEach(function(prop) {
				font[prop] = token
			})

			return cache[value] = font
		}

		if (fontStyleKeywords.indexOf(token) !== -1) {
			font.style = token
			continue
		}

		if (token === 'normal' || token === 'small-caps') {
			font.variant = token
			continue
		}

		if (fontStretchKeywords.indexOf(token) !== -1) {
			font.stretch = token
			continue
		}

		if (fontWeightKeywords.indexOf(token) !== -1) {
			font.weight = token
			continue
		}


		if (isSize(token)) {
			var parts = splitBy(token, '/')
			font.size = parts[0]
			if (parts[1] != null) {
				font.lineHeight = parseLineHeight(parts[1])
			}
			else if (tokens[0] === '/') {
				tokens.shift()
				font.lineHeight = parseLineHeight(tokens.shift())
 			}

			if (!tokens.length) {
				throw new Error('Missing required font-family.')
			}
			font.family = splitBy(tokens.join(' '), /\s*,\s*/).map(unquote)

			return cache[value] = font
		}

		throw new Error('Unknown or unsupported font token: ' + token)
	}

	throw new Error('Missing required font-size.')
}


function parseLineHeight(value) {
	var parsed = parseFloat(value)
	if (parsed.toString() === value) {
		return parsed
	}
	return value
}

},{"./lib/util":11,"css-font-stretch-keywords":7,"css-font-style-keywords":8,"css-font-weight-keywords":9,"css-global-keywords":14,"css-system-font-keywords":15,"string-split-by":19,"unquote":20}],13:[function(require,module,exports){
'use strict'

var pick = require('pick-by-alias')
var isSize = require('./lib/util').isSize

var globals = a2o(require('css-global-keywords'))
var systems = a2o(require('css-system-font-keywords'))
var weights = a2o(require('css-font-weight-keywords'))
var styles = a2o(require('css-font-style-keywords'))
var stretches = a2o(require('css-font-stretch-keywords'))

var variants = {'normal': 1, 'small-caps': 1}
var fams = {
	'serif': 1,
	'sans-serif': 1,
	'monospace': 1,
	'cursive': 1,
	'fantasy': 1,
	'system-ui': 1
}

var defaults = {
	style: 'normal',
	variant: 'normal',
	weight: 'normal',
	stretch: 'normal',
	size: '1rem',
	lineHeight: 'normal',
	family: 'serif'
}

module.exports = function stringifyFont (o) {
	o = pick(o, {
		style: 'style fontstyle fontStyle font-style slope distinction',
		variant: 'variant font-variant fontVariant fontvariant var capitalization',
		weight: 'weight w font-weight fontWeight fontweight',
		stretch: 'stretch font-stretch fontStretch fontstretch width',
		size: 'size s font-size fontSize fontsize height em emSize',
		lineHeight: 'lh line-height lineHeight lineheight leading',
		family: 'font family fontFamily font-family fontfamily type typeface face',
		system: 'system reserved default global',
	})

	if (o.system) {
		if (o.system) verify(o.system, systems)
		return o.system
	}

	verify(o.style, styles)
	verify(o.variant, variants)
	verify(o.weight, weights)
	verify(o.stretch, stretches)

	// default root value is medium, but by default it's inherited
	if (o.size == null) o.size = defaults.size
	if (typeof o.size === 'number') o.size += 'px'

	if (!isSize) throw Error('Bad size value `' + o.size + '`')

	// many user-agents use serif, we don't detect that for consistency
	if (!o.family) o.family = defaults.family
	if (Array.isArray(o.family)) {
		if (!o.family.length) o.family = [defaults.family]
		o.family = o.family.map(function (f) {
			return fams[f] ? f : '"' + f + '"'
		}).join(', ')
	}

	// [ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ]
	var result = []

	result.push(o.style)
	if (o.variant !== o.style) result.push(o.variant)

	if (o.weight !== o.variant &&
		o.weight !== o.style) result.push(o.weight)

	if (o.stretch !== o.weight &&
		o.stretch !== o.variant &&
		o.stretch !== o.style) result.push(o.stretch)

	result.push(o.size + (o.lineHeight == null || o.lineHeight === 'normal' || (o.lineHeight + '' === '1')  ? '' : ('/' + o.lineHeight)))
	result.push(o.family)

	return result.filter(Boolean).join(' ')
}

function verify (value, values) {
	if (value && !values[value] && !globals[value]) throw Error('Unknown keyword `' + value +'`')

	return value
}


// ['a', 'b'] -> {a: true, b: true}
function a2o (a) {
	var o = {}
	for (var i = 0; i < a.length; i++) {
		o[a[i]] = 1
	}
	return o
}

},{"./lib/util":11,"css-font-stretch-keywords":7,"css-font-style-keywords":8,"css-font-weight-keywords":9,"css-global-keywords":14,"css-system-font-keywords":15,"pick-by-alias":17}],14:[function(require,module,exports){
module.exports=[
	"inherit",
	"initial",
	"unset"
]

},{}],15:[function(require,module,exports){
module.exports=[
	"caption",
	"icon",
	"menu",
	"message-box",
	"small-caption",
	"status-bar"
]

},{}],16:[function(require,module,exports){
'use strict'

/**
 * @module parenthesis
 */

function parse (str, opts) {
	// pretend non-string parsed per-se
	if (typeof str !== 'string') return [str]

	var res = [str]

	if (typeof opts === 'string' || Array.isArray(opts)) {
		opts = {brackets: opts}
	}
	else if (!opts) opts = {}

	var brackets = opts.brackets ? (Array.isArray(opts.brackets) ? opts.brackets : [opts.brackets]) : ['{}', '[]', '()']

	var escape = opts.escape || '___'

	var flat = !!opts.flat

	brackets.forEach(function (bracket) {
		// create parenthesis regex
		var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''))

		var ids = []

		function replaceToken(token, idx, str){
			// save token to res
			var refId = res.push(token.slice(bracket[0].length, -bracket[1].length)) - 1

			ids.push(refId)

			return escape + refId + escape
		}

		res.forEach(function (str, i) {
			var prevStr

			// replace paren tokens till there’s none
			var a = 0
			while (str != prevStr) {
				prevStr = str
				str = str.replace(pRE, replaceToken)
				if (a++ > 10e3) throw Error('References have circular dependency. Please, check them.')
			}

			res[i] = str
		})

		// wrap found refs to brackets
		ids = ids.reverse()
		res = res.map(function (str) {
			ids.forEach(function (id) {
				str = str.replace(new RegExp('(\\' + escape + id + '\\' + escape + ')', 'g'), bracket[0] + '$1' + bracket[1])
			})
			return str
		})
	})

	var re = new RegExp('\\' + escape + '([0-9]+)' + '\\' + escape)

	// transform references to tree
	function nest (str, refs, escape) {
		var res = [], match

		var a = 0
		while (match = re.exec(str)) {
			if (a++ > 10e3) throw Error('Circular references in parenthesis')

			res.push(str.slice(0, match.index))

			res.push(nest(refs[match[1]], refs))

			str = str.slice(match.index + match[0].length)
		}

		res.push(str)

		return res
	}

	return flat ? res : nest(res[0], res)
}

function stringify (arg, opts) {
	if (opts && opts.flat) {
		var escape = opts && opts.escape || '___'

		var str = arg[0], prevStr

		// pretend bad string stringified with no parentheses
		if (!str) return ''


		var re = new RegExp('\\' + escape + '([0-9]+)' + '\\' + escape)

		var a = 0
		while (str != prevStr) {
			if (a++ > 10e3) throw Error('Circular references in ' + arg)
			prevStr = str
			str = str.replace(re, replaceRef)
		}

		return str
	}

	return arg.reduce(function f (prev, curr) {
		if (Array.isArray(curr)) {
			curr = curr.reduce(f, '')
		}
		return prev + curr
	}, '')

	function replaceRef(match, idx){
		if (arg[idx] == null) throw Error('Reference ' + idx + 'is undefined')
		return arg[idx]
	}
}

function parenthesis (arg, opts) {
	if (Array.isArray(arg)) {
		return stringify(arg, opts)
	}
	else {
		return parse(arg, opts)
	}
}

parenthesis.parse = parse
parenthesis.stringify = stringify

module.exports = parenthesis

},{}],17:[function(require,module,exports){
'use strict'


module.exports = function pick (src, props, keepRest) {
	var result = {}, prop, i

	if (typeof props === 'string') props = toList(props)
	if (Array.isArray(props)) {
		var res = {}
		for (i = 0; i < props.length; i++) {
			res[props[i]] = true
		}
		props = res
	}

	// convert strings to lists
	for (prop in props) {
		props[prop] = toList(props[prop])
	}

	// keep-rest strategy requires unmatched props to be preserved
	var occupied = {}

	for (prop in props) {
		var aliases = props[prop]

		if (Array.isArray(aliases)) {
			for (i = 0; i < aliases.length; i++) {
				var alias = aliases[i]

				if (keepRest) {
					occupied[alias] = true
				}

				if (alias in src) {
					result[prop] = src[alias]

					if (keepRest) {
						for (var j = i; j < aliases.length; j++) {
							occupied[aliases[j]] = true
						}
					}

					break
				}
			}
		}
		else if (prop in src) {
			if (props[prop]) {
				result[prop] = src[prop]
			}

			if (keepRest) {
				occupied[prop] = true
			}
		}
	}

	if (keepRest) {
		for (prop in src) {
			if (occupied[prop]) continue
			result[prop] = src[prop]
		}
	}

	return result
}

var CACHE = {}

function toList(arg) {
	if (CACHE[arg]) return CACHE[arg]
	if (typeof arg === 'string') {
		arg = CACHE[arg] = arg.split(/\s*,\s*|\s+/)
	}
	return arg
}

},{}],18:[function(require,module,exports){
function readAs (file, as) {
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob')
  }
  return new Promise(function(resolve, reject) {
    var reader = new FileReader()
    reader.onload = function(e) { resolve(e.target.result) }
    reader.onerror = function(e) { reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
    reader['readAs' + as](file)
  })
}

function readAsDataURL (file) {
  return readAs(file, 'DataURL')
}

function readAsText (file) {
  return readAs(file, 'Text')
}

function readAsArrayBuffer (file) {
  return readAs(file, 'ArrayBuffer')
}

module.exports = {
  readAsDataURL: readAsDataURL,
  readAsText: readAsText,
  readAsArrayBuffer: readAsArrayBuffer,
}

},{}],19:[function(require,module,exports){
'use strict'

var paren = require('parenthesis')

module.exports = function splitBy (string, separator, o) {
	if (string == null) throw Error('First argument should be a string')
	if (separator == null) throw Error('Separator should be a string or a RegExp')

	if (!o) o = {}
	else if (typeof o === 'string' || Array.isArray(o)) {
		o = {ignore: o}
	}

	if (o.escape == null) o.escape = true
	if (o.ignore == null) o.ignore = ['[]', '()', '{}', '<>', '""', "''", '``', '“”', '«»']
	else {
		if (typeof o.ignore === 'string') {o.ignore = [o.ignore]}

		o.ignore = o.ignore.map(function (pair) {
			// '"' → '""'
			if (pair.length === 1) pair = pair + pair
			return pair
		})
	}

	var tokens = paren.parse(string, {flat: true, brackets: o.ignore})
	var str = tokens[0]

	var parts = str.split(separator)

	// join parts separated by escape
	if (o.escape) {
		var cleanParts = []
		for (var i = 0; i < parts.length; i++) {
			var prev = parts[i]
			var part = parts[i + 1]

			if (prev[prev.length - 1] === '\\' && prev[prev.length - 2] !== '\\') {
				cleanParts.push(prev + separator + part)
				i++
			}
			else {
				cleanParts.push(prev)
			}
		}
		parts = cleanParts
	}

	// open parens pack & apply unquotes, if any
	for (var i = 0; i < parts.length; i++) {
		tokens[0] = parts[i]
		parts[i] = paren.stringify(tokens, {flat: true})
	}

	return parts
}

},{"parenthesis":16}],20:[function(require,module,exports){
var reg = /[\'\"]/

module.exports = function unquote(str) {
  if (!str) {
    return ''
  }
  if (reg.test(str.charAt(0))) {
    str = str.substr(1)
  }
  if (reg.test(str.charAt(str.length - 1))) {
    str = str.substr(0, str.length - 1)
  }
  return str
}

},{}],21:[function(require,module,exports){
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

},{}]},{},[3]);
