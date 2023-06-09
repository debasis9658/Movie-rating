import { combineReducers } from 'redux';
import 
{ 
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  SET_SHOW_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from '../actions';


const initialMoviesState = {
    list: [],
    favourites: [],
    showfavourites: false
}

export function movies (state = initialMoviesState, action){
    
   switch(action.type) {
    case ADD_MOVIES:
       return {
        ...state,
        list: action.movies
       }; 

    case ADD_TO_FAVOURITES:
        return {
            ...state,
            favourites: [action.movie, ...state.favourites]
        };
    case REMOVE_FROM_FAVOURITES:
        const filteredArray = state.favourites.filter(
            movie => movie.Title !== action.movie.Title
        );
        return {
            ...state,
            favourites: filteredArray
        }; 
    case SET_SHOW_FAVOURITES:
        return {
            ...state,
            showfavourites: action.val
        } 
    case ADD_MOVIE_TO_LIST:
        return {
            ...state,
            list: [action.movie, ...state.list],
    };           
    default:
        return state;  
        
   }

}

const initialSearchState = {
    result: {},
    showSearchResults: false
};
export function search(state = initialSearchState, action){
    
    switch(action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults : true
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false
        };          
        default:
            return state;  
            
       }
}


//Define a root reducer because we only can pass one reducer to our store and here we have called movies and search reducer for other purposes.

// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState
// }

// export default function rootReducer(state = initialRootState, action){
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }


//combineReducer does the same work provided by redux
export default combineReducers({
    movies,
    search
});