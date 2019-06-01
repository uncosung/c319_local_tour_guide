import React, { Component } from 'react';
import UserProfile from './user-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';
import BottomNav from './bottom-nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'signUp'
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name) {
    const view = { name };
    this.setState({ view });
  }

  render() {
    return (
      <div>
        {this.state.view.name === 'userProfile'
          ? <div>
            <UserProfile view={this.setView}/>
            <BottomNav />
          </div>
          : null
        }
        {this.state.view.name === 'signUp'
          ? <SignUp view={this.setView}/>
          : null
        }
        {this.state.view.name === 'editProfile'
          ? <div>
            <EditProfile view={this.setView} />
            <BottomNav />
          </div>
          : null
        }

      </div>
    );
  }
}

export default App;
