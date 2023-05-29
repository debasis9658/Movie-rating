import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
class App extends React.Component {
  componentDidMount(){
    //Make an api call to get to movie
    //Dispatch the action to store

    const { store } = this.props;

    store.subscribe(()=>{
      console.log('updated');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));

    
  }

  isMovieFavourite = (movie) => {

    const { movies } = this.props.store.getState();
    
    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      //found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) =>{
    this.props.store.dispatch(setShowFavourites(val))
  }

  render(){
    console.log('state', this.props.store.getState());
    const { movies, search } = this.props.store.getState(); // will return { movies: {}, search: []}

    const { list, favourites, showfavourites } = movies;
    const displayMovies = showfavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar 
        search={search} 
        dispatch={this.props.store.dispatch}
        />
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showfavourites ? '' : 'active-tabs'}`} onClick={() => {this.onChangeTab(false)}}>Movies</div>
            <div className={`tab ${showfavourites ? 'active-tabs' : ''}`} onClick={() => {this.onChangeTab(true)}}>Favourites</div>
          </div>

          <div className='List'> 
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>

          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> :  null}

        </div>
      </div>
    );
  }
  
}

export default App;
