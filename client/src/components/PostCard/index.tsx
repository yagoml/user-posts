import React, { FunctionComponent } from 'react'
import './style.scss'
import { PostData } from '../../store/ducks/posts/types'
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: PostData
}

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => (
  <Link to={'/posts/' + post.id} className="box-shadow-default post-card">
    <div className="post-card__title-wrapper">
      <div className="post-card__title">{post.title}</div>
    </div>
    <div className="post-card__body-wrapper">
      <p className="post-card__body">{post.body}</p>
    </div>
  </Link>
)

export default PostCard
