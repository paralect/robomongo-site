import 'core-js/fn/object/assign'
import React from 'react'
require('./style.less')
import IssueComponent from './components/issue'

class BacklogComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issues: [{
        _id: 1,
        pointsCount: 111,
        inDevelopment: true,
        github: {
          title: 'Better GridFS support',
          number: 255,
          url: '',
          description: '',
          commentsCount: 50
        }
      }, {
        _id: 2,
        pointsCount: 87,
        inDevelopment: false,
        github: {
          title: 'MacOSX: Robomongo crashes after waking up from sleep',
          number: 717,
          url: '',
          description: '',
          commentsCount: 15
        }
      }, {
        _id: 3,
        pointsCount: 30,
        inDevelopment: false,
        github: {
          title: 'MacOSX: Robomongo crashes after waking up from sleep',
          number: 717,
          url: '',
          description: '',
          comments: 49
        }
      }]
    }
  }

  tick () {
    console.log('tick')
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
                    <table className='backlog-block__issues'>
                      <thead>
                        <tr>
                            <th>Feature or Issue</th>
                            <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                         {this.state.issues.map(function (row, i) {
                           return (
                             <IssueComponent key={row._id} issue={row}/>
                          )
                         })}
                     </tbody>
                   </table>
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
