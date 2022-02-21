import React, { Component } from 'react'
import './App.css'
import items from './references-2.json'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    window.App = this
    this.state = {
      items: items
    }
  }

  componentDidMount() {
    this.setState({ test: '123' })
  }

  render() {
    return (
      <>
        <div>
          <div className="ui vertical masthead center aligned segment">
            <div className="ui container"></div>
            <div className="ui text container">
              <h1 className="ui center aligned icon header">
                <i className="settings icon"></i>
                Augmented Reality and Robotics
              </h1>
              <p>A Survey and Taxonomy for AR-enhanced Human-Robot Interaction and Robotic Interfaces</p>
            </div>
          </div>
          <div className="ui vertical masthead segment">
            <div id="cards" className="ui five column centered stackable grid">
              { this.state.items.map((item, i) => {
                let venue = item.venue
                if (!venue) venue = item.journal
                if (!venue) venue = item.booktitle
                let author = item.authors[0]
                if (author) {
                  author = _.last(author.split(' '))
                }
                return (
                  <div id="card" className="column" key={ i }>
                    <div className="ui raised link card">
                      <div className="content">
                        <div className="meta">
                          <div class="left floated">
                            <span className="date">{ item.year }</span>
                          </div>
                          <div class="right floated">
                            <span className="date">{ `${author} et al.` }</span>
                          </div>
                        </div>
                      </div>
                      <div className="image">
                        <img className="ui small image" src={ item.images[0]} />
                      </div>
                      <div className="content">
                        <div className="description">
                          { item.title }
                        </div>
                        <div className="meta">
                          { venue }
                        </div>
                      </div>
                      <div className="extra content">
                        <div class="right floated">
                          <a className="ui mini button" href={ `https://doi.org/${item.doi}` } target="_blank">DOI</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default App