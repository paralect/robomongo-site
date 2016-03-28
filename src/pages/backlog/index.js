import 'core-js/fn/object/assign'
import React from 'react'
import FlipMove from 'react-flip-move'
require('./style.less')
import { IssueComponent } from './components/issue'

class BacklogComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issues: [],
      maxVote: 10,
      totalPoints: window.config.points
    }
  }

  componentDidMount () {
    this.loadIssues()
  }

  _sortIssues (issues) {
    return issues
      .slice()
      .sort((i1, i2) => {
        let res
        if (i2.pointsCount !== i1.pointsCount) {
          res = i2.pointsCount - i1.pointsCount
        } else {
          res = new Date(i1.github.createdOn) - new Date(i2.github.createdOn)
        }
        return res
      })
  }

  loadIssues () {
    window.fetch('/api/v1/issues')
      .then((response) => response.json())
      .then((data) => {
        let issues = data.results
        this.setState({ issues: this._sortIssues(issues) })
      })
      .catch((err) => console.error(err.toString()))
  }

  vote (issueId, points) {
    window.fetch('/api/v1/votes/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer: ${window.config.token}`
      },
      body: JSON.stringify({
        issueId: issueId,
        points: points
      })
    })
    .catch((err) => console.error(err.toString()))
  }

  _onIssueVote (issue, number) {
    let state = {
      issues: this._sortIssues(this.state.issues),
      totalPoints: this.state.totalPoints - number
    }
    if (issue.pointsCount > this.state.maxVote) {
      state.maxVote = issue.pointsCount
    }

    this.vote(issue._id, number)
    this.setState(state)
  }

  _pointsLeft (number) {
    return this.state.totalPoints
  }

  renderIssues (issues) {
    return issues
      .map((issue, i) => {
        return (
          <li key={issue._id}
            style={{zIndex: i}}>
            <IssueComponent
              issue={issue}
              maxVote={this.state.maxVote}
              onVote={this._onIssueVote.bind(this)}
              pointsLeft={this._pointsLeft.bind(this)}
            />
          </li>
        )
      })
  }

  render () {
    return (
      <div className='vertically-centered'>
        <div className='vertically-centered__box'>
          <div className='backlog-block'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='backlog-block__title'>
                    Development Backlog
                  </div>
                  <div>
                    You have ({this.state.totalPoints}) points which you can spend to vote for feature you want to see in next release.
                  </div>
                  <div className='backlog-block__issues_container'>
                    <div className='backlog-block__issues'>
                      <ul>
                        <FlipMove staggerDurationBy='30' duration={500}>
                          {this.renderIssues(this.state.issues)}
                        </FlipMove>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BacklogComponent
