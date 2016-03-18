import 'core-js/fn/object/assign'
import React from 'react'
import _ from 'lodash'
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

  loadIssues () {
    window.fetch('/api/v1/issues')
      .then((response) => response.json())
      .then((data) => {
        let issues = data.results
        for (let i = 0, length = issues.length; i < length; i++) {
          issues[i].votes = Math.round(Math.random() * this.state.maxVote + 1)
        }
        this.setState({ issues: issues })
      })
      .catch((err) => console.error(err.toString()))
  }

  _onIssueVote (issue) {
    if (issue.votes > this.state.maxVote) {
      this.setState({maxVote: issue.votes})
    }
  }

  render () {
    console.log(_(this.state.issues).sortBy((issue) => { issue.votes }).value())
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
                          {_(this.state.issues)
                            .sortBy((issue) => { issue.votes })
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
                            .value()
                          }
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
