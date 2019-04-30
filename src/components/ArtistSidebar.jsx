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
} from "@material-ui/core";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
  } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AlbumCard from './AlbumCard';
// import MediaControlCard from './MediaControlCard';

const styles = theme => ({
    card: {
      borderRadius: 10,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      marginTop:'30',
    },
    root: {
      backgroundColor: 'white',
    },
    chip: {
      margin: theme.spacing.unit - 5,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
})

class ArtistSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootArtist: this.props.root,
      // expanded: false,
      topTrackArray: [],
      albumArray: [],
      shadow: 1
    };
  }
  
  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });

  // handleExpandClick = () => {
  //   this.setState(state => ({ expanded: !state.expanded }));
  // };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
      this.componentDidMount();
    }
  }

  async getTopTracks() {
    const tracksObject = await this.props.spotifyClient.getArtistTopTracks(this.state.rootArtist.id, "US");
    console.log(Object.values(tracksObject.tracks));
    var trackArray = Object.values(tracksObject.tracks).map(function (track) {
        return [track.name, track.id]
    });
    console.log(trackArray);
    this.setState({
        topTrackArray: trackArray,
    });
  }

  async getAlbums () {
    const albumObject = await this.props.spotifyClient.getArtistAlbums(this.state.rootArtist.id, "album");
    console.log(Object.values(albumObject.items));
    var albumArray = Object.values(albumObject.items).map(function (album) {
      return  [album.name, album.images[0].url, album.id, album.external_urls.spotify, album.release_date.substring(0,4)]
    });
    console.log(albumArray);
    this.setState({
      albumArray: albumArray,
    });
  }

  // async startPlayback(songId) {
  //   await this.spotifyClient.play({
  //     device_id: this.state.currentDevice,
  //       uris: [`spotify:track:${songId}`]
  //     });
  // }

  render() {
    const { classes } = this.props;

    return (
        <Card className={classes.card} onMouseOver={this.onMouseOver} 
              onMouseOut={this.onMouseOut}>
          <CardActionArea>
              <CardMedia
              className={classes.media}
              image={this.state.rootArtist.images[0].url}
              style = {styles.media}
              />
          </CardActionArea>
          <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h4" align="left" >
                    {this.state.rootArtist.name}
                </Typography>
                <Typography variant="subtitle1" >
                    <div>
                        <a href={this.state.rootArtist.external_urls.spotify} target="_blank">View Artist on Spotify</a>
                    </div>
                    <div>Followers: {this.formatNumber(this.state.rootArtist.followers.total)}</div>
                    <div>Popularity: {this.state.rootArtist.popularity}</div>
                    {/* {this.state.topTracks}  */}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant={"h6"} >Genres:</Typography> 
                {this.state.rootArtist.genres.map(genre => (
                    <Chip 
                    className={classes.chip}
                    label={genre} 
                    color="secondary"
                    component="a"
                    target="_blank" 
                    clickable
                    href={`https://open.spotify.com/search/results/${genre}`}
                    key={genre.toString()}
                    />
                ))}
              </CardContent>
              <CardContent>
                <Typography variant="h6" >
                    Top Tracks:
                </Typography>
              </CardContent>
              {this.state.topTrackArray.map(song => (
                    <CardContent>
                        <Typography variant="subtitle2" gutterBottom={false}>
                            {song[0]} 
                        </Typography>
                    </CardContent>
              ))}
              {this.state.albumArray.map(album => (
                <AlbumCard name={album[0]} imageURL={album[1]}/>
              ))}
             

          </CardActionArea>
          <CardActions>
              {/* <Button size="small" color="primary">
              Action1 
              </Button>
              <Button size="small" color="primary">
              Action2
              </Button> */}
              {/* <MediaControlCard></MediaControlCard> */}
          </CardActions>
        </Card>
    );
  }
}

export default withStyles(styles)(ArtistSidebar);