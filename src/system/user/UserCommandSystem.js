import { UserGateway } from 'gateways/user/UserGateway'
import { CreateUser } from 'domains/user/User'

export const UserCommandSystem = {
  createUser: (createUserData) => {
    const user = UserGateway.createUser(CreateUser(createUserData))
    return user
  }
}
