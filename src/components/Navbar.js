import React from 'react';
import { addMovieToList, handleMovieSearch } from '../actions';
// import { data } from '../data';
// import { StoreContext } from '..';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };


  render () {
    const { showSearchResults, result:movie } = this.props.search;
    return (
        <div className="nav">
          <div className='search-container'>
            <input onChange={this.handleSearchChange} />
            <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      );
  }
}

export default Navbar;
