export declare class µColor {
    private values;
    constructor(value?: string);
    static from(el: HTMLElement, propertyName?: string): µColor;
    private updateRGB;
    private updateHSL;
    private string2rgba;
    private hsl2rgb;
    private rgb2hsl;
    toString(hsla?: boolean): string;
    readonly rgb: number[];
    readonly rgba: number[];
    readonly hsl: number[];
    readonly hsla: number[];
    alpha: number;
    red: number;
    green: number;
    blue: number;
    hue: number;
    saturation: number;
    lightness: number;
}
//# sourceMappingURL=µColor.d.ts.map