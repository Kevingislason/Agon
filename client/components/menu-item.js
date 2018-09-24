import React from 'react'
import {Menu, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OneMenuItem = props => {
  return (
    <Menu.Item as={Link} to={props.url}>
      <Header as="h5">
        {props.name}
        <Header.Subheader>{props.greek}</Header.Subheader>
      </Header>
    </Menu.Item>
  )
}

export default OneMenuItem
