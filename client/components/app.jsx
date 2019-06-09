import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import BottomNav from './bottom-nav';
import DatePicker from './date-range-picker';
import UpComingTuursList from './user-upcoming-tuurs-list';
import CreatePackage from './createPackage';
import EditPackage from './editPackage';
import LogIn from './log-in';
import Itinerary from './itinerary';
import SearchBar from './search-bar';
// import SearchResultGuide from './search-result-guide-list';
import Search from './search';
import SearchPackages from './search-result-package';
import Mapbox from './mapbox';
import DeckGL, { GeoJsonLayer } from 'deck.gl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'logIn'
      },
      user: {},
      location: []
    };
    this.setView = this.setView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  setView(name, user, location) {
    const view = { name };
    if (user === null) {
      this.setState({
        view,
        location: {
          name: location.name,
          coordinates: location.coordinates,
          toggleStatus: !location.toggleStatus
        } });

    } else {
      this.setState({ view, user });
    }
  }

  handleSearch(prop) {
    console.log('searched');
    this.setState({
      location: prop
    }, () => console.log(this.state.location));
  }

  render() {
    return (

      <div>
        {this.state.view.name === 'mapResults' &&
          <div>
            <SearchBar toggleStatus={this.state.location.toggleStatus} handleSearch={this.handleSearch} view={this.setView} user={this.state.user} location={this.state.location}/>            <Mapbox key={this.state.location.name} handleSearch={this.handleSearch} view = {this.setView} user={this.state.user} location={this.state.location}/>
            <Mapbox key={this.state.location.name}handleSearch={this.handleSearch} view = {this.setView} user={this.state.user} location={this.state.location}/>
            {/* <BottomNav /> */}
          </div>

        }

        {this.state.view.name === 'searchResult' &&
          <div>
            <SearchBar toggleStatus={this.state.location.toggleStatus} handleSearch={this.handleSearch} view={this.setView} user={this.state.user} location={this.state.location}/>
            {/* <SearchResultGuide /> */}
            <SearchPackages appView={ this.setView } />
            {/* <UpComingTuursList view={this.setView} /> */}
            {/* <BottomNav /> */}
          </div>

        }

        {this.state.view.name === 'userProfile' &&
          <div>
            <UserProfile view={this.setView} user={ this.state.user }/>
            {/* <UpComingTuursList view={this.setView} /> */}
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'signUp' &&
          <SignUp view={this.setView} status={this.setStatus}/>

        }
        {this.state.view.name === 'editProfile' &&
          <div>
            <EditProfile view={this.setView} user={ this.state.user} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'createPackage' &&
          <div>
            <CreatePackage view={this.setView} user={ this.state.user} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'editPackage' &&
          <div>
            <EditPackage view={this.setView} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'calendar' &&
          <div>
            <DatePicker view={this.setView} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'logIn' &&
          <div>
            <LogIn view={this.setView} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'itinerary' &&
          <div>
            <Itinerary view={this.setView} />
            {/* <BottomNav /> */}
          </div>

        }
        {this.state.view.name === 'search'
          ? <div>
            <Search view={this.setView} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
