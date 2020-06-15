import { call, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { loadSuccess, loadFailure } from './actions'
import { UserPostsAction } from './types'

export function* loadUserPosts({ payload }: UserPostsAction) {
  try {
    const response = yield call(api.get, 'user/posts/' + payload.id, {
      params: payload
    })
    yield put(loadSuccess(response.data))
  } catch (e) {
    yield put(loadFailure())
  }
}
