import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Header, Divider, Accordion, Icon} from 'semantic-ui-react'
import {fetchUserSubmission, fetchFeaturedSubmissions} from '../store'
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
    this.props.fetchFeaturedSubmissions()
  }

  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({activeIndex: newIndex})
  }

  render() {
    const user = this.props.user
    const userSubmission = this.props.userSubmission
    const userFeaturedSubmission = this.props.featuredSubmissions.find(
      submission => submission.userId === user.id
    )
    return (
      <Container>
        <Container text>
          <Header className="semi-lonely-header" as="h3" textAlign="center">
            User: {user.email}
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
          {userFeaturedSubmission && <p>congrats m8</p>}
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
    user: state.user,
    userSubmission: state.submission.userSubmission,
    featuredSubmissions: state.submission.featuredSubmissions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserSubmission: () => dispatch(fetchUserSubmission()),
    fetchFeaturedSubmissions: () => dispatch(fetchFeaturedSubmissions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
