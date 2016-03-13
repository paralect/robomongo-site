import 'core-js/fn/object/assign'
import React from 'react'

class IssueComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.issue
  }

  voteUp (issue) {
    issue.order += 1
    this.setState(issue)
    window.alert(`vote for: "${issue.title}"`)
  }

  render () {
    return (
    <div>
      <a target='blank' href={this.state.github.url}>{this.state.github.title}</a> |
      ({this.state.pointsCount}) | <button onClick={this.voteUp.bind(this, this.state)} className='btn'>+1</button>
    </div>
    )
  }
}

IssueComponent.propTypes = {
  issue: React.PropTypes.any.isRequired
}

export default IssueComponent
