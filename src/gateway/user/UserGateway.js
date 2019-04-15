import { User } from 'domains/user/User'
import { MakeCrudGateway } from 'gateways/CrudGateway'
import { Hash } from 'services/Hash'

const userCrudGateway = MakeCrudGateway(User)

export const UserGateway = {
  createUser: (user) => {
    return userCrudGateway.create(user)
  },

  findAll: () => {
    return userCrudGateway.findAll()
  },

  validateUser: (username, password) => {
    const passwordHash = Hash(password)
    return userCrudGateway.findWithFilter({ username, passwordHash })
  }
}
