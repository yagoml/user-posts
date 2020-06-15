import { action } from 'typesafe-actions'
import { PostsTypes, PostData, UserPostsParams } from './types'

export const loadUserPosts = (params: UserPostsParams) =>
  action(PostsTypes.LOAD_REQUEST, params)

export const loadSuccess = (data: PostData[]) =>
  action(PostsTypes.LOAD_SUCCESS, { data })

export const loadFailure = () => action(PostsTypes.LOAD_FAILURE)
