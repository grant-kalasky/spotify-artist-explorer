import React from 'react';
import Tree from 'react-d3-tree';
import '../styles/ArtistTree.css';

export default class ArtistTree extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.treeContainer = React.createRef();
    this.state = {
      rootArtist: this.props.root,
      treeData: [],
      depthLimit: 5,
      childLimit: 4,
      translate: {
        x: window.innerWidth / 4,
        y: window.innerHeight / 2.5
      }
    };
  }

  componentDidMount() {
    if (!this._isMounted) {
      this.createTree();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Begins constructing tree with root
  async createTree() {
    const rootArtist = this.state.rootArtist;
    var rootNode = {
      name: rootArtist.name,
      _collapsed: true,
      children: []
    }

    rootNode.children = await this.addChildren(rootArtist, rootNode.children, 1);

    this.setState({ 
      treeData: [rootNode]
    });
    
    this._isMounted = true;
  }

  async addChildren(parentArtist, children, currDepth) {
    var depthLimit = this.state.depthLimit;
    var childLimit = this.state.childLimit;

    var rootRelatedArtists = await this.getRelatedArtists(parentArtist);

    // recursive base case
    if (children.length === 0 && currDepth < depthLimit) {
      for (let i = 0; i < childLimit; i++) {
        let currNode = {
          name: rootRelatedArtists[i].name,
          _collapsed: true,
          children: []
        }
        currNode.children = await this.addChildren(rootRelatedArtists[i], currNode.children, currDepth + 1);

        children.push(currNode);
      }
      
    }
    return children;
  }

  // Pings API for related artists and adds them as children to current branch
  async getRelatedArtists(artist) {
    const relatedArtists = await this.props.spotifyClient.getArtistRelatedArtists(artist.id);
    return relatedArtists.artists;
  }

  render() {
    this.componentDidMount();

    if (this._isMounted) {
      return (
        <div className="tree-component-wrapper">
          <Tree 
            data={this.state.treeData} 
            translate={this.state.translate}
          />
        </div>
      );
    }
    return (
      <div className="loading-component-wrapper">
        <p>Tree is rendering...</p>
      </div>
    );
  }
}
