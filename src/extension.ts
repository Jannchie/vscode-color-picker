import * as vscode from 'vscode'
import parse from 'parse-css-color'
import Color from './color'

interface Match {
  color: vscode.Color
  type: string
  length: number
  range: vscode.Range
}

function parseColorString(color: string) {
  try {
    const p = parse(color)
    if (!p) {
      return null
    }
    if (p.type === 'rgb') {
      const r = p.values[0] as number
      const g = p.values[1] as number
      const b = p.values[2] as number
      const a = p.alpha as number
      return new vscode.Color(r / 255, g / 255, b / 255, a)
    }
    else {
      const h = p.values[0] as number
      const s = p.values[1] as number
      const l = p.values[2] as number
      const a = p.alpha as number
      const { r, g, b } = Color.fromHsl(h, s, l).toRgb()
      return new vscode.Color(r / 255, g / 255, b / 255, a)
    }
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}

function getPos(text: string, index: number): vscode.Position {
  const nMatches = Array.from(text.slice(0, index).matchAll(/\n/g))
  const lineNumber = nMatches.length
  if (lineNumber === 0) {
    return new vscode.Position(0, index)
  }
  const characterIndex = index - nMatches[lineNumber - 1].index

  return new vscode.Position(
    lineNumber,
    characterIndex - 1,
  )
}

class Matcher {
  static getMatches(text: string): Match[] {
    const matches = text.matchAll(/#(?:[\da-f]){8}|#(?:[\da-f]){6}|#(?:[\da-f]){4}|#(?:[\da-f]){3}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\)/gi)
    return Array.from(matches).map((match) => {
      const t = match[0]
      const length = t.length
      let type: string
      if (t.startsWith('hsl(')) {
        type = 'hsl'
      }
      else if (t.startsWith('hsla(')) {
        type = 'hsla'
      }
      else if (t.startsWith('rgb(')) {
        type = 'rgb'
      }
      else if (t.startsWith('rgba(')) {
        type = 'rgba'
      }
      else if (t.startsWith('#')) {
        type = 'hex'
      }
      const range = new vscode.Range(
        getPos(text, match.index),
        getPos(text, match.index + t.length),
      )
      const color = parseColorString(t)

      if (color) {
        return {
          color,
          type,
          length,
          range,
        } as Match
      }
      return null
    }).filter(d => d !== null)
  }
}

class Picker {
  constructor() {
    const subscriptions: vscode.Disposable[] = []
    vscode.workspace.onDidChangeTextDocument(this._onDidChangeTextDocument, this, subscriptions)
    vscode.workspace.onDidChangeConfiguration(this._onDidChangeConfiguration, this, subscriptions)
    this.register()
  }

  private get languages() {
    return vscode.workspace.getConfiguration('vscode-better-color-picker').get('languages') as Array<string>
  }

  private _onDidChangeTextDocument(_e: vscode.TextDocumentChangeEvent) {
    // const editor = vscode.window.activeTextEditor
    // const document = e.document
    // const text = document.getText()
  }

  private _onDidChangeConfiguration() {

  }

  private register() {
    this.languages.forEach((language) => {
      vscode.languages.registerColorProvider(language, {

        provideDocumentColors(document: vscode.TextDocument, _token: vscode.CancellationToken) {
          const matches = Matcher.getMatches(document.getText())

          return matches.map((match, _i) => new vscode.ColorInformation(
            match.range,
            match.color,
          ))
        },
        provideColorPresentations(color, context, _token) {
          const c = Color.fromRgb(color.red * 255, color.green * 255, color.blue * 255)
          c.alpha = color.alpha
          const colString = context.document.getText(context.range)
          const t = colString

          const presentationHex = new vscode.ColorPresentation(c.toString('hex'))
          const presentationHexa = new vscode.ColorPresentation(c.toString('hexa'))
          const presentationHsl = new vscode.ColorPresentation(c.toString('hsl'))
          const presentationHsla = new vscode.ColorPresentation(c.toString('hsla'))
          const presentationRgb = new vscode.ColorPresentation(c.toString('rgb'))
          const presentationRgba = new vscode.ColorPresentation(c.toString('rgba'))

          let hasAlpha = false
          if (t.startsWith('#') && ((t.length === 9) || t.length === 5)) {
            hasAlpha = true
          }
          if (t.startsWith('hsla')) {
            hasAlpha = true
          }
          if (t.startsWith('rgba')) {
            hasAlpha = true
          }
          if (color.alpha !== 1) {
            hasAlpha = true
          }

          const withAlpha = [
            presentationHexa,
            presentationHsla,
            presentationRgba,
          ]

          const withoutAlpha = [
            presentationHex,
            presentationHsl,
            presentationRgb,
          ]
          return hasAlpha ? withAlpha : withoutAlpha
        },
      })
    })
  }

  dispose() {}
}

export function activate(context: vscode.ExtensionContext) {
  const picker = new Picker()
  context.subscriptions.push(picker)
}

// this method is called when your extension is deactivated
export function deactivate() {}
