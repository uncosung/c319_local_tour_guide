import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import Clear from '@material-ui/icons/Clear';

class ItineraryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  render() {
    const { classes } = this.props;
    const { title, timeRange, tags, profileEmail, mainImage, location, images, description, dates } = this.props.item;
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} variant="h4">
            Booked Tuurs
          </Typography>
        </Container>
        <Card className={classes.card}>
          <CardHeader
            title={title}
          // subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={images}
            title={title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
          </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick }
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Trip:</Typography>
              <Typography paragraph>
                {description}
            </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </>
    )
  }
}

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
    maxWidth: 400
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
  }
});

export default withStyles(styles)(ItineraryItem);