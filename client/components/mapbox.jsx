import React, {Component} from 'react';
import ReactMapGL, {Marker, GeolocateControl, FlyToInterpolator, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactGeocoder from 'react-map-gl-geocoder';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const token = 'pk.eyJ1IjoidW5jb3N1bmciLCJhIjoiY2p3aWRvZ2t4MDFjNjRhcGVpZ2pmN3JvMCJ9.z82fIIUAciGedjhFaXAfqA'
class Mapbox extends Component {
    constructor (props) {
        super(props);
        this.state = {
            viewport:{
                width: 325,
                height: 325,
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
            fetchResult: null,
            fetchCoordinates: [],

        }
        this.mapRef = React.createRef();
        this.handleViewPortChange = this.handleViewPortChange.bind(this);
        this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(this);
        this.handleOnResult = this.handleOnResult.bind(this);
        this.forwardGeocoder = this.forwardGeocoder.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchLocation = this.fetchLocation.bind(this);

    }
    componentDidMount(){
        fetch('/api/package.php?id=1')
            .then(res => res.json())
            .then(tuurs => {
                this.setState({
                    tuurs: tuurs
                }, this.fetchLocation)
            })
    }
    fetchLocation() {
        this.state.tuurs.map(tuur => {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${token}`)
                .then(res => res.json())
                .then((result) => {
                    this.setState ({
                        fetchCoordinates: [...this.state.fetchCoordinates, [tuur, result.features[0].center]]
                    })
                })
        })
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name}.json?access_token=${token}`)
            .then(res => res.json())
            .then((result) => {
                this.setState ({
                    fetchResult: result
                },this.makeMarkers)
                
            });

        
    }
    makeMarkers () {
        
    }
    forwardGeocoder (query) {
        let matchingFeatures = [];
        for (let i = 0; i < this.state.tuurs.length; i++){
            let feature = this.state.tuurs[i];
            if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
                feature['place_name'] = '🌲 ' + feature.properties.title;
                feature['center'] = feature.geometry.coordinates;
                feature['place_type'] = ['park'];
                matchingFeatures.push(feature);
                }
        }
        return matchingFeatures
    }
    handleViewPortChange (viewport) {
        this.setState ({
            viewport: { ...this.state.viewport, ...viewport},
            result: {
                latitude: viewport.latitude,
                longitude: viewport.longitude
            }
        });
    };
    handleGeocoderViewportChange (viewport) {
        return this.handleViewPortChange({
            ...viewport
        });
    };
    handleOnResult (event) {
        this.setState ({
            searchResultLayer: new GeoJsonLayer({
                id: 'search-result',
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            }) ,
            result: {
                latitude: event.result.center[1],
                longitude: event.result.center[0]
            }
        })
    }
    
    render () {
        const markerMap = this.state.fetchCoordinates.map(marker => {
            return(
                <Marker key={marker[0].id} latitude={marker[1][1]} longitude={marker[1][0]}>
                    <div>{marker[0].title}</div>
                </Marker>
            )
        })
        const {viewport, searchResultLayer} = this.state;
        return (
            <div style = {{ height: '100vh' }}>
                <ReactMapGL
                    ref = {this.mapRef}
                    {...viewport}
                    onViewportChange= {this.handleViewPortChange}
                    mapboxApiAccessToken = {token}
                    // transitionInterpolator = {new FlyToInterpolator()}
                >
                    <ReactGeocoder
                        mapRef = {this.mapRef}
                        onResult = {this.handleOnResult}
                        onViewportChange = {this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={token}
                        position = 'top-left'
                        // localGeocoder = {this.forwardGeocoder}
                    />
                    {markerMap}
                    <DeckGL {...viewport} layers={[searchResultLayer]} />
                    
                    <div style={{position: 'absolute', bottom: 50, right: 10}}>
                        <NavigationControl/>
                    </div>
                    <div style={{position: 'absolute', bottom: 50, left: 10}}>
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
export default Mapbox;