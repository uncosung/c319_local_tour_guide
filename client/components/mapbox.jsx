import React, { Component } from 'react';
import ReactMapGL, { Popup, Marker, GeolocateControl, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from './mapbox-token';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { withStyles } from '@material-ui/core/styles';
import TuurPin from './tuur-pin';
import PopupInfo from './popup-info';

const styles = theme => ({
  mapContainer: {
    top: 0,
    position: 'relative',
    width: '100%',
    height: '100%'
  }
});

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: '705px',
        latitude: this.props.location.coordinates[1],
        longitude: this.props.location.coordinates[0],
        zoom: 12
      },
      searchResultLayer: null,
      result: {
        latitude: null,
        longitude: null
      },
      tuurs: [],
      filteredTuurs: [],
      fetchResult: null,
      fetchCoordinates: [],
      initialCoordinates: [this.props.location.coordinates[0], this.props.location.coordinates[1]],
      popupInfo: null

    };
    this.mapRef = React.createRef();
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.filterTuurs = this.filterTuurs.bind(this);
    this.clickPin = this.clickPin.bind(this);

  }
  componentDidMount() {
    fetch('/api/package.php?id')
      .then(res => res.json())
      .then(tuurs => {
        this.setState({
          tuurs: tuurs
        }, this.fetchLocation);
      });
  }
  filterTuurs() {
    let filterTuurs = [];
    let tooFar = [];
    for (let i = 0; i < this.state.fetchCoordinates.length; i++) {
      if (this.state.fetchCoordinates[i].coord[0] < this.state.viewport.longitude - 1 || this.state.fetchCoordinates[i].coord[0] > this.state.viewport.longitude + 1 || this.state.fetchCoordinates[i].coord[1] < this.state.viewport.latitude - 0.2 || this.state.fetchCoordinates[i].coord[1] > this.state.viewport.latitude + 0.2) {
        tooFar = [...tooFar, this.state.fetchCoordinates[i]];
      } else {
        filterTuurs = [...filterTuurs, this.state.fetchCoordinates[i]];
      }
    }
    this.setState({
      filteredTuurs: filterTuurs
    });

  }

  async getTuurLocationData(tuur) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      tuur,
      coord: respJson.features[0].center
    };
  }

  mapTuurs() {
    let mapArray = this.state.tuurs.map(this.getTuurLocationData);

    Promise.all(mapArray).then(tuurCoordinates => {
      this.setState({
        fetchCoordinates: tuurCoordinates
      }, this.filterTuurs);
    });

  }
  fetchLocation() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchResult: result
        }, this.mapTuurs);
      });

  }
  handleViewPortChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
      result: {
        latitude: viewport.latitude,
        longitude: viewport.longitude
      }
    }, this.filterTuurs);
  }

  clickPin(tuur) {
    console.log('click', tuur);
  }
  renderPopup() {
    console.log('popup info', this.state.popupInfo);
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor='top'
          longitude={popupInfo.coord[0]}
          latitude={popupInfo.coord[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PopupInfo view={this.props.view} info={popupInfo.tuur}/>
        </Popup>
      )
    );
  }
  render() {

    const { classes } = this.props;
    const markerMap = this.state.filteredTuurs.map(marker => {
      return (
        <Marker onClick={this.clickPin} key={marker.tuur.id} latitude={marker.coord[1]} longitude={marker.coord[0]}>
          <TuurPin tuur={marker} onClick={() => this.setState({ popupInfo: marker }, () => console.log(this.state.popupInfo))} size={20} />
        </Marker>
      );
    });
    const { viewport, searchResultLayer } = this.state;
    return (
      <div className={classes.mapContainer}>
        <ReactMapGL
          ref = {this.mapRef}
          {...viewport}
          onViewportChange= {this.handleViewPortChange}
          mapboxApiAccessToken = {TOKEN}
          transitionInterpolator = {new FlyToInterpolator()}
          mapStyle = 'mapbox://styles/mapbox/streets-v11'
        >
          {markerMap}
          {this.renderPopup()}
          <div style={{ position: 'absolute', bottom: 50, right: 10 }} >
            <NavigationControl/>
          </div>
          <div style={{ position: 'absolute', bottom: 50, left: 10 }}>
            <GeolocateControl
              positionOptions = {{
                enableHighAccuracy: true
              }}
              trackUserLocation = {true}
            >
            </GeolocateControl>
          </div>
        </ReactMapGL>

      </div>
    );
  }
}

export default withStyles(styles)(Mapbox);
