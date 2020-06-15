import { createStore, Store, applyMiddleware } from 'redux'
import { UsersState } from './ducks/users/types'
import { PostsState } from './ducks/posts/types'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './ducks/root-reducer'
import rootSaga from './ducks/root-saga'

export interface ApplicationState {
  users: UsersState
  posts: PostsState
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
