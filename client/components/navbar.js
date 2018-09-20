import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container, Header} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container>
    <Header as="h1">Agon</Header>
    <Menu>
      {isLoggedIn ? (
        <Container>
          {/* The navbar will show these links after you log in */}
          <Menu.Item as={Link} to="/home">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/logout">
            Log Out
          </Menu.Item>
        </Container>
      ) : (
        <Container>
          {/* The navbar will show these links before you log in */}
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item as={Link} to="/signup">
            Sign up
          </Menu.Item>
        </Container>
      )}
    </Menu>
  </Container>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
