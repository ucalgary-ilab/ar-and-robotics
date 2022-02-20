import React, { Component } from 'react'

import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

class App extends Component {
  constructor(props) {
    super(props)
    window.App = this
    this.state = {
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
              <p>A Suvey and Taxonomy</p>
            </div>
          </div>

        </div>

      </>
    )
  }
}

export default App