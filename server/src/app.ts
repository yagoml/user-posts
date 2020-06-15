import express from 'express'
import cors from 'cors'
import request from 'request'
import { Post, User, UserPostsParams, PaginatedResponse } from './interfaces'

const API_URL = 'http://jsonplaceholder.typicode.com/'

class App {
  public express: express.Application
  public posts: Post[]

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.send('Server is running!')
    })
    this.express.get('/users', async (req, res) => {
      try {
        const data = await this.getUsers()
        return res.json(data)
      } catch (e) {
        return res.sendStatus(500)
      }
    })
    this.express.get('/user/posts/:id', async (req, res) => {
      try {
        let params: UserPostsParams = { id: '', page: '', limit: '' }
        params = { ...params, ...req.query }
        const data = await this.getUserPosts(params)
        return res.json(data)
      } catch (e) {
        return res.sendStatus(500)
      }
    })
    this.express.get('/user/:id', async (req, res) => {
      try {
        const data = await this.getUser(parseInt(req.params.id))
        return res.json(data)
      } catch (e) {
        return res.sendStatus(500)
      }
    })
    this.express.get('/post/:id', async (req, res) => {
      try {
        const data = await this.getPost(parseInt(req.params.id))
        return res.json(data)
      } catch (e) {
        return res.sendStatus(500)
      }
    })
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      request(API_URL + 'posts', { json: true }, (err, res, body) => {
        if (err) reject(err)
        this.posts = body
        resolve(body)
      })
    })
  }

  getPost(id: number) {
    return new Promise((resolve, reject) => {
      request(API_URL + 'posts', { json: true }, (err, res, body) => {
        if (err) reject(err)
        const post = body.find((p: Post) => p.id === id)
        resolve(post)
      })
    })
  }

  getUser(id: number) {
    return new Promise((resolve, reject) => {
      request(API_URL + 'users', { json: true }, (err, res, body) => {
        if (err) reject(err)
        const user = body.find((u: User) => u.id === id)
        resolve({
          id: user.id,
          name: user.name
        })
      })
    })
  }

  async getUserPosts(params: UserPostsParams) {
    await this.getPosts()
    return new Promise((resolve, reject) => {
      let userPosts = this.posts.filter(p => p.userId === parseInt(params.id))
      const page = parseInt(params.page)
      const limit = parseInt(params.limit)
      const startIndex = (page - 1) * limit
      const pages = Math.ceil(userPosts.length / limit)
      const response: PaginatedResponse = {
        docs: userPosts.splice(startIndex, limit),
        total: userPosts.length,
        pages: pages,
        page: page
      }
      resolve(response)
    })
  }

  async setUsersPosts(users: User[]) {
    await this.getPosts()
    for (const user of users)
      user.posts = this.posts.filter(p => p.userId === user.id)
    return users
  }

  async mapUsers(users: User[]) {
    await this.setUsersPosts(users)
    return users.map(({ id, name, email, company, posts }) => ({
      id,
      name,
      email,
      company,
      posts
    }))
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      request(API_URL + 'users', { json: true }, (err, res, body) => {
        if (err) reject(err)
        const users = this.mapUsers(body)
        resolve(users)
      })
    })
  }
}

export default new App().express
