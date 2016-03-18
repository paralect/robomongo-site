import 'core-js/fn/object/assign'
import React, { Component } from 'react'
import classnames from 'classnames'

export class IssueComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      issue: props.issue
    }
  }

  voteUp () {
    this.state.issue.votes += 1
    this.state.issue.isDirty = true;
    this.setState({issue: this.state.issue})
    this.props.onVote(this.state.issue)
  }

  render () {
    let progressWidthPercent = (this.state.issue.votes / this.props.maxVote) * 100
    let progressFade = progressWidthPercent / 100

    return (
      <div
        className='backlog-block__issue_container'>
        <div className='backlog-block__issue_link col-lg-1'>
          <a target='blank' href={this.state.issue.github.url}>
            <span className='glyphicon glyphicon-new-window' aria-hidden='true'></span>
          </a>
        </div>
        <div
          className='backlog-block__issue_progress_container col-lg-10'
          onClick={this.voteUp.bind(this)}>
          <div
            className='backlog-block__issue_progress'
            style={{
              width: `${progressWidthPercent}%`,
              backgroundColor: `rgba(100, 200, 136, ${progressFade})`
            }}>
            <span>#{this.state.issue.github.number}: {this.state.issue.github.title}</span>
          </div>
        </div>
        <div className='backlog-block__issue_votes col-lg-1'>
          <span className={classnames({
            'backlog-block__issue_votes--dirty': this.state.issue.isDirty
          })}>★</span>
          {this.state.issue.votes}
        </div>
      </div>
    )
  }
}

IssueComponent.propTypes = {
  issue: React.PropTypes.any.isRequired,
  onVote: React.PropTypes.func,
  maxVote: React.PropTypes.number
}
