import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';
import Alarm from '@material-ui/icons/Alarm';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import DatePicker from './date-multiple-picker';
import Modal from '@material-ui/core/Modal';
import CalendarToday from '@material-ui/icons/CalendarToday';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  },
  modalStyle: {
    top: 5,
    left: 5
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  }
});

class PackageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      newDates: [],
      dates: [],
      item: null,
      status: null
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.bookHandler = this.bookHandler.bind(this);
  }

  clickHandler() {
    this.props.view('result', []);
  }

  handleModalClose(dates) {
    this.setState({
      openModal: false,
      dates: dates
    });
  }

  modalClose() {
    this.setState({ openModal: false });
  }

  unavailableDates() {
    const currentDate = new Date();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    const maxMonth = this.maxMonth(month);
    const maxDay = 1;
    const maxYear = this.maxYear(maxMonth, year);
    const maxDate = new Date(maxYear, maxMonth, maxDay);
    let data = {
      disabledList: [],
      maxDate
    };
    while (month !== maxMonth || year !== maxYear) {
      day = this.nextDay(month, day);
      if (day === 1) {
        month = month === 11 ? 0 : ++month;
      }
      if (month === 0 && day === 1) {
        year = month === 1 ? ++year : year;
      }
      if (!this.checkAvailability(year, month, day)) {
        data.disabledList.push(new Date(year, month, day));
      }
    }
    return data;
  }

  maxMonth(currentMonth) {
    if (currentMonth >= 10) {
      return currentMonth + 2 - 12;
    }
    return currentMonth + 2;
  }

  maxYear(month, year) {
    if (!month) {
      return year++;
    }
    return year;
  }

  checkAvailability(year, month, day) {
    // dummy data ( expected date format ) ; replace with package data
    // const dummyDate = ['Thu Jun 06 2019 12:24:11 GMT-0700 (Pacific Daylight Time)',
    // 'Tue Jun 11 2019 12:24:11 GMT-0700 (Pacific Daylight Time)',
    // 'Sun Jun 09 2019 12:24:11 GMT-0700 (Pacific Daylight Time)'];
    const packageDates = JSON.parse(this.props.item.dates);
    let matched = false;
    for (var value of packageDates) {
      const packageDate = new Date(value);
      const packageYear = packageDate.getFullYear();
      const packageMonth = packageDate.getMonth();
      const packageDay = packageDate.getDate();

      if (packageYear === year && packageMonth === month && packageDay === day) {
        return true;
      }
    }
    return false;
  }

  nextDay(month, day) {
    // last day of month = 31
    if (month === 0 && day != 31) return ++day;
    // last day of month = 28
    if (month === 1 && day !== 28) return ++day;
    // last day of month = 31
    if (month === 2 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 3 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 4 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 5 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 6 && day !== 31) return ++day;
    // last day of month = 31
    if (month === 7 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 8 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 9 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 10 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 11 && day !== 31) return ++day;
    return 1;
  }

  bookHandler(dates) {
    // fetch('api/booking.php', {
    //   body: JSON.stringify({ tuuristId, packageId, tuuristEmail, dates })
    // })
  }

  componentDidMount() {
    console.log(this.props.match.params);
    const id = this.props.match.params.id;
    fetch('/api/package.php?id=' + id)
      .then(res => res.json())
      .then(item => this.setState({ item: item[0] }));
    // .then( item => this.setState( {item} ))
  }

  render() {
    const { classes } = this.props;
    if (!this.state.item) return null;

    return (
            <>

            <Card className={classes.card}>
              <Grid item xs={2} className={classes.paddingRight} name='back' onClick={ this.clickHandler }>
                <KeyboardArrowLeft className={classes.fontSize} />
              </Grid>
              <CardMedia
                className={classes.media}
                image={ this.state.item ? this.state.item.mainImage : null}
                // title="Space Needle"
              />
              <CardHeader
                title={ this.state.item ? this.state.item.title : null }
                // subheader="September 14, 2016"
              />
              <CardContent>
                <LocationOn /> { this.state.item ? this.state.item.location : null }
              </CardContent>
              <CardContent>
                {/* TRIP DURATION */}
                {/* <Alarm/> { timeRange } */}
              </CardContent>
              <CardContent>

                <Typography paragraph>Trip:</Typography>
                <Typography paragraph>
                  { this.state.item ? this.state.item.description : null }
                </Typography>

              </CardContent>
              <Grid justify="center" container>
                <Grid container justify="center" >
                  <ThemeProvider theme={theme}>
                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={() => this.setState({ openModal: true })}>
                      <Typography variant="body1" gutterBottom>Available Dates</Typography>
                    </Button>
                  </ThemeProvider>
                </Grid>

                <Grid item xs={11} >
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal}
                    onClose={() => this.handleModalClose(this.state.dates)}
                  >
                    <Grid className={classes.paper}>
                      <DatePicker
                        dates={this.state.dates}
                        close={this.handleModalClose}
                        modalClose={this.modalClose}
                        unavailableDates={ this.unavailableDates()}
                        booking={ this.bookHandler }
                      />
                    </Grid>
                  </Modal>
                </Grid>
              </Grid>
            </Card>
            </>
    );
  }

}

export default withStyles(styles)(PackageDetails);
