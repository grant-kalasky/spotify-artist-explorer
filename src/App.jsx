import React from 'react';
import Spotify from 'spotify-web-api-js';
import './styles/App.css';
import ArtistInput from './components/ArtistInput';
import ArtistTree from './components/ArtistTree';
import ArtistSidebar from './components/ArtistSidebar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      currentDevice: "",
      authToken: "",
      mySpotifyClient: "",
      rootArtist: "",
      selectedArtist: "",
      isRootSelected: false
    };

    this.handleSelectArtist = this.handleSelectArtist.bind(this);
    this.handleArtistExpand = this.handleArtistExpand.bind(this);
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);

      const { devices } = await this.spotifyClient.getMyDevices();
      this.setState({
        authenticated: true,
        devices,
        currentDevice: devices[0].id,
        authToken: accessToken,
        mySpotifyClient: this.spotifyClient
      });
    }
  }
  
  handleSelectArtist(artist) {
    this.setState({
      rootArtist: artist,
      selectedArtist: artist,
      isRootSelected: true
    });
  }

  handleArtistExpand(node) {
    this.setState({
      selectedArtist: node.artist
    });
  }

  render() {
    const {
      authenticated,
      mySpotifyClient,
      rootArtist,
      selectedArtist,
      isRootSelected
    } = this.state;
    if (!authenticated) {
      return (
        <a 
          href={`https://accounts.spotify.com/authorize/?client_id=c905808b09014699b50463170c5c27cb&response_type=token&redirect_uri=${window
            .location.origin +
            window.location
            .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
          className="login">
          Login with Spotify
        </a>
      );
    }
    return (
      <div className="flex-container">
        <ArtistInput spotifyClient={mySpotifyClient} onSubmit={this.handleSelectArtist} />
        <div className="tree-container">
          {isRootSelected && 
            <ArtistTree spotifyClient={mySpotifyClient} root={rootArtist} onExpand={this.handleArtistExpand} />
          }
        </div>
        <div className="sidebar-container">
          <div className="card-container">
            {isRootSelected && 
              <ArtistSidebar spotifyClient={mySpotifyClient} root={selectedArtist} />
            }
          </div>
        </div>
      </div>
    );
  }
}
