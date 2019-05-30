import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import LocationOn from '@material-ui/icons/LocationOn';
import Description from '@material-ui/icons/Description';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  },
  spacing: 8,
  button: {
    margin: theme.spacing.unit,
    right: 20
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      location: '',
      shortDescription: '',
      accout: 'tuurist'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className = "signUp-title-container">
          <h1 className="signUp-title">Sign Up</h1>
        </div>
        <Grid mx="auto" container justify="center">
          <form onSubmit={this.handleSubmit} >
            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField required id="input-name" label="Name" name="name" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Email />
                </Grid>
                <Grid item>
                  <TextField required id="input-email" label="Email" name="email" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <LocationOn />
                </Grid>
                <Grid item>
                  <TextField required id="input-location" label="location" name="location" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>

            <div className={classes.margin}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Description />
                </Grid>
                <Grid item>
                  <TextField required id="input-shortDescription" label="Description" name="shortDescription" onChange={this.handleChange} />
                </Grid>
              </Grid>
            </div>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignUp);