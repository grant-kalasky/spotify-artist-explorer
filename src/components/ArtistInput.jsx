import React from 'react';
import Spotify from "spotify-web-api-js";
import Input from '@material-ui/core/Input';

export default class ArtistInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", // initialize search query to empty string
      artistResults: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const newAristValue = e.target.value;
    this.setState({ 
      search: newAristValue
     });
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const {
      artists: { items: artistResults }
    } = await this.props.spotifyClient.searchArtists(this.state.search, {
      market: "us",
      limit: 10
    });
    this.setState({ artistResults });
  }

  render() {
    return (
      // TODO: Add Material UI Component
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            placeholder="Search for artist..."
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
        {this.state.artistResults.map(artist => (
          <p>{artist.name}</p>
        ))}
      </div>
      
    );
  }
}