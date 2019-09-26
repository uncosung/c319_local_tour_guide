
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import SearchResultGuideItem from './search-result-guide-list-item';
import TOKEN from './mapbox-token';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  cardContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    padding: 10,
    width: '40rem'
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(1)
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin: theme.spacing(3),
    height: 180
  }
});

class SearchResultGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guideProfile: [],
      fetchResult: [],
      fetchCoordinates: [],
      filteredGuides: [],
      isLoading: true
    };
    this.fetchProfiles = this.fetchProfiles.bind(this);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.mapGuides = this.mapGuides.bind(this);
    this.filterGuides = this.filterGuides.bind(this);
  }
  componentDidMount() {

    this.fetchProfiles();
  }
  fetchProfiles() {
    fetch('/api/search.php')
      .then(res => res.json())
      .then(search => this.setState({ guideProfile: search, isLoading: true }, this.fetchLocation));
  }
  fetchLocation() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.name}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchResult: result
        }, this.mapGuides);
      });
  }
  async getGuideLocationData(guide) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${guide.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      guide,
      coord: respJson.features[0].center
    };
  }
  mapGuides() {
    let mapArray = this.state.guideProfile.map(this.getGuideLocationData);

    Promise.all(mapArray).then(guideCoordinates => {
      this.setState({
        fetchCoordinates: guideCoordinates
      }, this.filterGuides);
    });
  }
  filterGuides() {
    let filterGuides = [];
    let tooFar = [];
    for (let i = 0; i < this.state.fetchCoordinates.length; i++) {
      if (this.state.fetchCoordinates[i].coord[0] < this.props.location.coordinates[0] - 1 || this.state.fetchCoordinates[i].coord[0] > this.props.location.coordinates[0] + 1 || this.state.fetchCoordinates[i].coord[1] < this.props.location.coordinates[1] - 0.2 || this.state.fetchCoordinates[i].coord[1] > this.props.location.coordinates[1] + 0.2) {
        tooFar = [...tooFar, this.state.fetchCoordinates[i]];
      } else {
        filterGuides = [...filterGuides, this.state.fetchCoordinates[i]];
      }
    }
    this.setState({
      filteredGuides: filterGuides,
      isLoading: false
    });
  }
  render() {
    const { classes } = this.props;
    const profile = this.state.filteredGuides.map(profile => {
      return <SearchResultGuideItem profile={profile.guide} key={profile.guide.id} />;
    });
    if (this.state.isLoading === true) {
      return (
        <div></div>
      );
    } else {
      return (
        <>
          <Container className={classes.marginBottom} >
            <Typography className={classes.marginTop} variant="h5">
            Meet the Tuur Guides
            </Typography>
          </Container>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
              { this.state.filteredGuides.length === 0 ? <Typography variant="subtitle1">There are no guides that match the search criteria</Typography> : profile }
            </GridList>
          </div>
        </>
      );
    }
  }

}

export default withStyles(styles)(SearchResultGuide);
