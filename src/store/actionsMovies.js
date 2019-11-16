import axios from "axios";
import { db } from "../../firebase-config";
import { key } from "../../omdb-config";

export const actions = {
    async fetchMovies(ctx, search) {
        let result = [];
        await axios
          .get(
            "http://www.omdbapi.com/?apiKey=" + key.key + "&s=" + search + "&page=1"
          )
          .then(response => {
            result = response.data.Search;
          });
        ctx.commit("setSearchResult", result);
      },
      async fetchSpecificMovie(ctx, payload) {
        let specificSearchResult = [];
        let result = [];
        await axios.get('http://www.omdbapi.com/?apiKey='+ key.key + '&t='+ payload.searchReplaced + '&y=' + payload.year).then((response) => { console.log(response); specificSearchResult = response.data });
        result.push(specificSearchResult);
        ctx.commit('setSearchResult', result);
      },
      async fetchMovieById(ctx, payload) {
        let  movie = [];
        await axios.get('http://www.omdbapi.com/?i=' + payload.id + '&apikey='+ key.key).then((response) => { console.log(response); movie = response.data });
          movie.shelf = payload.movieArr.shelf;
          movie.soundtrack = payload.movieArr.soundtrack;
          movie.rating = payload.movieArr.rating;
          movie.format = payload.movieArr.format;
          movie.edition = payload.movieArr.edition;
        ctx.commit('setSelectedMovie', movie);
      },
      async addToCollection(ctx, payload) {
        let movieArr = [];
        await axios.get('http://www.omdbapi.com/?i=' + payload.id + '&apikey='+key.key).then((response) => { console.log(response); movieArr = response.data });
        let movie = {
          Title: movieArr.Title,
          Director: movieArr.Director,
          Writer: movieArr.Writer,
          Actors: movieArr.Actors,
          Plot: movieArr.Plot,
          shelf: payload.shelf,
          soundtrack: payload.soundtrack,
          rating: payload.rating,
          format: payload.format,
          edition: payload.edition,
          Genre: movieArr.Genre,
          Ratings: movieArr.Ratings,
          Year: movieArr.Year,
          Runtime: movieArr.Runtime,
          imdbID: movieArr.imdbID,
          Poster: movieArr.Poster
        }
  
        await db.collection(ctx.getters.getUser).add({
            movie: movie
        })
        ctx.dispatch('fetchUserCollection', ctx.getters.getUser)
      
      },
      async fetchUserCollection(ctx, user) {
        if(user != '') {
        let collection = await db.collection(user).get();
        let respArr = [];
        await collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            ctx.commit('setEmailDocumentId', doc.id)
          } else {
            if(hasOwnProperty.call(doc.data(), 'movieNightList')) {
              ctx.commit('setSavedMovieNightLists', doc.id);
            } else {
              if(hasOwnProperty.call(doc.data(), 'soundtracks')) {
                ctx.commit('setSoundtracksId', doc.id);
              } else {
                respArr.push(doc.data())
              }
            }
          }
        })
        ctx.collection = respArr.sort((a, b) => (a.movie.Title > b.movie.Title) ? 1 : -1);
        ctx.commit('setUserCollection', respArr);
        ctx.dispatch('fetchCustomShelfs');
      }
      },
}