import React from 'react'
import {Form, Header, Radio, Divider, Container} from 'semantic-ui-react'

const ReviewField = props => {
  const handleChange = props.handleChange
  const score = props.score
  const title = props.submission.title
  return (
    <Container textAlign="center">
      <Form.Field onChange={handleChange}>
        <Header className="button-header" as="h4">
          {title}
        </Header>
        <span className="gray">(worst)</span>
        <Radio
          className="radio"
          score={-3}
          checked={score === -3}
          onChange={handleChange}
        />
        <Radio
          className="radio"
          score={-2}
          checked={score === -2}
          onChange={handleChange}
        />
        <Radio
          className="radio"
          score={-1}
          checked={score === -1}
          onChange={handleChange}
        />
        <Radio
          className="radio"
          score={2}
          checked={score === 2}
          onChange={handleChange}
        />
        <Radio
          className="radio"
          score={4}
          checked={score === 4}
          onChange={handleChange}
        />
        <span className="gray">(best)</span>
      </Form.Field>
    </Container>
  )
}

export default ReviewField
