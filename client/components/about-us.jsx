import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    display: 'flex',
    height: '165px',
    marginBottom: theme.spacing(2),
    width: '89%'
  },
  cover: {
    width: '100%',
    height: '100%',
    margin: 0
  },
  content: {
    flex: '1 0 auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  padding: {
    padding: 0
  },
  title: {
    margin: theme.spacing(2)
  }

});

function AboutUs(props) {
  const { classes } = props;
  return (
        <>
        <Grid container justify="center">
          <Typography variant="h3" className={classes.title}>
           About us
          </Typography>

          <Card className={classes.card}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <CardMedia
                  className={classes.cover}
                  image="https://files.slack.com/files-pri/T1EHQUJ8J-FKFAH3WA3/image.png"
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent className={classes.content}>
                  <Typography variant="h5">
                  Jennifer
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.padding}>
                  I'm the mother of components
                  </Typography>
                  <div><i className="fab fa-github"></i><span> link</span></div>
                  <div><i className="fab fa-linkedin"></i></div>
                  <div><i className="far fa-envelope"></i></div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>

          <Card className={classes.card}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <CardMedia
                  className={classes.cover}
                  image="https://files.slack.com/files-pri/T1EHQUJ8J-FK22V7P3L/image.png"
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent className={classes.content}>
                  <Typography variant="h5">
                Eric
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                mapbox :3
                  </Typography>
                  <div><i className="fab fa-github"></i></div>
                  <div><i className="fab fa-linkedin"></i></div>
                  <div><i className="far fa-envelope"></i></div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.card}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <CardMedia
                  className={classes.cover}
                  image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fbacf43e-aac2-41bf-a9a5-948cc74d6e9d/dd5ft1h-5c6ae97a-30da-4b1c-ad22-8b47530de733.png/v1/fill/w_894,h_894,strp/yuumi___league_of_legends_by_nifzimus_dd5ft1h-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcL2ZiYWNmNDNlLWFhYzItNDFiZi1hOWE1LTk0OGNjNzRkNmU5ZFwvZGQ1ZnQxaC01YzZhZTk3YS0zMGRhLTRiMWMtYWQyMi04YjQ3NTMwZGU3MzMucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ym02s3Yh8tJFQCkI2uapjueQ6fsLkC6CPs949Z_xj_o"
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent className={classes.content}>
                  <Typography variant="h5">
                 Kate
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
               Boba?
                  </Typography>
                  <div><i className="fab fa-github"></i></div>
                  <div><i className="fab fa-linkedin"></i></div>
                  <div><i className="far fa-envelope"></i></div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.card}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <CardMedia
                  className={classes.cover}
                  image="https://files.slack.com/files-pri/T1EHQUJ8J-FK22Y5FT5/image.png"
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent className={classes.content}>
                  <Typography variant="h5">
                   Kevin
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                   I'll be the breaker of code.
                  </Typography>
                  <div><i className="fab fa-github"></i></div>
                  <div><i className="fab fa-linkedin"></i></div>
                  <div><i className="far fa-envelope"></i></div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
       </>
  );
}

export default withStyles(styles)(AboutUs);
