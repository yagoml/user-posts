import { all, takeLatest } from 'redux-saga/effects'
import { UsersTypes } from './users/types'
import { PostsTypes } from './posts/types'
import { loadUsers } from './users/sagas'
import { loadUserPosts } from './posts/sagas'

export default function* rootSage() {
  return yield all([
    takeLatest(UsersTypes.LOAD_REQUEST, loadUsers),
    takeLatest(PostsTypes.LOAD_REQUEST, loadUserPosts)
  ])
}
