import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import Users from './components/Users'
import Posts from './components/Posts'
import Post from './components/Post'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Container fluid className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={Users} exact />
          <Route path="/user/posts/:id" component={Posts} />
          <Route path="/posts/:id" component={Post} />
        </BrowserRouter>
      </Provider>
    </Container>
  )
}

export default App
