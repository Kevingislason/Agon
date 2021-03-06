import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Header, Divider, Pagination, Image} from 'semantic-ui-react'
import {fetchFeaturedSubmissions} from '../store/submission'
// import {Link} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    fetchFeaturedSubmissions: () => dispatch(fetchFeaturedSubmissions())
  }
}

const mapStateToProps = state => {
  return {
    featuredSubmissions: state.submission.featuredSubmissions
  }
}

class FeaturedHome extends Component {
  constructor() {
    super()
    this.state = {
      activePage: 1
    }
  }
  componentDidMount() {
    this.props.fetchFeaturedSubmissions()
  }

  handlePageChange = (e, {activePage}) => this.setState({activePage})

  render() {
    const featuredSubmissions = this.props.featuredSubmissions
    const visibleSubmission = featuredSubmissions[this.state.activePage - 1]
    return (
      <Container fluid>
        {featuredSubmissions.length ? (
          <Container text>
            <Divider hidden />
            <Image
              className="space-top"
              centered={true}
              src="/laurel.png"
              size="tiny"
            />
            <Header textAlign="center" as="h1">
              {visibleSubmission.title}
            </Header>
            <Divider hidden />
            <p>{visibleSubmission.content} </p>
            <Container fluid textAlign="center" className="footer">
              <Pagination
                firstItem={null}
                lastItem={null}
                activePage={this.state.activePage}
                onPageChange={this.handlePageChange}
                totalPages={4}
              />
            </Container>
          </Container>
        ) : (
          <Container fluid>
            <Divider hidden />
            <Header className="lonely-header" textAlign="center" as="h3">
              Coming soon...
            </Header>
          </Container>
        )}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedHome)
