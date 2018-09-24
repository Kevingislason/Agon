import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Container, Form, Button, Divider, Header} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <Divider hidden />
      <Header textAlign="center" as="h2">
        {displayName}
      </Header>
      <Divider hidden />
      <Form onSubmit={handleSubmit} name={name}>
        <Container fluid>
          <Form.Field>
            <label>Email</label>
            <input name="email" type="text" placeholder="Email" />
          </Form.Field>
        </Container>
        <Divider hidden />
        <Container fluid>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="text" placeholder="Password" />
          </Form.Field>
        </Container>
        <Container>
          <Divider hidden />
          <Button type="submit">{displayName}</Button>
        </Container>
        {error &&
          error.response && <Container> {error.response.data} </Container>}
      </Form>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
