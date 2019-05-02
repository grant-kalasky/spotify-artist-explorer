import React from 'react';
import {
    Card,
    CardHeader,
    CardActionArea,
    CardContent,
    CardMedia,
    CardActions,
    Checkbox,
    Chip,
    Button,
    Avatar,
    Typography,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar
} from "@material-ui/core";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    borderRadius: 10,
    margin: 50
  },
  media: {
    // height: 0,
    paddingTop: '56.25%', // 16:9
    // marginTop: '30',
    objectFit: 'cover'
  },
  root: {
    backgroundColor: 'white'
  },
  actions: {
    display: 'flex'
  }
});

class AlbumCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootArtist: this.props.root,
      albumArray: this.props.albumArray
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.props.imageURL}
            style={styles.media}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1" align="center">
              {this.props.name}
            </Typography>
          </CardContent>
        </CardActionArea> 
      </Card>
    );
  }
}

export default withStyles(styles)(AlbumCard);
