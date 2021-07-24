const fs = require("fs")
const path = require("path")
const util = require("util")
const nunjucks = require("nunjucks")
const dive = require("dive")

module.exports = (baseOutputDir, baseInputDir) => {
  nunjucks.configure(baseInputDir, {autoescape: true})
  render = util.promisify(nunjucks.render)
  writeFile = util.promisify(fs.writeFile)
  copyFile = util.promisify(fs.copyFile)

  dive(baseInputDir, {files: true}, (err, inputFilePath, stat) => {
    if (err) {
      console.error(`error file: ${err}`)
      return
    }
    const fileBaseName = path.basename(inputFilePath)
    if (fileBaseName.startsWith("_")) {
      console.info(`skipping ignored: ${inputFilePath}`)
      return
    }

    inputFilePath = path.relative(baseInputDir, inputFilePath)
    const outputDir = path.join(baseOutputDir, path.dirname(inputFilePath))
    const outputFilePath = path.join(baseOutputDir, inputFilePath)
    if (!fs.existsSync(outputDir))
      fs.mkdirSync(outputDir, {recursive: true})
    render(inputFilePath)
      .then(output => writeFile(outputFilePath, output))
      .catch(err => {
        console.error(`error rendering, attempting copy: ${err}`)
        return copyFile(inputFilePath, outputFilePath)
      })
      .catch(err => {
        console.error(`error copying: ${err}`)
      })
  })
}
