const colorsRegex = (function () {
    return /^(?:(rgb|hsl)a?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0\.\d+))?\s*\)$/i;
})();
const $el = document.createElement('div');
$el.style.setProperty('display', 'none');
export class µColor {
    constructor(value) {
        this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], a: 1 };
        const [r, g, b, a] = this.string2rgba(value || µColor.from(document.body).toString());
        this.updateRGB(r, g, b);
        this.values.a = a;
    }
    static from(el, propertyName = 'color') {
        return new µColor(window.getComputedStyle(el).getPropertyValue(propertyName));
    }
    updateRGB(...rgb) {
        this.values.rgb = rgb;
        this.values.hsl = this.rgb2hsl(...rgb);
    }
    updateHSL(...hsl) {
        this.values.hsl = hsl;
        this.values.rgb = this.hsl2rgb(...hsl);
    }
    string2rgba(colorStr) {
        if (!['(', ')'].every(_ => colorStr.includes(_))) {
            document.body.appendChild($el);
            $el.style.setProperty('color', colorStr);
            colorStr = window.getComputedStyle($el).getPropertyValue('color');
            document.body.removeChild($el);
        }
        const colorsMatches = colorStr.match(colorsRegex);
        if (!colorsMatches)
            return [0, 0, 0, 1];
        const [, HSLorRGB, c1 = '0', c2 = '0', c3 = '0', a = '1'] = colorsMatches;
        const isHSL = HSLorRGB.substr(0, 3) === 'hsl';
        const colorsNumbers = [c1, c2, c3].map(_ => parseInt(_, 10));
        return [
            ...(isHSL ? this.hsl2rgb(...colorsNumbers) : colorsNumbers),
            parseFloat(a)
        ];
    }
    // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
    hsl2rgb(h, S, L) {
        const [s, l] = [S, L].map(_ => _ / 100);
        const a = s * Math.min(l, 1 - l);
        const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [f(0), f(8), f(4)].map(_ => Math.floor(_ * 255));
    }
    // in: r,g,b in [0,255], out: h in [0,360) and s,v in [0,100]
    rgb2hsl(R, G, B) {
        const [r, g, b] = [R, G, B].map(_ => _ / 255);
        const a = Math.max(r, g, b), n = a - Math.min(r, g, b), f = (1 - Math.abs(a + a - n - 1));
        const h = n && ((a == r) ? (g - b) / n : ((a == g) ? 2 + (b - r) / n : 4 + (r - g) / n));
        return [60 * (h < 0 ? h + 6 : h), (f ? n / f : 0) * 100, ((a + a - n) / 2) * 100];
    }
    toString(hsla) {
        if (hsla) {
            const [h, s, l, a] = this.hsla;
            return a === 1
                ? `hsl(${h}, ${s}%, ${l}%)`
                : `hsla(${h}, ${s}%, ${l}%, ${a})`;
        }
        else {
            const [r, g, b, a] = this.rgba;
            return a === 1
                ? `rgb(${r}, ${g}, ${b})`
                : `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    }
    get rgb() { return this.values.rgb; }
    get rgba() { return [...this.values.rgb, this.values.a]; }
    get hsl() { return this.values.hsl; }
    get hsla() { return [...this.values.hsl, this.values.a]; }
    get alpha() { return this.values.a; }
    set alpha(_) { this.values.a = _; }
    get red() { return this.rgb[0]; }
    set red(_) { const [, g, b] = this.rgba; this.updateRGB(_, g, b); }
    get green() { return this.rgb[1]; }
    set green(_) { const [r, , b] = this.rgba; this.updateRGB(r, _, b); }
    get blue() { return this.rgb[2]; }
    set blue(_) { const [r, g,] = this.rgba; this.updateRGB(r, g, _); }
    get hue() { return this.hsl[0]; }
    set hue(_) { const [, s, l] = this.hsla; this.updateHSL(_, s, l); }
    get saturation() { return this.hsl[1]; }
    set saturation(_) { const [h, , l] = this.hsla; this.updateHSL(h, _, l); }
    get lightness() { return this.hsl[2]; }
    set lightness(_) { const [h, s,] = this.hsla; this.updateHSL(h, s, _); }
}
global.µColor = µColor;
//# sourceMappingURL=µColor.js.map