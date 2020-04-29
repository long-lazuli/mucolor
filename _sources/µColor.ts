const colorsRegex = (function (){
  return /^(?:(rgb|hsl)a?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0\.\d+))?\s*\)$/i
})()

type colors = [number, number, number]
type colorsAndAlpha = [number, number, number, number]

const $el = document.createElement('div')
$el.style.setProperty('display', 'none')

export class µColor {

  private values = { rgb: [0,0,0], hsl: [0,0,0], a: 1 }

  constructor( value?: string){
    const [r, g, b, a] = this.string2rgba( value || µColor.from(document.body).toString() )
    this.updateRGB(r, g, b)
    this.values.a = a
  }

  
  static from( el: HTMLElement, propertyName: string = 'color' ) {
    return new µColor( window.getComputedStyle( el ).getPropertyValue(propertyName) )
  }


  private updateRGB(...rgb: colors) {
    this.values.rgb = rgb
    this.values.hsl = this.rgb2hsl(...rgb)
  }
  private updateHSL(...hsl: colors) {
    this.values.hsl = hsl
    this.values.rgb = this.hsl2rgb(...hsl)
  }

  private string2rgba( colorStr: string ): colorsAndAlpha {
    
    if( ! ['(', ')'].every( _ => colorStr.includes(_) ) ){
      document.body.appendChild($el)
      $el.style.setProperty('color', colorStr)
      colorStr = window.getComputedStyle($el).getPropertyValue('color')
      document.body.removeChild($el)
    }
    
    const colorsMatches = colorStr.match(colorsRegex)
    if( !colorsMatches ) return [0,0,0,1]

    const [, HSLorRGB, c1= '0', c2= '0', c3= '0', a = '1'] = colorsMatches
    const isHSL = HSLorRGB.substr(0, 3) === 'hsl'

    const colorsNumbers = [c1, c2, c3].map( _ => parseInt(_, 10) )
    
    return [
      ...( isHSL ? this.hsl2rgb(...colorsNumbers as colors) : colorsNumbers ),
      parseFloat(a)
    ] as colorsAndAlpha
  }

  // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
  private hsl2rgb(h: number, S: number, L: number) {
    const [s, l] = [S, L].map(_ => _ / 100)

    const a=s*Math.min(l,1-l)
    const f= (n: number,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1)

    return [f(0),f(8),f(4)].map( _ => Math.floor(_ * 255) )
  }

  // in: r,g,b in [0,255], out: h in [0,360) and s,v in [0,100]
  private rgb2hsl(R: number, G: number, B: number) {
    const [r,g,b] = [R,G,B].map( _ => _ / 255 )

    const a=Math.max(r,g,b), n=a-Math.min(r,g,b), f=(1-Math.abs(a+a-n-1))
    const h= n && ((a==r) ? (g-b)/n : ((a==g) ? 2+(b-r)/n : 4+(r-g)/n))
    
    return [60*(h<0?h+6:h), (f ? n/f : 0) * 100, ((a+a-n)/2) * 100]
  }


  toString(hsla?: boolean){
    if( hsla ){
      const [h, s, l, a] = this.hsla
      return a === 1
        ? `hsl(${h}, ${s}%, ${l}%)`
        : `hsla(${h}, ${s}%, ${l}%, ${a})`
    }else{
      const [r, g, b, a] = this.rgba
      return a === 1
        ? `rgb(${r}, ${g}, ${b})`
        : `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }


  get rgb(){ return this.values.rgb }
  get rgba(){ return [...this.values.rgb, this.values.a] }

  get hsl(){ return this.values.hsl }
  get hsla(){ return [...this.values.hsl, this.values.a] }

  
  get alpha(){ return this.values.a }
  set alpha( _: number ){ this.values.a = _ }


  get red(){ return this.rgb[0] }
  set red( _: number ){ const [, g, b] = this.rgba;  this.updateRGB(_, g, b) }

  get green(){ return this.rgb[1] }
  set green( _: number ){ const [r,, b] = this.rgba; this.updateRGB(r, _, b) }

  get blue(){ return this.rgb[2] }
  set blue( _: number ){ const [r, g,] = this.rgba; this.updateRGB(r, g, _) }


  get hue(){ return this.hsl[0] }
  set hue( _: number ){ const [, s, l] = this.hsla; this.updateHSL(_, s, l) }

  get saturation(){ return this.hsl[1] }
  set saturation( _: number ){ const [h,,l] = this.hsla; this.updateHSL(h, _, l) }

  get lightness(){ return this.hsl[2] }
  set lightness( _: number ){ const [h, s,] = this.hsla; this.updateHSL(h, s, _ ) }

  get brightness() {
    const [r,g,b] = this.rgb
    return r*0.2126 + g*0.7152 + b*0.0722
  }
}

(global as any).µColor = µColor;
