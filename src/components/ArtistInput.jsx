import React from 'react';
import '../styles/artistInput.css';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';

export default class ArtistInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", // initialize search query to empty string
      artistResults: [],
      selectedArtist: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const newArtistValue = e.target.value;
    this.setState({ 
      search: newArtistValue
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      artists: { items: artistResults }
    } = await this.props.spotifyClient.searchArtists(this.state.search, {
      market: "us",
      limit: 10
    });
    this.setState({ artistResults });
  }

  handleClick(artist) {
    this.setState({ 
      artistResults: [],
      selectedArtist: artist
    });
    this.props.onSubmit(artist);
  }

  render() {
    return (
      <div className="artist-search-container">
        <form className="marginNormal" onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <TextField 
            id="outlined-name"
            label="Search for an artist"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth={true}
          />
          <List>
            {this.state.artistResults.map(artist => (
              <ListItem button 
                key={artist.id}
                onClick={() => this.handleClick(artist)}
                divider={true}>
                <ListItemText primary={artist.name} />
              </ListItem>
            ))}
          </List>
        </form>
      </div>
    );
  }
}
