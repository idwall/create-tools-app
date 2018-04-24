'use strict'

// Packages
const execa = require('execa')

// Lib
const messages = require('./../messages')

// Utils
const getInstallCmd = require('./get-install-cmd')
const output = require('./output')

function install(opts) {
  const projectName = opts.projectName
  const projectPath = opts.projectPath
  const packages = opts.packages || []
  const devPackages = opts.devPackages || []

  if (packages.length === 0) {
    console.log('Missing packages in `install`, try running again.')
    process.exit(1)
  }

  const installCmd = getInstallCmd()
  const installArgs = getInstallArgs(installCmd, packages, { isDev: false })
  const installArgsDev = getInstallArgs(installCmd, devPackages, {
    isDev: true
  })

  console.log(messages.installing(packages))
  process.chdir(projectPath)

  return new Promise((resolve, reject) => {
    const stopInstallSpinner = output.wait('Installing modules')

    Promise.all([
      execa(installCmd, installArgs),
      execa(installCmd, installArgsDev)
    ])
      .then(() => {
        // Confirm that all dependencies were installed
        return execa(installCmd, ['install'])
      })
      .then(() => {
        stopInstallSpinner()
        output.success(`Installed dependencies for ${projectName}`)
        resolve()
      })
      .catch(() => {
        stopInstallSpinner()
        console.log(messages.installError(packages))
        return reject(new Error(`${installCmd} installation failed`))
      })
  })
}

function getInstallArgs(cmd, packages, { isDev }) {
  if (cmd === 'npm') {
    const args = ['install', '--save', '--save-exact']
    const argDev = isDev ? args.concat('--save-dev') : args

    return argDev.concat(packages, ['--verbose'])
  }

  const args = ['add']
  const argDev = isDev ? args.concat('--dev') : args

  return argDev.concat(packages)
}

module.exports = install
