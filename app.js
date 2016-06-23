import mapboxgl from 'mapbox-gl'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  IndexRedirect,
  Route,
  withRouter,
  hashHistory,
} from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
       {this.props.children}
      </div>
    );
  }
}

class MapView extends React.Component {

  render() {
    return (
      <Map
        router={this.props.router}
        accessToken='pk.eyJ1IjoibWlrZXdpbGxpYW1zb24iLCJhIjoibzRCYUlGSSJ9.QGvlt6Opm5futGhE5i-1kw'
        styleURI='mapbox://styles/mapbox/streets-v9'
        center= {[this.props.params.lng, this.props.params.lat]}
        zoom={this.props.params.zoom}
      />
    )
  }

}

class Map extends React.Component {

  componentDidMount() {

    mapboxgl.accessToken = this.props.accessToken
    let map = new mapboxgl.Map({
    	container: this.element,
    	style: this.props.styleURI,
    	center: this.props.center,
    	zoom: this.props.zoom,
    })

    this.map = map

    map.on('moveend', (e) => {
      this.props.router.push(`/map=${this.map.getZoom()}/${this.map.getCenter().lat}/${this.map.getCenter().lng}`)
    })

  }

  shouldComponentUpdate() {
    return false
  }

  render() {

    let styles = {
      zIndex: 0,
      height: '100vh',
      width: '100%'
    }

    return <div ref={(el) => this.element = el} style={ styles }></div>
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRedirect to="map=9/40/-74.50" />
      <Route path="map=:zoom/:lat/:lng" component={ withRouter(MapView) } />
    </Route>
  </Router>
  , document.getElementById('map'))

