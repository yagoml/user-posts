import { action } from 'typesafe-actions'
import { UsersTypes, User } from './types'

export const loadUsers = () => action(UsersTypes.LOAD_REQUEST)

export const loadSuccess = (data: User[]) =>
  action(UsersTypes.LOAD_SUCCESS, { data })

export const loadFailure = () => action(UsersTypes.LOAD_FAILURE)
