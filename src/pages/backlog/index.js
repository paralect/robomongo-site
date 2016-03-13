import 'core-js/fn/object/assign'
import React from 'react'
import FlipMove from 'react-flip-move'
require('./style.less')
import IssueComponent from './components/issue'

class BacklogComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issues: []
    }
  }

  componentDidMount () {
    this.loadIssues()
  }

  loadIssues () {
    window.fetch('/api/v1/issues')
      .then(response => response.json())
      .then(data => {
        let issues = data.results
        for (let i = 0, length = issues.length; i < length; i++) {
          issues[i].order = i
        }
        this.setState({ issues: issues })
      })
      .catch(err => console.error(err.toString()))
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
                      <FlipMove easing='cubic-bezier(0, 0.7, 0.8, 0.1)'>
                         {this.state.issues.map(function (row, i) {
                           return (
                             <IssueComponent key={row._id} issue={row}/>
                          )
                         })}
                       </FlipMove>
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
