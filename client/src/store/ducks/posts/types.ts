/**
 * Action types
 */
export enum PostsTypes {
  LOAD_REQUEST = '@posts/LOAD_REQUEST',
  LOAD_SUCCESS = '@posts/LOAD_SUCCESS',
  LOAD_FAILURE = '@posts/LOAD_FAILURE',
  LOAD_POST = '@posts/LOAD_POST',
  SET_PAGE = '@posts/SET_PAGE'
}

export interface UserPostsParams {
  id: number
  page: number
  limit: number
}

export interface UserPostsAction {
  type: typeof PostsTypes.LOAD_REQUEST
  payload: UserPostsParams
}

/**
 * Data types
 */
export interface PostData {
  userId: number
  id: number
  title: string
  body: string
}

/**
 * State type
 */
export interface PaginatedData {
  docs: PostData[]
  total: number
  pages: number
  page: number
}

export interface PostsState {
  readonly data: any
  readonly loading: boolean
  readonly error: boolean
}
