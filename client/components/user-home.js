import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header, Divider, Accordion, Icon} from 'semantic-ui-react'
import {fetchUserSubmission} from '../store'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      activeIndex: -1
    }
  }

  componentDidMount() {
    this.props.fetchUserSubmission()
  }

  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({activeIndex: newIndex})
  }

  render() {
    const email = this.props.email
    const userSubmission = this.props.userSubmission
    console.log(this.props)
    return (
      <Container>
        <Divider hidden />
        <Container text>
          <Header as="h3" textAlign="center">
            User: {email}
          </Header>
          <Divider />
          {Object.keys(userSubmission).length > 0 ? (
            <Container>
              <p>Current submission status: {userSubmission.status} </p>
              <Accordion>
                <Accordion.Title
                  index={0}
                  active={this.state.activeIndex === 0}
                  onClick={this.handleClick}
                >
                  <Header as="h4">
                    <Icon name="dropdown" />
                    {userSubmission.title}
                  </Header>
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 0}>
                  {userSubmission.content}
                </Accordion.Content>
              </Accordion>
            </Container>
          ) : (
            <Container>
              <p>Current submission status: n/a </p>
              <Link to="/submit">Submit</Link>
            </Container>
          )}
          <Divider />
        </Container>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email,
    userSubmission: state.submission.userSubmission
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserSubmission: () => dispatch(fetchUserSubmission())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
