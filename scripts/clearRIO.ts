import fs from 'node:fs'
import path from 'node:path'

;(() => {
  const classNames = fs.readdirSync(path.resolve(__dirname, '../classes'))
  for (const className of classNames) {
    try {
      fs.rmSync(path.resolve(__dirname, '../classes', className, 'rio.ts'))
      fs.rmSync(path.resolve(__dirname, '../classes', className, 'rio.d.ts'))
    } catch {
      console.log(`Ignoring ${className}`)
    }
  }
})()
