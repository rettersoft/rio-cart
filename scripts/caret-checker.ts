import fs from 'fs'
import path from 'path'
;(function checkCarets() {
    const classNames = fs.readdirSync(path.resolve(__dirname, '../classes')).filter((file) => !file.startsWith('.'))
    for (const className of classNames) {
        const pkg = fs.readFileSync(path.resolve(__dirname, '../classes', className, 'package.json'), 'utf8')
        if (!pkg) throw new Error(`No package.json found for ${className}`)
        const pkgJson = JSON.parse(pkg)
        for (const dep of Object.entries<string>(pkgJson.dependencies)) {
            if (dep[1].includes('^')) {
                throw new Error(`${className} has a caret in ${dep[0]} as ${dep[1]}`)
            }
        }
    }
})()
