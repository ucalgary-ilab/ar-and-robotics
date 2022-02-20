import React, { Component } from 'react'
import items from './bib.json'

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
            <div className="ui ">
              <div className="ui horizontal list middle aligned grid container">
                { this.state.items.map((item, i) => {
                  return (
                    <>
                      <div className="item" key={ i }>
                        <h3 className="header">
                          { item.title }
                        </h3>
                      <img class="ui medium image" src="https://ryosuzuki.org/static/images/collective.jpg" />
                      <div class="content">
                        <div className="description">
                          { item.authors.join(', ') }
                        </div>
                        <br/>
                        { item.booktitle }
                        { item.journal }
                      </div>
                    </div>
                    <div class="ui divider"></div>
                    </>

                  )
                })}
              </div>
            </div>
          </div>

        </div>

      </>
    )
  }
}

export default App