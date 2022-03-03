import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import items from './references/references-3.json'
import figures from './references/figures.json'

import Card from './Card.js'
import Modal from './Modal.js'

class App extends Component {
  constructor(props) {
    super(props)
    window.App = this

    window.figures = figures
    items = items.map((item) => {
      item.rank = figures.includes(item.key) ? 1 : 0
      return item
    })
    // items = _.shuffle(items)
    items = _.sortBy(items, ['year', 'rank'])
    items = _.reverse(items)

    let excludes = [
      'genccturk2019development',
      'tanzi2021real',
      'hoang2021virtual',
      'nintendo-mklive',
      'renner2018facilitating',
      'mourtzis2017augmented',
      'mercedes-f15',
      'fang2013orientation',
      'suzuki2012development',
      'argyle1976gaze'
    ]
    items = items.filter((item) => {
      return !excludes.includes(item.key)
    })

    this.state = {
      items: items,
      current: {}
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
            <div className="ui text container">
              <h1 className="ui center aligned icon header">
                <i className="settings icon"></i>
                Augmented Reality and Robotics
              </h1>
              <p><b>A Survey and Taxonomy for AR-enhanced Human-Robot Interaction and Robotic Interfaces</b></p>
              <p><i>by Ryo Suzuki, Adnan Karim, Tian Xia, Hooman Hedayati, Nicolai Marquardt</i></p>
              <a href="/ar-and-robotics/chi-2022/chi-2022.pdf" target="_blank">
                <img id="teaser" src="/ar-and-robotics/sketches/teaser.jpg" />
              </a>
            </div>
            <div>
              <a className="ui tiny images" href="/ar-and-robotics/chi-2022/chi-2022.pdf" target="_blank">
                { [...Array(10).keys()].map(i => {
                  let s = String(i + 1)
                  while (s.length < 2) {s = "0" + s;}
                  return (
                    <img key={i} src={ `/ar-and-robotics/chi-2022/original/paper-${s}.jpg`} />
                  )
                })}
              </a>
            </div>
          </div>
          <div className="ui vertical segment">
            <div id="cards" className="ui five column centered stackable grid">
              { this.state.items.map((item, i) => {
                return (
                  <Card
                    item={ item }
                    key={ i }
                  />
                )
              })}
            </div>
          </div>
        </div>

        <Modal
          item={ this.state.current }
        />
      </>
    )
  }
}

export default App