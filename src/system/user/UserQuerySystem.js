import { UserGateway } from 'gateways/user/UserGateway'

export const UserQuerySystem = {
  findAll: () => {
    const users = UserGateway.findAll()
    return users
  }
}
