import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import items from './references/references-3.json'
import figures from './references/figures.json'
import pdfs from './references/pdf.json'

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
      'argyle1976gaze',
      'bianchi2021use',
      'botev2021immersive',
      'jones2021ar',
      'schiavina2021real',
      'luipers2021concept',
      'schiavina2021augmented',
      'kalia2021preclinical'
    ]
    items = items.filter((item) => {
      return !excludes.includes(item.key)
    })

    this.figures = [
      'approach',
      'robot-1',
      'robot-2',
      'robot-3',
      'robot-4',
      'purpose',
      'information',
      'design-1',
      'design-2',
      'design-3',
      'interactivity',
      'interaction',
      'application'
    ]

    this.settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };


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
                {/*<i className="settings icon"></i>*/}
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <i className="fa-brands fa-bilibili fa-2x"></i>
                </div>
                {/*
                <i class="fa-solid fa-robot"></i>
                <i class="fa-brands fa-codepen"></i>
                <i class="fa-solid fa-dice-d6"></i>
                <i class="fa-solid fa-graduation-cap"></i>
                */ }
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
            <div>
              <Slider {...this.settings}>
                { this.figures.map((figure, i) => {
                  return (
                    <a href={ `/ar-and-robotics/chi-2022/figures-pdf/${figure.split('-')[0]}.pdf` } className={`glider-slide`} target="_blank">
                      <img key={i} src={ `/ar-and-robotics/chi-2022/figures/${figure}.jpg`} />
                    </a>
                  )
                })}
              </Slider>
              {/*
              <Glider
                draggable
                hasArrows
                hasDots
                rewind
                scrollLock
                slidesToShow={1}
                slidesToScroll={1}
              >
                { this.figures.map((figure, i) => {
                  return (
                    <div className={`glider-slide`}>
                      <img key={i} src={ `/ar-and-robotics/chi-2022/figures/${figure}.jpg`} />
                    </div>
                  )
                })}
              </Glider>
              */}
            </div>

            <div id="bibtex-container">
              <pre id="bibtex" className="ui message">
{`@inproceedings{suzuki2022augmented,
  title={Augmented Reality and Robotics: A Survey and Taxonomy for AR-enhanced Human-Robot Interaction and Robotic Interfaces},
  author={Suzuki, Ryo and Karim, Adnan and Xia, Tian and Hedayati, Hooman and Marquardt, Nicolai},
  booktitle={Proceedings of the 2022 CHI Conference on Human Factors in Computing Systems},
  pages={1--32},
  year={2022},
  url = {https://doi.org/10.1145/1122445.1122456}
}`}
              </pre>
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