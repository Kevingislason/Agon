import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Divider, Header, Form, Button} from 'semantic-ui-react'
import {fetchUserSubmission, postUserSubmission} from '../store'

class SubmitPage extends Component {
  constructor() {
    super()
    this.state = {title: '', content: ''}
  }

  componentDidMount() {
    this.props.fetchUserSubmission()
  }

  handleChangeTitle = event => {
    this.setState({title: event.target.value})
  }
  handleChangeContent = event => {
    this.setState({content: event.target.value})
  }
  handleSubmit = async event => {
    event.preventDefault()

    await this.props.postUserSubmission({
      ...this.state,
      userId: this.props.user.id
    })
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
            Thanks for playing. Submit again during the next reading period.
          </Header>
        </Container>
      )
    } else if (userSubmission.status === 'pending') {
      return (
        <Container>
          <Divider hidden />
          <Header className="lonely-header" textAlign="center" as="h4">
            Your submission is pending. It will become active once you have
            reviewed your peers.
          </Header>
        </Container>
      )
    } else {
      return (
        <Container>
          <Divider hidden />
          <Header textAlign="center" as="h2">
            Submit
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Header as="h5">Title</Header>
            <Form.Field>
              <input onChange={this.handleChangeTitle} placeholder="Title" />
            </Form.Field>

            <Header as="h5">Content</Header>
            <Form.TextArea
              onChange={this.handleChangeContent}
              rows="15"
              placeholder="Content"
            />
            <Divider hidden />
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserSubmission: () => dispatch(fetchUserSubmission()),
    postUserSubmission: submission => dispatch(postUserSubmission(submission))
  }
}

const mapStateToProps = state => {
  return {
    userSubmission: state.submission.userSubmission,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage)
