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

  voteUp (number) {
    this.state.issue.votes += number
    this.state.issue.isDirty = true
    this.setState({issue: this.state.issue})
    this.props.onVote(this.state.issue, number)
  }

  render () {
    let progressWidthPercent = (this.state.issue.votes / this.props.maxVote) * 100

    return (
      <div
        className='backlog-block__issue_row_container'>
        <div className='backlog-block__issue_link col-xs-1 col-xs-offset-1'>
          <a target='blank' href={this.state.issue.github.url}>
            <span className='glyphicon glyphicon-new-window' aria-hidden='true'></span>
          </a>
        </div>
        <div className='backlog-block__issue_container col-xs-6'>
          <div className='backlog-block__issue--title'>
            <span>
              #{this.state.issue.github.number}: {this.state.issue.github.title}
            </span>
          </div>
          <div
            className='backlog-block__issue_progress_container'
            onClick={this.voteUp.bind(this)}>
            <div
              className='backlog-block__issue_progress'
              style={{ width: `${progressWidthPercent}%` }}>
            </div>
            <div
              className='backlog-block__issue_progress--rest'
              style={{
                width: `${100 - progressWidthPercent}%`
              }}>
            </div>
          </div>
        </div>
        <div className='backlog-block__issue_votes col-xs-1'>
          <span className={classnames({
            'backlog-block__issue_votes--dirty': this.state.issue.isDirty
          })}>★</span>
          {this.state.issue.votes}
        </div>
        <div className='backlog-block__issue_vote_action col-xs-3'>
          <button
            style={{display: this.props.pointsLeft() < 1 && 'none'}}
            onClick={this.voteUp.bind(this, 1)}
            type='button' className='btn btn-sm'>+1</button>
          <button
            style={{display: this.props.pointsLeft() < 5 && 'none'}}
            onClick={this.voteUp.bind(this, 5)}
            type='button' className='btn btn-sm'>+5</button>
          <button
            style={{display: this.props.pointsLeft() < 10 && 'none'}}
            onClick={this.voteUp.bind(this, 10)}
            type='button' className='btn btn-sm'>+10</button>
          <button
            style={{display: this.props.pointsLeft() < 1 && 'none'}}
            onClick={this.voteUp.bind(this, this.props.pointsLeft())}
            type='button' className='btn btn-sm'>All (+{this.props.pointsLeft()})</button>
        </div>
      </div>
    )
  }
}

IssueComponent.propTypes = {
  issue: React.PropTypes.any.isRequired,
  onVote: React.PropTypes.func,
  pointsLeft: React.PropTypes.func,
  maxVote: React.PropTypes.number
}
