// import {state} from './state';
import axios from "axios";
import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";
import { key } from "../../omdb-config";

export const actions = {
    async registerWithFirebase(ctx, payload) {
        if (payload[1] == payload[2]) {
          fb.auth()
            .createUserWithEmailAndPassword(payload[0], payload[1])
            .then(response => {
              ctx.dispatch("createUserCollection", response);
              console.log(response);
              ctx.dispatch('userSignIn', payload);
            })
            .catch(error => {
              ctx.commit('setLoginFailure', true);
              ctx.commit('setFailureMessage', error.message);
              console.log(error);
            });
        } else {
          ctx.commit('setLoginFailure', true);
          ctx.commit('setFailureMessage', "Password doesn't match, please try again");
        }
      },
      async createUserCollection(ctx, response) {
        await db.collection(response.user.uid).add({
          userEmail: response.user.email
        });
      },
      async userSignIn(ctx, payload) {
        await fb
        .auth()
        .signInWithEmailAndPassword(payload[0], payload[1])
        .then(response => {
          ctx.dispatch("fetchUserCollection", response.user.uid);
          ctx.userCollection = ctx.getters.getUserCollection;
          ctx.commit("setUser", response.user.uid);
          ctx.commit('setSignedIn', true);
          localStorage.setItem("loggedIn", response.user.uid);
          ctx.dispatch("fetchCustomShelfs");
        })
        .catch(error => {
          this.loginFailure = true;
          this.failureMessage = error.message;
          console.log(error);
        });
      },
      async userSignOut(ctx) {
        await fb.auth()
          .signOut()
          .then(() => {
            ctx.commit('setSignedIn', false);
            localStorage.removeItem("loggedIn");
            ctx.commit('setSignedInStorage', "");
          });
      },
      async fetchMovies(ctx, search) {
        let result = [];
        await axios
          .get(
            "http://www.omdbapi.com/?apiKey=" + key.key + "&s=" + search + "&page=1"
          )
          .then(response => {
            console.log(response);
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
        console.log(payload.shelf);
        await axios.get('http://www.omdbapi.com/?i=' + payload.id + '&apikey=206f5d4e').then((response) => { console.log(response); movieArr = response.data });
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
        ctx.dispatch('fetchUserCollection', fb.auth().currentUser.uid)
      
      },
      async fetchUserCollection(ctx, user) {
        let collection = await db.collection(user).get();
        var docRef = await db.collection(fb.auth().currentUser.uid).doc(collection.docs[0].id);
        ctx.commit('setEmailDocumentId', docRef.id)
        let respArr = [];
        collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            ctx.commit('setEmailDocumentId', doc.id)
          } else {
            respArr.push(doc.data())
          }
        })
        console.log(respArr)
        ctx.collection = respArr.sort((a, b) => (a.movie.Title > b.movie.Title) ? 1 : -1);
        ctx.commit('setUserCollection', respArr);
        ctx.dispatch('fetchCustomShelfs');
      },
      async fetchCustomShelfs(ctx) {
        let shelfs = '';
          // shelfs = await db.collection(ctx.getters.getUser).get();
          shelfs = await db.collection(fb.auth().currentUser.uid).get();
        let respArr = [];
        shelfs.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            respArr.push(doc.data())
          } else {
            return
          }
        respArr.push(doc.data())
      })
      ctx.customShelfs = respArr[0].customShelf.sort((a, b) => (a > b) ? 1 : -1);
        ctx.commit('setCustomShelfs', ctx.customShelfs);
      },
    }