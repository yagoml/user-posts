import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ApplicationState } from './../../store/index'
import { User } from '../../store/ducks/users/types'
import * as UsersActions from '../../store/ducks/users/actions'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

interface StateProps {
  users: User[]
  loading: boolean
}

interface DispathProps {
  loadUsers(): Action
}

type Props = StateProps & DispathProps

class Users extends Component<Props> {
  componentDidMount() {
    const { loadUsers } = this.props
    loadUsers()
  }

  render() {
    const { users, loading } = this.props

    return (
      <Container className="users">
        <h1>Usuários</h1>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center loading">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table responsive hover borderless variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Empresa</th>
                <th>E-mail</th>
                <th>Posts</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.company.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={'user/posts/' + user.id}>
                      {user.posts ? user.posts.length : 0} post(s)
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  users: state.users.data,
  loading: state.users.loading
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(UsersActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users)
