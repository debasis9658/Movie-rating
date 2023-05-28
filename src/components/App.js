import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies } from '../actions';
class App extends React.Component {
  componentDidMount(){
    //Make an api call to get to movie
    //Dispatch the action to 

    const { store } = this.props;

    store.subscribe(()=>{
      console.log('updated');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));

    console.log('state', this.props.store.getState());
  }
  render(){
    const movies = this.props.store.getState()
    return (
      <div className="App">
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className='tab'>Movies</div>
            <div className='tab'>Favourites</div>
          </div>

          <div className='List'> 
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
