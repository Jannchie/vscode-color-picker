declare module 'parse-css-color' {
  export default function parseCssColor(input: string): {
    type: string
    values: any[]
    alpha: number
  } | null
}
