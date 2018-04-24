'use strict'

// Packages
const { eraseLine } = require('ansi-escapes')
const chalk = require('chalk')
const ora = require('ora')
const ms = require('ms')
const shoutSuccess = require('shout-success')
const shoutMessage = require('shout-message')
const shoutError = require('shout-error')

exports.info = msg => shoutMessage(msg)

exports.error = msg => {
  if (msg instanceof Error) {
    msg = msg.message
  }

  shoutError(msg)
}

exports.success = msg => shoutSuccess(msg)

exports.time = () => {
  const start = new Date()
  return shoutMessage(`[${ms(new Date() - start)}]`)
}

exports.wait = msg => {
  const spinner = ora(chalk.green(msg))
  spinner.color = 'blue'
  spinner.start()

  return () => {
    spinner.stop()
    process.stdout.write(eraseLine)
  }
}

exports.prompt = opts => {
  return new Promise((resolve, reject) => {
    opts.forEach((val, i) => {
      const text = val[1]
      shoutMessage(`${chalk.gray('>')} [${chalk.bold(i + 1)}] ${text}`)
    })

    const ondata = v => {
      const s = v.toString()

      function cleanup() {
        process.stdin.setRawMode(false)
        process.stdin.removeListener('data', ondata)
      }

      if (s === '\u0003') {
        cleanup()
        reject(new Error('Aborted'))
        return
      }

      const n = Number(s)
      if (opts[n - 1]) {
        cleanup()
        resolve(opts[n - 1][0])
      }
    }

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', ondata)
  })
}

exports.cmd = cmd => {
  return chalk.bold(chalk.cyan(cmd))
}

exports.code = cmd => {
  return `${chalk.gray('`')}${chalk.bold(cmd)}${chalk.gray('`')}`
}

exports.param = param => {
  return chalk.bold(`${chalk.gray('{')}${chalk.bold(param)}${chalk.gray('}')}`)
}
