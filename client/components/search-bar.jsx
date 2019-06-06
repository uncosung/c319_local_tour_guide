import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import DateRangePicker from './date-range-picker';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  grow: {
    flexGrow: 1,
    display: 'inline-block'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
    display: 'inline-block'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  display: {
    display: 'inline-block',
    paddingBottom: 10,
    margin: 0,
    paddingLeft: 10
  },
  buttonDiv: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#A6C7C8',
    '&.active, &:hover, &.active:hover': {
      backgroundColor: '#A6C7C8'
    }
  },
  buttonContainer: {
    paddingLeft: 15
  },
  paper: {
    position: 'absolute',
    width: 380,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  subtitle: {
    fontSize: 20
  },
  width: {
    width: 0,
    opacity: 0,
    position: 'absolute'
  }
});

const categories = [
  'Food',
  'Shopping',
  'Coffee',
  'Outdoors',
  'Nightlife',
  'Activities'
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      openModal: false,
      tags: [],
      dates: {
        start: null,
        end: null
      }
    };
    this.handdleToggle = this.handdleToggle.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      tags: value
    });
  }

  handdleToggle(event) {
    let newToggle = this.state.toggle;
    this.setState({ toggle: !newToggle });
  }
  handleModalClose(dates) {
    let startDate = dates.start;
    let endDate = dates.end;
    this.setState({
      openModal: false,
      dates: { start: startDate, end: endDate }
    }, () => console.log(this.state.dates));
  }
  modalClose() {
    this.setState({ openModal: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <>
         <ThemeProvider theme={theme}>
           <AppBar position="static" color="primary" className={classes.display}>
             <Grid container direction="row" className={classes.grow}>
               <Grid item xs={8} className={classes.display}>
                 <Toolbar>
                   <div className={classes.search}>
                     <Grid className={classes.searchIcon}>
                       <SearchIcon style={{ fontSize: 30 }} />
                     </Grid>
                     <InputBase
                       placeholder="Search…"
                       classes={{
                         root: classes.inputRoot,
                         input: classes.inputInput
                       }}
                       inputProps={{ 'aria-label': 'Search' }}
                     />
                   </div>
                 </Toolbar>
               </Grid>

               <Grid item xs={3} className={classes.display}>
                 <FormControlLabel control={
                   <Switch checked={this.state.isGuide} onChange={() => this.handdleToggle(event)} />} label={this.state.toggle ? 'LIST' : 'MAP'} />
               </Grid>
             </Grid>

             <Grid container className={classes.buttonContainer}>
               <Grid item xs={3} className={classes.buttonDiv}>
                 <Button type="submit" className={classes.button} fullWidth variant="contained" color="secondary" onClick={() => this.setState({ openModal: true })}>Dates</Button>
               </Grid>

               <Grid item xs={3}>
                 <Button type="submit" className={classes.button} fullWidth variant="contained" color="secondary">Filter
                   <Select
                     className={classes.width}
                     multiple
                     value={this.state.tags}
                     onChange={this.handleChange}
                   >
                     {categories.map(name => (
                       <MenuItem key={name} value={name}>
                         <Typography className={classes.subtitle} variant="subtitle2" align="left" gutterBottom>
                           {name}
                         </Typography>
                       </MenuItem>
                     ))}
                   </Select>
                 </Button>
               </Grid>
             </Grid>
           </AppBar>
         </ThemeProvider>

         <Grid item xs={10}>
           <Modal
             aria-labelledby="date-range-picker"
             aria-describedby="date-range"
             open={this.state.openModal}
             onClose={() => this.handleModalClose(this.state.dates)}
           >
             <Grid className={classes.paper}>
               <DateRangePicker key={this.state.title} close={this.handleModalClose} modalClose={this.modalClose}/>
             </Grid>
           </Modal>
         </Grid>

      </>
    );
  }
}

export default withStyles(styles)(SearchBar);