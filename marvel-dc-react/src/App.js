import React, { Component, PropTypes} from 'react'
import { Route } from 'react-router-dom'
import Main from './Main'
import * as VisualRecognitionAPI from './utils/VisualRecognitionAPI'

class App extends Component {
    state = {
      data : {
        title: null,
        score: null,
        image: "http://images.goodsmile.info/cgm/images/product/20140430/4408/28851/large/f0b80ce09854e61b6a50bd8d8a6f9f34.jpg",
      }
    }

    componentDidMount() {
      let url = this.state.data;
      VisualRecognitionAPI.getInfo(url).then(info => {
        let image = url.image;
        let title = info.images[0].classifiers[0].classes[0].class;
        let score = info.images[0].classifiers[0].classes[0].score;
        let analysis = {
          title,
          score,
          image
        }
        console.log(analysis);
        this.setState(state => ({
          data: {
            title,
            score,
            image
          }
        }))
      }
    )}

    URLSubmit(url) {
      VisualRecognitionAPI.getInfo(url).then(info => {
          let image = url.image;
          let title = info.images[0].classifiers[0].classes[0].class;
          let score = info.images[0].classifiers[0].classes[0].score;
          let analysis = {
            title,
            score,
            image
          }
          console.log(analysis);
        this.setState(state => ({
          data: {
            title,
            score,
            image
          }
        }))
      })
    }

    render() {
     return (
       <div className='app'>
        <Route path='/' render={({ history })=>(
            <Main onURLSubmit={
              (url) => {
                this.URLSubmit(url)
              }}
              info={this.state.data}
            />
          )}/>
       </div>
     )
    }
  }

  export default App;