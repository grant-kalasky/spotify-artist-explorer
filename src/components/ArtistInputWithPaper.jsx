import React from 'react';
import '../styles/artistInputWithPaper.css';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, Input, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

export default class ArtistInputWithPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", // initialize search query to empty string
      artistResults: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({ artistResults: [] });
  }

  render() {
    return (
      // TODO: Add Material UI Component
    //   <div className="artist-search-container">
    //     <form className="marginNormal" onSubmit={this.handleSubmit} noValidate autoComplete="off">
    //       <TextField 
    //         id="outlined-name"
    //         label="Search for an artist"
    //         variant="outlined"
    //         onChange={this.handleChange}
    //         fullWidth={true}
    //       />
    //       <List >
    //         {this.state.artistResults.map(artist => (
    //           <ListItem button onClick={this.handleClick} divider={true}>
    //             <ListItemText primary={artist.name} />
    //           </ListItem>
    //         ))}
    //       </List>
    //     </form>
    //   </div>
        <div className="artist-search-container">
            <Paper className="root" elevation={1}>
                <InputBase className="input" placeholder="Search for artist" onChange={this.handleChange}/>
                <IconButton classname="iconButton" aria-label="Search" onClick={this.handleSubmit} >
                    <SearchIcon />
                </IconButton>
                <List >
                    {this.state.artistResults.map(artist => (
                        <ListItem button onClick={this.handleClick} divider={true}>
                            <ListItemText primary={artist.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
        
    );
  }
}