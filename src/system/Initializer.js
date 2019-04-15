//import { Logger } from 'services/Logger'
const dotenv = require('dotenv')
const _ = require('lodash')
dotenv.config()
_checkEnvironmentVariables(process.env)
export const sequelize = require('../domains/db')

export default function Initializer () {
  return new Promise(function (resolve) {
    const interval = setInterval(() => {
      sequelize.authenticate()
        .then(function (error) {
          if (!error) {
            clearInterval(interval)
            resolve('CONNECTED TO DB')
          } else {
            Logger.debug('PING DATABASES')
          }
        })
    }, 1000 * 5)
  })
}

function _checkEnvironmentVariables (env) {
  const varNames = [
    'DEBUG',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_HOST'
  ]

  varNames.forEach(varName => {
    if (_.get(env, varName, undefined) === undefined) throw new Error(`Environment variable "${varName}" is missing!!!`)
  })
}
