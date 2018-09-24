import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Pagination, Header, Divider, Modal} from 'semantic-ui-react'
import {
  fetchPendingRatings,
  initializeRatings,
  fetchAssignedSubmissions,
  fetchSubmissionsToReview
} from '../store'
import ReviewForm from './review-form'

//this component renders if the user has a pending submission;
//i.e. the user needs to complete some reviews
class ReviewPageActive extends Component {
  constructor() {
    super()
    this.state = {activePage: 1}
  }

  async componentDidMount() {
    await this.props.fetchPendingRatings()
    const pendingRatings = this.props.pendingRatings
    //If pending ratings exist, get their associated submissions
    if (pendingRatings.length) {
      this.props.fetchAssignedSubmissions(pendingRatings)

      //Otherwise, find 5 appropriate submissions to review
      //Then initialize pending review for these stories
    } else {
      await this.props.fetchSubmissionsToReview()
      //NEED A CONDITION FOR IF < 5 appropriate submissions exist!!!!!!!!!!
      this.props.initializeRatings(this.props.submissionsToReview)
    }
  }

  handlePageChange = (e, {activePage}) => this.setState({activePage})

  render() {
    const submissionsToReview = this.props.submissionsToReview
    const visibleSubmission = submissionsToReview[this.state.activePage - 1]
    return (
      <Container>
        <Modal defaultOpen={true}>
          <Modal.Header textalign="center">Review your peers</Modal.Header>
          <Modal.Content>1. Read all five submissions</Modal.Content>
          <Modal.Content>2. Rank them from worst to best</Modal.Content>
          <Modal.Content>
            3. Once you submit you ranking, other writers will in turn review
            your submission
          </Modal.Content>
        </Modal>
        {submissionsToReview.length && (
          <Container text>
            <Divider hidden />
            <Header as="h1" textAlign="center">
              {visibleSubmission.title}
            </Header>
            <Divider />
            <p>{visibleSubmission.content}</p>
            <Divider />
          </Container>
        )}
        <Container>
          <ReviewForm />
        </Container>
        <Divider hidden />
        <Container fluid textAlign="center" className="footer">
          <Pagination
            firstItem={null}
            lastItem={null}
            activePage={this.state.activePage}
            onPageChange={this.handlePageChange}
            totalPages={5}
          />
        </Container>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPendingRatings: () => dispatch(fetchPendingRatings()),
    fetchAssignedSubmissions: ratings =>
      dispatch(fetchAssignedSubmissions(ratings)),
    fetchSubmissionsToReview: () => dispatch(fetchSubmissionsToReview()),
    initializeRatings: submissions => dispatch(initializeRatings(submissions))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    submissionsToReview: state.submission.submissionsToReview,
    pendingRatings: state.rating.pendingRatings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPageActive)
