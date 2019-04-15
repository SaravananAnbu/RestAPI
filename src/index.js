import ServerRestful from './server'
import PublicRouting from './routers/PublicRouting'
import PrivateRouting from './routers/PrivateRouting'
import Initializer from './system/Initializer'
import { Logger } from './services/Logger'

Initializer()
    .then((result) => {
        const server = new ServerRestful(PublicRouting, PrivateRouting)
        server.runServer()
    }).catch((reject) => {
        Logger.error(reject.toString())
    })
