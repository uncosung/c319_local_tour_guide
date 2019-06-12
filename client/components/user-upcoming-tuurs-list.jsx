
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: 80,
    height: 80
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
  marginLeft: {
    marginLeft: theme.spacing(2)
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
    margin: theme.spacing(2),
    height: 260
  },
  margin: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginTop2: {
    marginTop: theme.spacing(4)
  }
});

class UpComingTuursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      packages: [],
      booked: []
    };
  }

  componentDidMount() {
    let email = '';
    console.log( 'lksjdflksdjflsdkjfdslfjsdklfsjl', this.props.user );

    fetch('/api/booking.php?email')
      .then(res => res.json())
      .then(packages => this.setState({ packages }));

    fetch("/api/package.php?email")
      .then(res => res.json())
      .then(booked => this.setState({ booked }), () => console.log( booked ));
  }

  render() {
    // console.log('0000', this.props );
    const { classes } = this.props;
    const packageMap = this.state.booked.map((packageItem, id) => {
      return <UpComingTuurItem key={id} package={packageItem} key={packageItem.id} />;
    });
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h4">
            Upcoming Tuurs
          </Typography>
        </Container>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={1.5} cellHeight={300}>
            {packageMap}
          </GridList>
        </div>
        <Grid justify="center" className={classes.margin} container>
          <Grid className={classes.marginTop2} container justify="center" >
            {/* <ThemeProvider theme={theme}> */}
            {/* IF GUIDE, INCLUDE CREATE PACKAGE BUTTON */}
            {/* <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary" onClick={() => this.props.view('createPackage', this.props.user)}>
                <Typography variant="body1" gutterBottom>Create Package</Typography>
              </Button> */}
            {/* </ThemeProvider> */}
          </Grid>
        </Grid>
      </>
    );
  }

}

export default withStyles(styles)(UpComingTuursList);
