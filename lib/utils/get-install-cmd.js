'use strict'

// Packages
const execa = require('execa')

const getInstallCmd = () => {
  let cmd

  try {
    execa.shellSync('yarnpkg --version')
    cmd = 'yarn'
  } catch (e) {
    cmd = 'npm'
  }

  return cmd
}

module.exports = getInstallCmd
