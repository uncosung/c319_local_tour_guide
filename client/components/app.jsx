import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import BottomNav from './bottom-nav';
import DatePicker from './date-multiple-picker';
import UpComingTuursList from './user-upcoming-tuurs-list';
import CreatePackage from './createPackage';
import EditPackage from './editPackage';
import LogIn from './log-in';
import Itinerary from './itinerary';
import SearchBar from './search-bar';
import SearchResultGuide from './search-result-guide-list';
import Search from './search';
import SearchPackages from './search-result-package';
import Mapbox from './mapbox';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import PackageDetails from './package-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // view: {
      //   name: 'searchResult'
      // },
      user: {},
      location: []
    };
    // this.setView = this.setView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // setView(name, user, location) {
  //   console.log(name, user, location);
  //   const view = { name };
  //   if (user === null) {
  //     this.setState({
  //       view,
  //       location: location});
  //     return;
  //   }
  //   else {
  //     this.setState({ view, user });
  //   }
  // }
  handleSearch(prop) {
    console.log('searched');
    this.setState({
      location: prop
    }, () => console.log(this.state.location));
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props =>
            <div>
              <Search />,
              <BottomNav />
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />,
              <BottomNav />
            </div>
          }/>
          <Route exact path="/user-profile"
            render={props => <div><UserProfile {...props} isAuthed={true}/>, <BottomNav /></div>}/>

          <Route path="/results" render={props =>
            <div>
              <SearchBar />,
              <SearchResultGuide />,
              <SearchPackages />,
              <BottomNav />
            </div>
          }/>
          <Route path="/package-details/:id"
            render={props => <PackageDetails packages={this.state.user}{...props} isAuthed={true}/>}/>
        </Switch>
      </div>

    // <div>
    //   {this.state.view.name === 'mapResults'
    //     && <div>
    /* <SearchBar view={this.setView} user={this.state.user}/> */
    // <Mapbox view = {this.setView} user={this.state.user} location={this.state.location}/>
    // {/* <BottomNav /> */}
    //   </div>

    // }

    // {this.state.view.name === 'searchResult'
    //   && <div>
    //     <SearchBar view={this.setView} user={this.state.user} location={this.state.location}/>
    //     <SearchResultGuide />
    //     <SearchPackages />
    /* <UpComingTuursList view={this.setView} /> */
    /* <BottomNav /> */
    //   </div>

    // }

    // {this.state.view.name === 'userProfile' &&
    //   <div>
    //     <UserProfile view={this.setView} user={ this.state.user }/>
    /* <UpComingTuursList view={this.setView} /> */
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'signUp' &&
    //   <SignUp view={this.setView} status={this.setStatus}/>

    // }
    // {this.state.view.name === 'editProfile' &&
    //   <div>
    //     <EditProfile view={this.setView} user={ this.state.user} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'createPackage' &&
    //   <div>
    //     <CreatePackage view={this.setView} user={ this.state.user} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'editPackage' &&
    //   <div>
    //     <EditPackage view={this.setView} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'calendar' &&
    //   <div>
    //     <DatePicker view={this.setView} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'logIn' &&
    //   <div>
    //     <LogIn view={this.setView} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'itinerary' &&
    //   <div>
    //     <Itinerary view={this.setView} />
    /* <BottomNav /> */
    //   </div>

    // }
    // {this.state.view.name === 'search'
    //  <div>
    // <Search view={this.setView} />
    /* <BottomNav /> */
    //   </div>
    //   : null
    // }
    // {this.state.view.name === 'packageDetails'
    //   <div>
    //     <PackageDetails view={this.setView} />
    /* <BottomNav /> */
    //     </div>
    //     : null
    //   }
    // </div>
    );
  }
}

export default App;
