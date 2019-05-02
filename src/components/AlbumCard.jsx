import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import {
  withStyles
} from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    borderRadius: 10,
  },
  media: {
    paddingTop: '56.25%',
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
