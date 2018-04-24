'use strict'

// Packages
const chalk = require('chalk')

// Utils
const getInstallCmd = require('./utils/get-install-cmd')
const output = require('./utils/output')

const program = { name: 'create-tools-app' }

exports.help = () => {
  return `
   Only ${chalk.green('<project-directory>')} is required.
   If you have any problems, do not hesitate to file an issue:
     ${chalk.cyan('https://github.com/idwall/create-tools-app/issues/new')}
 `
}

exports.exampleHelp = () => {
  return `Example from https://github.com/idwall/create-tools-app/tree/master/examples/ ${output.param(
    'example-path'
  )}`
}

exports.missingProjectName = () => {
  return `
Please specify the project directory:
 ${chalk.cyan(program.name)} ${chalk.green('<project-directory>\n')}
For example:
 ${chalk.cyan(program.name)} ${chalk.green(
    '<project-directory>'
  )} ${chalk.green('with-graphql')}
 ${chalk.cyan(program.name)} ${chalk.green(
    '<project-directory>'
  )} ${chalk.green('with-redux')} ${chalk.cyan('--webpack\n')}
Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`
}

exports.alreadyExists = projectName => {
  return `
Uh oh! Looks like there's already a directory called ${chalk.red(
    projectName
  )}. Please try a different name or delete that folder.`
}

exports.installing = packages => {
  const pkgText = packages
    .map(pkg => {
      return `    ${chalk.cyan(chalk.bold(pkg))}`
    })
    .join('\n')

  return `
 Installing npm modules:
${pkgText}
`
}

exports.installError = packages => {
  const pkgText = packages
    .map(pkg => {
      return `${chalk.cyan(chalk.bold(pkg))}`
    })
    .join(', ')

  output.error(`Failed to install ${pkgText}, try again.`)
}

exports.copying = projectName => {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`
}

exports.start = projectName => {
  const cmd = getInstallCmd()

  const commands = {
    install: cmd === 'npm' ? 'npm install' : 'yarn',
    build: cmd === 'npm' ? 'npm run build' : 'yarn build',
    start: cmd === 'npm' ? 'npm run start' : 'yarn start',
    dev: cmd === 'npm' ? 'npm run dev' : 'yarn dev'
  }

  return `
 ${chalk.green('Awesome!')} You're now ready to start coding.
 We already ran ${output.cmd(commands.install)} for you, so your next steps are:
 $ ${output.cmd(`cd ${projectName}\n`)}
 To build a version for production:
 $ ${output.cmd(commands.build)}\n
 To run the server in production:
 $ ${output.cmd(commands.start)}\n
 To start a local server for development:
 $ ${output.cmd(commands.dev)}\n
 Questions? Feedback? Please let us know!
 ${chalk.green('https://github.com/idwall/create-tools-app/issues')}
`
}
