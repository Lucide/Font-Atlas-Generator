export interface IFont {
    style: string
    variant: string
    weight: string
    stretch: string
    size: string
    lineHeight: string | number
    family: string[]
}

export function stringify(font: IFont): string;

export function parse(font: string): IFont;