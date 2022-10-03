import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

interface Template {
  init: {
    inputModel: string
    outputModel: string
    queryStringModel: string
  },
  get:{
    inputModel: string
    outputModel: string
    queryStringModel: string
  }
  methods: {
    inputModel: string
    outputModel: string
    queryStringModel: string
  }[]
}

const findAllModelsInTemplates = () => {
  const classNames = fs.readdirSync(path.join(__dirname, '../classes'))

  const models = new Set<string>()

  for (const className of classNames) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const templateFile = YAML.parse(fs.readFileSync(path.join(__dirname, '../classes', className, 'template.yml'), 'utf8')) as Template

      if (templateFile.init && templateFile.init.inputModel && !models.has(templateFile.init.inputModel)) {
        models.add(templateFile.init.inputModel)
      }

      if (templateFile.init && templateFile.init.outputModel && !models.has(templateFile.init.outputModel)) {
        models.add(templateFile.init.outputModel)
      }

      if (templateFile.get && templateFile.get.inputModel && !models.has(templateFile.get.inputModel)) {
        models.add(templateFile.get.inputModel)
      }

      if (templateFile.get && templateFile.get.outputModel && !models.has(templateFile.get.outputModel)) {
        models.add(templateFile.get.outputModel)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      for (const method of templateFile.methods) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (method.inputModel && !models.has(method.inputModel)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          models.add(method.inputModel)
        }
        if (method.outputModel && !models.has(method.outputModel)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          models.add(method.outputModel)
        }

        if (method.queryStringModel && !models.has(method.queryStringModel)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          models.add(method.queryStringModel)
        }
      }
    } catch (e) {

    }
  }
  return Array.from(models)
}

const findUnusedModels = () => {
  const allModels = findAllModelsInTemplates()
  const modelNames = fs.readdirSync(path.join(__dirname, '../models'))

  let count = 0

  for (const modelName of modelNames) {
    const base = modelName.split('.')[0]
    if (!allModels.includes(base)) {
      console.log(`${base} is unused`)
      count++
    }
  }
  console.log(`${count} unused models`)
}

findUnusedModels()
