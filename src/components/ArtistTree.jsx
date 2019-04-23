import React from 'react';
import Tree from 'react-d3-tree';

export default class ArtistTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootArtist: this.props.root
    };
  }

  render() {
    return(
      <p>Hello world</p>
    );
  }
}