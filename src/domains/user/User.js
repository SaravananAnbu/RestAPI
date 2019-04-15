import { sequelize } from '../system/Initializer'
import { Hash } from 'services/Hash'
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

export function CreateUser (data) {
  return User.build({
    id: data.id || uuid(),
    type: data.type,
    username: data.username,
    password: Hash(data.password),
    info: data.info,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  })
}

export const User = sequelize.define('Users', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, unique: true },
  type: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  info: { type: Sequelize.JSON },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE }
}, {
  timestamps: true
})

// Method of User
User.prototype.getId = () => {
  return this.id
}
