import fs from 'fs'
import { getOptions } from 'loader-utils'

const traverse = (dir, recurse) => {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const path = `${dir}/${file}`
    const stat = fs.statSync(path)
    if (stat && stat.isDirectory()) {
      if (recurse) {
        /* Recurse into a subdirectory */
        results = results.concat(traverse(path, recurse))
      }
    } else {
      /* Is a file */
      const contents = fs.readFileSync(path, { encoding: 'utf-8' })
      results.push({ path, contents })
    }
  })
  return results
}

export default function(source) {
  const options = getOptions(this)
  const settings = {
    path: './partials',
    recurse: false,
    suffix: '.mustache',
    modifyTemplateKey: [],
    ...options,
  }

  const partialsFound = traverse(settings.path, settings.recurse)

  const partialMap = partialsFound.reduce((prev, { path, contents }) => {
    if (!path.endsWith(settings.suffix)) {
      return prev
    }

    const keyName = settings.modifyTemplateKey.reduce((previousPath, [replace, value]) => {
      return previousPath.replace(replace, value || '')
    }, path)

    return {
      ...prev,
      [keyName]: contents,
    }
  }, {})

  return {
    template: source,
    partials: partialMap,
  }
}
