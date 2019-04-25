import React from 'react';
import Tree from 'react-d3-tree';

export default class ArtistTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootArtist: this.props.root,
      treeData: [],
      depthLimit: 5, 
      childLimit: 5
    };
  }

  // Begins constructing tree with root
  createTree() {
    const rootArtist = this.state.rootArtist;
    var rootNode = {
      name: rootArtist.name,
      children: []
    }

    var rootRelatedArtists = this.getRelatedArtists(rootArtist);

    for (let i = 0; i < this.state.childLimit; i++) {
      let currArtist = this.fetchArtist(rootRelatedArtists[i].id);
      let currNode = {
        name: currArtist.name,
        children: []
      }
      rootNode.children.append(currNode);
    }

    this.setState({ 
      treeData: [rootNode]
     });
  }

  
  async fetchArtist(artistID) {
    // ev.preventDefault();
    const artist = await this.props.spotifyClient.getArtist(artistID);
    return(artist);
  }

  // Pings API for related artists and adds them as children to current branch
  async getRelatedArtists(artist) {
    // ev.preventDefault();
    const relatedArtists = this.props.spotifyClient.getArtistRelatedArtists(artist.id);
    return(relatedArtists.artists);
  }



  render() {
    this.createTree();
    return(
      <div className="tree-component-wrapper">
        {/* <Tree data={this.state.treeData} /> */}
      </div>
    );
  }
}