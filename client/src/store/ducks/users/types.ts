import { PostData } from '../posts/types'

/**
 * Action types
 */
export enum UsersTypes {
  LOAD_REQUEST = '@users/LOAD_REQUEST',
  LOAD_SUCCESS = '@users/LOAD_SUCCESS',
  LOAD_FAILURE = '@users/LOAD_FAILURE',
  LOAD_USER = '@users/LOAD_USER',
  LOAD_USER_SUCCESS = '@users/LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE = '@users/LOAD_USER_FAILURE'
}

/**
 * Data types
 */
export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
  posts?: PostData[]
}

export interface UserName {
  id: number
  name: string
}

/**
 * State type
 */
export interface UsersState {
  readonly data: User[]
  readonly loading: boolean
  readonly error: boolean
}
