import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container, Header, Divider, Segment} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container fluid>
    <Header as="h2" size="huge" id="main-header">
      Agon<Header.Subheader id="subheader">ἀγών</Header.Subheader>
    </Header>
    <Menu id="menu">
      {isLoggedIn ? (
        <Container fluid>
          {/* The navbar will show these links after you log in */}
          <Menu.Item as={Link} to="/home">
            <Header as="h5">
              Home
              <Header.Subheader>οἶκος</Header.Subheader>
            </Header>
          </Menu.Item>
          <Menu.Item onClick={handleClick}>
            <Header as="h5">
              Log Out
              <Header.Subheader>ἄφοδος </Header.Subheader>
            </Header>
          </Menu.Item>
          <Menu.Item as={Link} to="/read">
            <Header as="h5">
              Read
              <Header.Subheader>ἀνανέμω</Header.Subheader>
            </Header>
          </Menu.Item>
        </Container>
      ) : (
        <Container fluid>
          {/* The navbar will show these links before you log in */}
          <Menu.Item as={Link} to="/login">
            <Header as="h5">
              Log In
              <Header.Subheader>εἴσειμι </Header.Subheader>
            </Header>
          </Menu.Item>
          <Menu.Item as={Link} to="/signup">
            <Header as="h5">
              Sign Up
              <Header.Subheader>συμβολή </Header.Subheader>
            </Header>
          </Menu.Item>
          <Menu.Item as={Link} to="/read">
            <Header as="h5">
              Read
              <Header.Subheader>ἀνανέμω</Header.Subheader>
            </Header>
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
