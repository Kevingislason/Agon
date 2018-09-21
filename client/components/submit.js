import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Divider, Header, Form, Button} from 'semantic-ui-react'
import {fetchUserSubmission, postUserSubmission} from '../store'

class Submit extends Component {
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
  handleSubmit = event => {
    event.preventDefault()
    console.log({...this.state, userId: this.props.user.id})
    this.props.postUserSubmission({...this.state, userId: this.props.user.id})
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
          <Header textAlign="center" as="h4">
            Thanks for your submission! Submit again during the next reading
            period.
          </Header>
        </Container>
      )
    } else if (userSubmission.status === 'pending') {
      return (
        <Container>
          <Divider hidden />
          <Header textAlign="center" as="h4">
            Review time
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

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
