import {VARIATION_SELECTOR} from "@regexp-extra/variation-selector";

export function removeAll(s: string): string {
    return s.replace(VARIATION_SELECTOR, "");
}

export function textStyle(s: string): string {
    return s.replace(/./g, "$&\uFE0E");
}