'use strict'

// Packages
const exec = require('execa')

// Utils
const output = require('./output')

function loadExample({ projectName, example }) {
  const cmds = [
    `mkdir -p ${projectName}`,
    `curl https://codeload.github.com/idwall/create-tools-app/tar.gz/master | tar -xz -C ${projectName} --strip=3 create-tools-app-master/examples/${example}`
  ]

  const stopExampleSpinner = output.wait(
    `Downloading files for ${output.cmd(example)} example`
  )
  const cmdPromises = cmds.map(cmd => exec.shell(cmd))

  return Promise.all(cmdPromises).then(() => {
    stopExampleSpinner()
    output.success(
      `Downloaded ${output.cmd(example)} files for ${output.cmd(projectName)}`
    )
  })
}

module.exports = loadExample
