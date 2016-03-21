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
      maxVote: 10
    }
  }

  componentDidMount () {
    this.loadIssues()
  }

  _sortIssues (issues) {
    return issues
      .slice()
      .sort((i1, i2) => {
        let res;
        if (i2.votes !== i1.votes) {
          res = i2.votes - i1.votes
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
        for (let i = 0, length = issues.length; i < length; i++) {
          issues[i].votes = Math.round(Math.random() * this.state.maxVote + 1)
        }
        this.setState({ issues: this._sortIssues(issues) })
      })
      .catch((err) => console.error(err.toString()))
  }

  _onIssueVote (issue) {
    let state = {
      issues: this._sortIssues(this.state.issues)
    }
    if (issue.votes > this.state.maxVote) {
      state.maxVote = issue.votes
    }
    this.setState(state)
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
                <div className='col-sm-6 col-sm-offset-3'>
                  <div className='backlog-block__title'>
                    Development Backlog
                  </div>
                  <div>
                    You have (64) points which you can spend to vote for feature you want to see in next release.
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
