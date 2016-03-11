import 'core-js/fn/object/assign'
import React from 'react'

class IssueComponent extends React.Component {
  render () {
    return (
    <tr>
          <td className='issue-description'>
              <a href='{this.props.issue.github.url}'>{this.props.issue.github.title}</a>
          </td>
          <td>
              ({this.props.issue.pointsCount}) &nbsp
              <a>+1</a> | <a>+3</a> | <a>+10</a> | <a>+64 (all my points)</a>
          </td>
      </tr>
    )
  }
}

IssueComponent.propTypes = {
  issue: React.PropTypes.any.isRequired
}

export default IssueComponent
