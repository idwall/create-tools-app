'use strict'

// Packages
const fs = require('fs')
const path = require('path')

// Lib
const messages = require('./messages')

// Utils
const copyDir = require('./utils/copy-dir')
const install = require('./utils/install')
const loadExample = require('./utils/load-example')

function createToolsApp({ projectName, example }) {
  if (!projectName) {
    console.log(messages.missingProjectName())
    process.exit(1)
  }

  if (fs.existsSync(projectName) && projectName !== '.') {
    console.log(messages.alreadyExists(projectName))
    process.exit(1)
  }

  const projectPath = process.cwd() + '/' + projectName

  if (example) {
    loadExample({ projectName, example }).then(
      installWithMessageFactory({ projectName, example, projectPath })
    )
  } else {
    const templatePath = path.resolve(__dirname, './templates/default')

    copyDir({
      templatePath,
      projectPath,
      projectName
    })
      .then(installWithMessageFactory({ projectName, example, projectPath }))
      .catch(err => {
        throw err
      })
  }
}

function installWithMessageFactory({ projectName, projectPath }) {
  // eslint-disable-next-line func-names
  return function installWithMessage() {
    return install({
      projectName,
      projectPath,
      packages: [
        'react',
        'react-dom',
        'next',
        'prop-types',
        'babel-plugin-inline-dotenv',
        'babel-plugin-transform-inline-environment-variables'
      ],
      devPackages: [
        'xo',
        'eslint-config-prettier',
        'eslint-plugin-react',
        'lint-staged',
        'prettier',
        'husky'
      ]
    })
      .then(() => {
        console.log(messages.start(projectName))
      })
      .catch(err => {
        throw err
      })
  }
}

module.exports = createToolsApp
