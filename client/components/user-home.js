import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header, Divider} from 'semantic-ui-react'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Container>
      <Divider hidden />
      <Container textAlign="center">
        <Header as="h3">Welcome, {email}</Header>
      </Container>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
