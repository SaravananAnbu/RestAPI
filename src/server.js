// Load Config ENV
import { Logger } from './services/Logger'
const express = require('express')
const bodyParser = require('body-parser')
const Raven = require('raven')
const _ = require('lodash')

export default class ServerRestful {
  constructor (PublicRouter, PrivateRouter) {
    this.server = express()
    this._publicRouter = express.Router()
    this._privateRouter = express.Router()
    this.PublicRouter = PublicRouter
    this.PrivateRouter = PrivateRouter
  }

  runServer (port) {
      
    this.server.use(Raven.requestHandler())

    const rawBodySaver = function (req, res, buf, encoding) {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8')
      }
    }
    this.server.use(bodyParser.urlencoded({ extended: false }))
    this.server.use(bodyParser.json({ verify: rawBodySaver }))

    // Public Router run
    this.PublicRouter.forEach(({ root, router }) => {
      router.fillRouter(this._publicRouter, this._getHandlers(router))
      this.server.use(root, this._publicRouter)
    })

    // Private Router run
    this.server.use(this._validateAuthenticateForcedly)
    this.PrivateRouter.forEach(({ root, router }) => {
      router.fillRouter(this._privateRouter, this._getHandlers(router))
      this.server.use(root, this._privateRouter)
    })

    this.server.use(Raven.errorHandler())
    this.server.use(this._errorHandler)

    this.server.listen(port || Number(process.env.PORT), () => {
      Logger.info(`Hello, Server restful run at ${port || Number(process.env.PORT)}`)
    })
  }

  _getHandlers (router) {
    const handlers = router.handlers
    Object.keys(handlers).forEach((key) => {
      const fn = handlers[key]
      handlers[key] = (req, res) => res.json(fn(req, res))
    })
    return handlers
  }

  _errorHandler (err, req, res, next) {
    const statusCode = err.statusCode || 500
    let errorMessage = ''
    const metaData = err.metaData || null

    if (req.errorType === 'InvalidParams') { // invalid body request
      errorMessage = err.message
    } else if (statusCode === 500) {
      errorMessage = _.get(err, 'response.data', undefined) || err.message
      Logger.errorStackTrace(err)
    } else {
      const key = err.message.replace(/:/g, '%3A')
      errorMessage = req.t(key)
    }

    const response = {
      errorCode: err.message,
      msg: errorMessage,
      statusCode: statusCode,
      metaData: metaData
    }

    const errToLog = err
    if (errToLog.metaData) delete errToLog.metaData
    Logger.error(errToLog)

    res.status(statusCode).json(response)
    next()
  }
}

