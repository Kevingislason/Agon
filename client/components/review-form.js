//Component could probably be refactored to avoid hideous repetition
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Form,
  Button,
  Header,
  Icon,
  Divider,
  Container,
  Accordion
} from 'semantic-ui-react'
import ReviewField from './review-form-field'
import {scoreRatings, activateSubmission} from '../store'

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      score1: null,
      score2: null,
      score3: null,
      score4: null,
      score5: null,
      accordionIndex: -1
    }
  }
  handleSubmit = async event => {
    event.preventDefault()
    const scores = [
      this.state.score1,
      this.state.score2,
      this.state.score3,
      this.state.score4,
      this.state.score5
    ]
    //check for duplicates
    if (new Set(scores).size === scores.length) {
      await this.props.scoreRatings(this.props.pendingRatings, scores)
      this.props.activateSubmission(this.props.userSubmission)
    }
  }
  handleAccordion = (e, titleProps) => {
    const {index} = titleProps
    const activeIndex = this.state.accordionIndex
    const newIndex = activeIndex === index ? -1 : index
    this.setState({accordionIndex: newIndex})
  }

  render() {
    const handleChange1 = (e, {score}) => this.setState({score1: score})
    const handleChange2 = (e, {score}) => this.setState({score2: score})
    const handleChange3 = (e, {score}) => this.setState({score3: score})
    const handleChange4 = (e, {score}) => this.setState({score4: score})
    const handleChange5 = (e, {score}) => this.setState({score5: score})
    const submissionsToReview = this.props.submissionsToReview
    return (
      <Container text textAlign="center">
        {submissionsToReview.length && (
          <Accordion>
            <Accordion.Title
              index={0}
              active={this.state.accordionIndex === 0}
              onClick={this.handleAccordion}
            >
              <Header as="h4">
                <Icon name="dropdown" />
                Review Form
              </Header>
            </Accordion.Title>
            <Accordion.Content
              className="space-top"
              active={this.state.accordionIndex === 0}
            >
              <Form onSubmit={this.handleSubmit}>
                <Container>
                  <ReviewField
                    submission={submissionsToReview[0]}
                    handleChange={handleChange1}
                    score={this.state.score1}
                  />
                  <Divider hidden />
                  <ReviewField
                    submission={submissionsToReview[1]}
                    handleChange={handleChange2}
                    score={this.state.score2}
                  />
                  <Divider hidden />
                  <ReviewField
                    submission={submissionsToReview[2]}
                    handleChange={handleChange3}
                    score={this.state.score3}
                  />
                  <Divider hidden />
                  <ReviewField
                    submission={submissionsToReview[3]}
                    handleChange={handleChange4}
                    score={this.state.score4}
                  />
                  <Divider hidden />
                  <ReviewField
                    submission={submissionsToReview[4]}
                    handleChange={handleChange5}
                    score={this.state.score5}
                  />
                  <Button className="space-bottom" type="submmit">
                    Submit
                  </Button>
                  <Divider hidden />
                </Container>
              </Form>
            </Accordion.Content>
          </Accordion>
        )}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    scoreRatings: (ratings, scores) => dispatch(scoreRatings(ratings, scores)),
    activateSubmission: submission => dispatch(activateSubmission(submission))
  }
}

const mapStateToProps = state => {
  return {
    submissionsToReview: state.submission.submissionsToReview,
    userSubmission: state.submission.userSubmission,
    pendingRatings: state.rating.pendingRatings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
