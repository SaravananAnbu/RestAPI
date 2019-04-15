import { UserCommandSystem } from 'system/user/UserCommandSystem'
import { UserQuerySystem } from 'system/user/UserQuerySystem'

export const UserRouter = {
  handlers: {
    createUser: (req) => {
      return UserCommandSystem.createUser(req.body)
    },
    findAll: () => {
      return UserQuerySystem.findAll()
    }
  },

  fillRouter: (router, handlers) => {
    router.post('/users', handlers.createUser)
    router.get('/users', handlers.findAll)
  }
}
