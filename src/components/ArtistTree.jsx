import React from 'react';
import Tree from 'react-d3-tree';

export default class ArtistTree extends React.Component {
  _rendered = false;

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
  async createTree() {
    const rootArtist = this.state.rootArtist;
    var rootNode = {
      name: rootArtist.name,
      children: []
    }

    var rootRelatedArtists = await this.getRelatedArtists(rootArtist);

    for (let i = 0; i < this.state.childLimit; i++) {
      let currNode = {
        name: rootRelatedArtists[i].name,
        children: []
      }
      rootNode.children.push(currNode);
    }
    
    if (!this._rendered) {
      this._rendered = true;
      this.setState({ 
        treeData: [rootNode]
       });
    }
  }

  // Pings API for related artists and adds them as children to current branch
  async getRelatedArtists(artist) {
    const relatedArtists = await this.props.spotifyClient.getArtistRelatedArtists(artist.id);
    return relatedArtists.artists;
  }

  render() {
    if (!this._rendered) {
      this.createTree();
    }
    return (
      <div className="tree-component-wrapper">
        <Tree data={this.state.treeData} />
      </div>
    );
  }
}
