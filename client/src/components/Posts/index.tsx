import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from './../../store/index'
import {
  PostData,
  PaginatedData,
  UserPostsParams
} from '../../store/ducks/posts/types'
import { UserName } from '../../store/ducks/users/types'
import * as PostsActions from '../../store/ducks/posts/actions'
import PostCard from './../PostCard'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Pagination from 'react-bootstrap/Pagination'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { RouteComponentProps, Link } from 'react-router-dom'
import queryString from 'query-string'
import api from '../../services/api'
import { ChevronRight } from 'react-bootstrap-icons'
import Spinner from 'react-bootstrap/Spinner'

export interface StateProps {
  posts: PaginatedData
  loading: boolean
}

export interface UserState {
  user: UserName
}

export interface DispathProps {
  loadUserPosts(params: UserPostsParams): Action
}

export interface RouteInfo {
  id: string
}

export type Props = StateProps & DispathProps & RouteComponentProps<RouteInfo>

class Posts extends Component<Props, UserState> {
  private userID: number

  constructor(props: Props) {
    super(props)
    this.userID = parseInt(this.props.match.params.id)
    this.state = { user: { id: this.userID, name: '' } }
  }

  componentDidMount() {
    if (!this.userID) return
    this.getPosts(this.getQueryPage())
    this.getUser(this.userID)
  }

  componentWillReceiveProps(nextProps: Props) {
    const currentPage = this.getQueryPage()
    const query = queryString.parse(nextProps.location.search)
    const page = query.page ? parseInt(String(query.page)) : 1
    if (page !== currentPage) this.getPosts(page)
  }

  render() {
    const { posts, loading } = this.props
    const user = this.state.user
    let items = []

    for (let number = 1; number <= posts.pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === posts.page}
          onClick={() => this.setPage(number)}
        >
          {number}
        </Pagination.Item>
      )
    }

    return (
      <Container className="posts">
        <h1>Posts</h1>
        <Breadcrumb className="position-relative">
          <Link to="/">Usuários</Link>
          <ChevronRight size={18} />
          <Breadcrumb.Item active>{user.name}</Breadcrumb.Item>
          <Link to="/" className="breadcrumb-back">
            Voltar
          </Link>
        </Breadcrumb>
        {loading ? (
          <div className="loading">
            <Spinner animation="border" />
          </div>
        ) : (
          <div>
            <Row>
              {posts.docs.map((post: PostData) => (
                <Col key={post.id} lg={4}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
            <Pagination className="d-flex align-items-center justify-content-center">
              <Pagination.First
                onClick={() => this.setPage(1)}
                disabled={this.getQueryPage() === 1}
              />
              <Pagination.Prev
                onClick={() => this.trySetPage(posts.page - 1)}
                disabled={this.getQueryPage() === 1}
              />
              {items}
              <Pagination.Next
                onClick={() => this.trySetPage(posts.page + 1)}
                disabled={this.getQueryPage() === posts.pages}
              />
              <Pagination.Last
                onClick={() => this.setPage(posts.pages)}
                disabled={this.getQueryPage() === posts.pages}
              />
            </Pagination>
          </div>
        )}
      </Container>
    )
  }

  private getQueryPage = (): number => {
    const query = queryString.parse(this.props.location.search)
    return query.page ? parseInt(String(query.page)) : 1
  }

  private getPosts = (page: number) => {
    const { loadUserPosts } = this.props
    loadUserPosts({
      id: this.userID,
      limit: 6,
      page: page
    })
  }

  private setPage = (page: number) => {
    this.props.history.push(`/user/posts/${this.userID}?page=${page}`)
  }

  private getUser = async (id: number) => {
    const { data } = await api.get('user/' + id)
    this.setState({ user: data })
  }

  private trySetPage = (page: number) => {
    const { posts } = this.props
    if (page < 1 || page > posts.pages) return
    this.setPage(page)
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  posts: state.posts.data,
  loading: state.posts.loading
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PostsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
