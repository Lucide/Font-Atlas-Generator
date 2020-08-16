// Type definitions for font-atlas 2.1.0
// Project: https://github.com/hughsk/font-atlas
// Definitions by: Lucide <https://github.com/Lucide>
// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('font-atlas');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from 'font-atlas';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

export interface IFont {
    style: string;
    variant: string;
    weight: string;
    stretch: string;
    size: string;
    family: string[];
}

export interface IOptions {
    canvas: HTMLCanvasElement;
    font: IFont | string;
    shape: [number, number];
    step: [number, number];
    chars: string;
}

export default function atlas(fontAtlasInput: IOptions): HTMLCanvasElement;

