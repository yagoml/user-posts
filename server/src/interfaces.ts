export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

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
  posts?: Post[]
}

export interface UserPostsParams {
  id: string
  page: string
  limit: string
}

export interface PaginatedResponse {
  docs: any[]
  total: number
  pages: number
  page: number
}
