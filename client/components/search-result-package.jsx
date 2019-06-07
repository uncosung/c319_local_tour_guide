import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchPackageItem from './search-result-package-item';
import SearchResultGuide from './search-result-guide-list';
import PackageDetails from './package-details';
import { Link } from '@material-ui/core';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
});

class SearchPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      view: {
        name: 'result',
        item: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(item) {
    const view = { item };
    this.setState({ view });

  }

  componentDidMount() {
    // fetch( 'api/package.php?id=1' )
    fetch('api/package.php')
      .then(res => res.json())
      .then(packages => this.setState({ packages }));
  }

  renderPackage() {
    const packages = this.state.packages.map((item, id) => {
      return <SearchPackageItem key={id} item={ item } view={ this.setView }/>;
    });
    // const packages = this.state.packages.map(item => {
    //     return <SearchPackageItem key={item.id} item={item } view={ this.setView }/>;
    //   });
    return packages;
  }

  render() {
    const { classes } = this.props;
    const { item } = this.state.view;
    return (
      <>
        {/* { name === 'detail' &&
            <PackageDetails item={ item } view={ this.setView} appView={ this.props.appView } />
        } */}
        {/* { name === 'result' && */}
            <>
                {/* <SearchResultGuide /> */}
                <Container className={classes.marginBottom} >
                  <Typography className={classes.marginTop} variant="h5">
                    Tuurs
                  </Typography>
                </Container>
                { this.state.packages ? this.renderPackage() : 'No available packages'}
              </>
        {/* } */}
      </>
    );
  }
}

export default withStyles(styles)(SearchPackages);
