import React, { Component } from 'react'

import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

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

        </div>

      </>
    )
  }
}

export default App