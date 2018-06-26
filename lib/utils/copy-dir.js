'use strict'

// Packages
const path = require('path')
const fs = require('fs-extra')

// Lib
const messages = require('./../messages')

// Utils
const output = require('./output')

function copyDir(opts) {
  const templatePath = opts.templatePath
  const projectPath = opts.projectPath
  const projectName = opts.projectName

  console.log(messages.copying(projectName))

  return new Promise((resolve, reject) => {
    const stopCopySpinner = output.wait('Copying files')

    fs
      .copy(templatePath, projectPath)
      .then(() => {
        return fs.move(
          path.resolve(projectPath, './gitignore'),
          path.resolve(projectPath, './.gitignore')
        )
      })
      .then(() => {
        return fs.move(
          path.resolve(projectPath, './babelrc'),
          path.resolve(projectPath, './.babelrc')
        )
      })
      .then(() => {
        return fs.move(
          path.resolve(projectPath, './env.example'),
          path.resolve(projectPath, './.env.example')
        )
      })
      .then(() => {
        return fs.move(
          path.resolve(projectPath, './env'),
          path.resolve(projectPath, './.env')
        )
      })
      .then(() => {
        stopCopySpinner()
        output.success(
          `Created files for "${output.cmd(projectName)}" tools app`
        )
        return this
      })
      .then(resolve)
      .catch(err => {
        console.error(err)
        stopCopySpinner()
        output.error('Copy command failed, try again.')
        reject(err)
        process.exit(1)
      })
  })
}

module.exports = copyDir
