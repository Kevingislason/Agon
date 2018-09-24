import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Divider, Header, Form, Button} from 'semantic-ui-react'
import {ReviewPageActive} from './index'
import {fetchUserSubmission} from '../store'

class ReviewPage extends Component {
  componentDidMount() {
    this.props.fetchUserSubmission()
  }

  render() {
    const userSubmission = this.props.userSubmission
    if (
      userSubmission.status === 'active' ||
      userSubmission.status === 'defeated'
    ) {
      return (
        <Container>
          <Divider hidden />
          <Header className="lonely-header" textAlign="center" as="h4">
            You have completed your assigned reviews.
          </Header>
        </Container>
      )
    } else if (Object.keys(userSubmission).length === 0) {
      return (
        <Container>
          <Divider hidden />
          <Header className="lonely-header" textAlign="center" as="h4">
            You will be assigned reviews to complete after you submit
          </Header>
        </Container>
      )
    } else if (userSubmission.status === 'pending') {
      return <ReviewPageActive />
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserSubmission: () => dispatch(fetchUserSubmission())
  }
}

const mapStateToProps = state => {
  return {
    userSubmission: state.submission.userSubmission,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage)
