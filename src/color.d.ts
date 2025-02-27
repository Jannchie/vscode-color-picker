interface SchemeOptions {

}
interface monochromeOptions extends SchemeOptions {
  /**
   * results - Number of results to return.
   * Min - 3
   * Default - 3
   */
  results: number
}

interface splitComplementaryOptions extends SchemeOptions {
  /**
   * angle - angle to shift hue by for calculating the return colors.
   * Range - [ 0 - 360 ]
   */
  angle: number
}

interface doubleComplementaryOptions extends SchemeOptions {
  /**
   * angle - angle to shift hue by for calculating the return colors.
   * Range - [ 0 - 360 ]
   */
  angle: number
}

interface tetradicOptions extends SchemeOptions {
  /**
   * angle - angle to shift hue by for calculating the return colors.
   * Range - [ 0 - 360 ]
   */
  angle: number
}

interface analogousOptions extends SchemeOptions {
  /**
   * angle - angle to shift hue by for calculating the return colors.
   * Range - [ 0 - 360 ]
   */
  angle: number
}

interface HSL {
  /** hue */
  h: number
  /** saturation */
  s: number
  /** luminance */
  l: number
}

interface HSV {
  /** hue */
  h: number
  /** saturation */
  s: number
  /** value */
  v: number
}

interface RGB {
  /** red */
  r: number
  /** green */
  g: number
  /** blue */
  b: number
}

interface CMYK {
  /** cyan */
  c: number
  /** magenta */
  m: number
  /** yellow */
  y: number
  /** black */
  k: number
}

export class Color {
  constructor(r: number, g: number, b: number)

  public alpha: number
  // #region color schemes

  /** returns a color scheme Number[] array of the given color (alias for Color.createScheme) */
  static getScheme(color: Color, name: string, options?: SchemeOptions): Color[]

  /** returns an array of colors of the color pallette of the color */
  getScheme(name: string, options?: object): Color[]

  /** creates and returns a color scheme Number[] array of the given color */
  static createScheme(color: Color, name: string, options?: SchemeOptions): Color[]

  /** returns a monochrome color scheme Number[] array of the given color */
  static monochromatic(color: Color, options: monochromeOptions): Color[]

  /** returns a monochrome color scheme Number[] array of the color */
  monochromatic(options: monochromeOptions): Color[]

  /** returns complementary color of the given color */
  static complementary(color: Color): Color

  /** returns complementary color of the color */
  complementary(): Color

  /** returns a Color[3] array splitComplementary colors of the given color */
  static splitComplementary(color: Color, options: splitComplementaryOptions): Color[]

  /** returns a Color[3] array of splitComplementary colors of the color */
  splitComplementary(options: splitComplementaryOptions): Color[]

  /** returns a Color[4] array doubleComplementary colors of the given color */
  static doubleComplementary(color: Color, options: doubleComplementaryOptions): Color[]

  /** returns a Color[4] array of doubleComplementary colors of the color */
  doubleComplementary(options: doubleComplementaryOptions): Color[]

  /** returns a Color[4] array square colors of the given color */
  static square(color: Color): Color[]

  /** returns a Color[4] array of square colors of the color */
  square(): Color[]

  /** returns a Color[4] array tetradic colors of the given color */
  static tetradic(color: Color, options: tetradicOptions): Color[]

  /** returns a Color[4] array of tetradic colors of the color */
  tetradic(options: tetradicOptions): Color[]

  /** returns a Color[3] array triadic colors of the given color */
  static triadic(color: Color): Color[]

  /** returns a Color[3] array of triadic colors of the color */
  triadic(): Color[]

  /** returns a Color[3] array analogous colors of the given color */
  static analogous(color: Color, options: analogousOptions): Color[]

  /** returns a Color[3] array of analogous colors of the color */
  analogous(options: analogousOptions): Color[]

  // #endregion

  // #region from and to methods

  /** returns a color using a hex code */
  static fromHex(hex: string): Color

  /** returns a color using red, green and blue values */
  static fromRgb(r: number, g: number, b: number): Color

  /** returns a color using a hue, saturation and luminance values */
  static fromHsl(hue: number, sat: number, lum: number): Color

  /** returns a color using a hue, saturation and value values */
  static fromHsv(hue: number, sat: number, val: number): Color

  /** returns a color using css string (only available for dom) */
  static fromCssString(colorString: string): Color

  /** returns a color's hex value as string */
  static toHex(color: Color): string

  /** returns an object with hsl values of the color */
  static toHsl(color: Color): HSL

  /** returns an object with hsv values of the color */
  static toHsv(color: Color): HSV

  /** returns an object with rgb values of the color */
  static toRgb(color: Color): RGB

  /** returns a random color */
  static random(): Color

  /** returns an object with hsl values of the color */
  toHsl(): HSL

  /** returns an object with hsv values of the color */
  toHsv(): HSV

  /** returns an object with rgb values of the color */
  toRgb(): RGB

  /** returns an object with cmyk value of the color */
  toCmyk(): CMYK

  /** returns a color's hex value as string */
  toHex(): string

  // #endregion

  // #region mix methods

  /** returns the color desaturated by the given amount */
  static desaturate(color: Color, amount: number): Color

  /** returns the color desaturated by the given amount */
  desaturate(amount: number): Color

  /** returns the color saturateed by the given amount */
  static saturate(color: Color, amount: number): Color

  /** returns the color saturated by the given amount */
  saturate(amount: number): Color

  /** returns the greyscale color */
  static greyscale(): Color

  /** returns the color desaturated by the given amount */
  greyscale(): Color

  /** returns the color lightened by the given amount */
  static lighten(color: Color, amount: number): Color

  /** returns the color lightened by the given amount */
  lighten(amount: number): Color

  /** returns the color darkened by the given amount */
  static darken(color: Color, amount: number): Color

  /** returns the color darkened by the given amount */
  darken(amount: number): Color

  /** returns the color brightened by the given amount */
  static brighten(color: Color, amount: number): Color

  /** returns the color brightened by the given amount */
  brighten(amount: number): Color

  /** returns the color with hue shifted by the given amount */
  static shiftHue(color: Color, amount: number): Color

  /** returns the color with hue shifted by the given amount */
  shiftHue(amount: number): Color

  /** Multiplies two colors and returns a new color */
  static multiply(color1: Color, color2: Color): Color

  /** Multiplies two colors and returns a new color */
  multiply(color: Color): Color

  /** Mix two colors and returns a new color */
  static mix(color1: Color, color2: Color, amount: number): Color

  /** Mix two colors and returns a new color */
  mix(color: Color, amount: number): Color

  /** lerps two colors and returns a new color */
  static lerp(color1: Color, color2: Color, t: number): Color

  /** lerps with the color and returns a new color */
  lerp(color: Color, t: number): Color

  /** adds two colors and returns a new color */
  static add(color1: Color, color2: Color): Color

  /** adds with the color and returns a new color */
  add(color: Color): Color

  // #endregion

  /** returns a string representation of the color */
  toString(type: 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk' | 'hsla' | 'rgba' | 'hexa'): string

  /** returns a number representation of the color */
  valueOf(): number
}

export default Color
