import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import BottomNav from './bottom-nav';
// import BottomNav from './bottom-nav';
import DatePicker from './daterangepicker';
import UpComingTuursList from './user-upcoming-tuurs-list';
import CreatePackage from './createPackage';
import EditPackage from './editPackage';
import LogIn from './log-in';
import Itinerary from './itinerary';
import SearchBar from './search-bar';
import SearchResultGuide from './search-result-guide-list';
import SearchPackages from './search-result-package';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'searchResult'
      },
      user: {}
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, user) {
    const view = { name };
    this.setState({ view, user });
  }

  render() {
    return (
    // <Router>
    //   <div>
    //     <Route path="/" component={CreatePackage} />
    //     <BottomNav />
    //   </div>
    // </Router>

      <div>
        {this.state.view.name === 'searchResult'
          ? <div>
            <SearchBar view={this.setView} user={this.state.user}/>
            <SearchResultGuide />
            <SearchPackages />
            {/* <UpComingTuursList view={this.setView} /> */}
            {/* <BottomNav /> */}
          </div>
          : null
        }

        {this.state.view.name === 'userProfile'
          ? <div>
            <UserProfile view={this.setView} user={ this.state.user }/>
            {/* <UpComingTuursList view={this.setView} /> */}
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'signUp'
          ? <SignUp view={this.setView} status={this.setStatus}/>
          : null
        }
        {this.state.view.name === 'editProfile'
          ? <div>
            <EditProfile view={this.setView} user={ this.state.user} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'createPackage'
          ? <div>
            <CreatePackage view={this.setView} user={ this.state.user} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'editPackage'
          ? <div>
            <EditPackage view={this.setView} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'calendar'
          ? <div>
            <DatePicker view={this.setView} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'logIn'
          ? <div>
            <LogIn view={this.setView} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
        {this.state.view.name === 'itinerary'
          ? <div>
            <Itinerary view={this.setView} />
            {/* <BottomNav /> */}
          </div>
          : null
        }
      </div>

    );
  }
}

export default App;
