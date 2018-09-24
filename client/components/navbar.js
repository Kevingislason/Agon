import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Menu, Container, Header} from 'semantic-ui-react'
import OneMenuItem from './menu-item'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container fluid>
    <Header as="h2" size="huge" id="main-header">
      Agon<Header.Subheader id="subheader">ἀγών</Header.Subheader>
    </Header>
    <Menu id="menu">
      {isLoggedIn ? (
        <Container fluid>
          {/* The navbar will show these links after you log in */}
          <Menu.Item onClick={handleClick}>
            <Header as="h5">
              Log Out
              <Header.Subheader>ἄφοδος </Header.Subheader>
            </Header>
          </Menu.Item>
          <OneMenuItem url="/home" name="Home" greek="οἶκος" />
          <OneMenuItem url="/read" name="Read" greek="ἀνανέμω" />
          <OneMenuItem url="/submit" name="Submit" greek="ἐπιτολμάω" />
          <OneMenuItem url="/review" name="Review" greek="δικάζω" />
        </Container>
      ) : (
        <Container fluid>
          {/* The navbar will show these links before you log in */}
          <OneMenuItem url="/login" name="Log In" greek="εἴσειμι" />
          <OneMenuItem url="/signup" name="Sign Up" greek="συμβολή" />
          <OneMenuItem url="/read" name="Read" greek="ἀνανέμω" />
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
