import React, { Component } from 'react'
import { PostData } from '../../store/ducks/posts/types'
import { UserName } from '../../store/ducks/users/types'
import api from '../../services/api'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { ChevronRight } from 'react-bootstrap-icons'
import { RouteComponentProps, Link } from 'react-router-dom'
import './style.scss'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

export interface RouteInfo {
  id: string
}

export interface PostState {
  post: PostData
  user: UserName
  loadingPost: boolean
  loadingUsr: boolean
}

export type Props = RouteComponentProps<RouteInfo>

class Post extends Component<Props, PostState> {
  private postID: number

  constructor(props: Props) {
    super(props)
    this.postID = parseInt(this.props.match.params.id)
    this.state = {
      post: { userId: 0, id: 0, title: '', body: '' },
      user: { id: 0, name: '' },
      loadingPost: true,
      loadingUsr: true
    }
  }

  async componentDidMount() {
    await this.loadPost()
    this.getUser()
  }

  render() {
    const { post } = this.state

    return (
      <Container className="post">
        <h1>Post</h1>
        {this.renderBreadcrumb()}
        {this.renderPost()}
      </Container>
    )
  }

  private loadPost = async () => {
    return new Promise(async (resolve, reject) => {
      const { data } = await api.get('post/' + this.postID)
      this.setState({ post: data, loadingPost: false })
      resolve(data)
    })
  }

  private getUser = async () => {
    const post = this.state.post
    const { data } = await api.get('user/' + post.userId)
    this.setState({ user: data, loadingUsr: false })
  }

  private renderBreadcrumb() {
    const { user, post, loadingUsr } = this.state
    if (loadingUsr)
      return (
        <div className="mb-3 breadcrumb-loading">
          <Spinner animation="border" />
        </div>
      )
    else
      return (
        <Breadcrumb className="position-relative">
          <Link to="/">Usuários</Link>
          <ChevronRight size={18} />
          <Link to={'/user/posts/' + user.id}>{user.name}</Link>
          <ChevronRight size={18} />
          <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
          <Link to={'/user/posts/' + user.id} className="breadcrumb-back">
            Voltar
          </Link>
        </Breadcrumb>
      )
  }

  private renderPost() {
    const { post, loadingPost } = this.state

    return loadingPost ? (
      <div className="breadcrumb-loading justify-content-center">
        <Spinner animation="border" />
      </div>
    ) : (
      <div className="post__content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    )
  }
}

export default Post
