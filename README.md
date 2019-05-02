## Spotify Artist Explorer

**Team Members:** Liem Nguyen, Brandon Fang, Grant Kalasky

**Link:** https://spotifyartistexplorer.netlify.com/ 

**Prompt:** Spotify Client

### Abstract

We built a tool that allows users to easily discover new artists, ones inspired by their current favorite artists. Simply choose an artist and explore their network of related artists to find new music! To run the app in development mode, use the command `npm start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For the UI, we used Google's [Material-UI](https://material-ui.com/) component library. For the tree visualization, we used the [React D3 tree](https://github.com/bkrem/react-d3-tree) component.

### Components 

1. **ArtistInput** - Allows users to search for and select an artist to be used as root of tree.

2. **ArtistTree** - Creates a tree visualization of related artists given a root artist that is selected from ArtistInput.

3. **ArtistSidebar** - Dynamically displays information about a selected artist in the ArtistTree. Artist information includes number of followers, Spotify popularity, Spotify link, top songs and genres, and recent albums.

### Features

1. Visualize tree of related artists - A user is able to search for one of their favorite artists. Once the user selects an artist, a tree of related artists is rendered. The user is then able to expand various nodes and explore the network of various related artists.

2. Display artist information of artists in tree visualization - A user can select any artist node in the tree to learn more about that given artist. This includes the root artist. Relevant artist information (as mentioned above) includes number of followers, Spotify popularity, Spotify link, top songs, and genres. This allows users to more easily explore artists related to some of their current favorite artists.

### Division of Labor

Grant Kalasky started the repository, built the ArtistInput component, and worked with Liem to create the ArtistTree component.

Liem Nguyen worked with Grant to create the ArtistTree component and added dynamic rendering to the ArtistSidebar component. 

Brandon Fang built the ArtistSidebar component and added styling to combine it with the rest of the app.
