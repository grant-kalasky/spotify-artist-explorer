import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AlbumCard from './AlbumCard';

const styles = theme => ({
  card: {
    borderRadius: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginTop: '30'
  },
  root: {
    backgroundColor: 'white'
  },
  chip: {
    margin: theme.spacing.unit - 5
  },
  actions: {
    display: 'flex'
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

class ArtistSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootArtist: this.props.root,
      expanded: false,
      topTrackArray: [],
      albumArray: [],
      shadow: 1
    };
  }
  
  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  componentDidMount() {
    if (!this._isMounted) {
      this.getTopTracks();
      this.getAlbums();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.root !== prevProps.root) {
      this.setState({ rootArtist: this.props.root });
      this._isMounted = false;
    }
    if (!this._isMounted) {
      this.componentDidMount();
    }
  }

  async getTopTracks() {
    const tracksObject = await this.props.spotifyClient.getArtistTopTracks(this.state.rootArtist.id, "US");
    var trackArray = Object.values(tracksObject.tracks).map(function(track) {
      return [track.name, track.id]
    });
    this.setState({
      topTrackArray: trackArray
    });
    this._isMounted = true;
  }

  async getAlbums () {
    const albumObject = await this.props.spotifyClient.getArtistAlbums(this.state.rootArtist.id, {
      include_groups: "album",
      limit: 10
    });
    var albumArray = Object.values(albumObject.items).map(function(album) {
      return [album.name, album.images[0].url, album.id, album.external_urls.spotify, album.release_date.substring(0,4)]
    });
    this.setState({
      albumArray: albumArray
    });
    this._isMounted = true;
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.state.rootArtist.images[0].url}
            style={styles.media}
          />
        </CardActionArea>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" align="left">
              {this.state.rootArtist.name}
            </Typography>
            <Typography variant="subtitle1">
              <div>
                <a 
                  href={this.state.rootArtist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer">
                  View Artist on Spotify
                </a>
              </div>
              <div>Followers: {this.formatNumber(this.state.rootArtist.followers.total)}</div>
              <div>Popularity: {this.state.rootArtist.popularity}/100</div>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6">Genres</Typography> 
            {this.state.rootArtist.genres.map(genre => (
              <Chip 
                key={genre.toString()}
                className={classes.chip}
                label={genre} 
                color="secondary"
                component="a"
                target="_blank" 
                clickable
                href={`https://open.spotify.com/search/${genre}`}
              />
            ))}
          </CardContent>
          <CardContent>
            <Typography variant="h6">Top Tracks</Typography>
          </CardContent>
          {this.state.topTrackArray.map(song => (
            <CardContent key={song.toString()}>
              <Typography variant="subtitle1">
                {song[0]}
              </Typography>
            </CardContent>
          ))}
          <CardContent>
            <Typography gutterBottom variant="h6">Albums</Typography> 
            {this.state.albumArray.map(album => (
              <AlbumCard key={album.toString()} name={album[0]} imageURL={album[1]} />
            ))}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistSidebar);
