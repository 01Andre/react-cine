import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import Axios from "axios";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";
import "bootstrap/dist/css/bootstrap.min.css";

const POPUlAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=60a98ac2bb749e56f0528ecffd3d91bb";
const API_END_POINT = "https://api.themoviedb.org/3/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    Axios.get(`${API_END_POINT}${POPUlAR_MOVIES_URL}&${API_KEY}`).then(
      function(response) {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
      }.bind(this)
    );
  }

  applyVideoToCurrentMovie() {
    Axios.get(
      `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=true`
    ).then(
      function(response) {
        const youtubeKey = response.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({ currentMovie: newCurrentMovieState });
        console.log(this.state.currentMovie)
 
      }.bind(this)
    );
  }
  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} />;
      }
    };
    return (
      <div>
        <div className="mt-3 mb-5">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-md-8">
              
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
