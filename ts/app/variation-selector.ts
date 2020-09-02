//https://www.npmjs.com/package/strip-variation-selectors

export function removeAll(s: string): string {
    return s.replace(/([\u180B-\u180D\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])/g, "");
}

export function textStyle(s: string): string {
    return s.replace(/./gu, "$&\uFE0E");
}