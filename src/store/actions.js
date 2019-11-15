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
          if(payload[2] == true) {
            ctx.commit('setKeepSignedIn', true);
            localStorage.setItem("loggedIn", response.user.uid);
          } else {
            ctx.commit('setKeepSignedIn', false);
            sessionStorage.setItem('loggedIn', response.user.uid);
          }
          ctx.dispatch("fetchCustomShelfs");
          ctx.dispatch('fetchMovieNightLists', response.user.uid)
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
            sessionStorage.removeItem("loggedIn");
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
            // console.log(response);
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
  
        await db.collection(fb.auth().currentUser.uid).add({
            movie: movie
        })
        ctx.dispatch('fetchUserCollection', fb.auth().currentUser.uid)
      
      },
      async fetchUserCollection(ctx, user) {
        if(user != '') {
        let collection = await db.collection(user).get();
        let respArr = [];
        collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            ctx.commit('setEmailDocumentId', doc.id)
          } else {
            if(hasOwnProperty.call(doc.data(), 'movieNightList')) {
              ctx.commit('setSavedMovieNightLists', doc.id);
            } else {
              respArr.push(doc.data())
            }
          }
        })
        ctx.collection = respArr.sort((a, b) => (a.movie.Title > b.movie.Title) ? 1 : -1);
        ctx.commit('setUserCollection', respArr);
        ctx.dispatch('fetchCustomShelfs');
      }
      },
      async fetchCustomShelfs(ctx) {
        let shelfs = '';
          shelfs = await db.collection(fb.auth().currentUser.uid).get();
        let respArr = [];
        shelfs.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            respArr.push(doc.data())
          } else {
            return
          }
      })
      let customShelfs = respArr[0].customShelf.sort((a, b) => (a > b) ? 1 : -1);
        ctx.commit('setCustomShelfs', customShelfs);
      },

      async addShelfToCustomShelfs(ctx, newShelf) {
        var docRef = await db.collection(fb.auth().currentUser.uid).doc(ctx.getters.getEmailDocumentId);
        let shelf = newShelf;
        await docRef.get().then(function(doc) {
          if (doc.data().customShelf != undefined) {
              let dataArr = [];
              if(Array.isArray(doc.data().customShelf)) {
                doc.data().customShelf.forEach(shelf => {
                  dataArr.push(shelf);
                });
              } else {
                dataArr.push(doc.data().customShelf);
              }
              dataArr.push(shelf);
              let data = {
                customShelf: dataArr
                };
              docRef.update(data);

              ctx.dispatch('fetchCustomShelfs');
          } else {
              let data = [];
              data.push(shelf);
              docRef.update({customShelf: shelf});
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
        
      },
      async editShelfs(ctx, shelfs) {
        var docRef = await db.collection(fb.auth().currentUser.uid).doc(ctx.getters.getEmailDocumentId);
        docRef.update({customShelf: shelfs});
        ctx.commit('setCustomShelfs', shelfs);
      },
      async addMovieNightList(ctx, payload) {
        var docRef = await db.collection(fb.auth().currentUser.uid);
        var data = [];
        var name = payload.name
        payload.list.map(movie => movie[0].seen = false);
        payload.list.forEach(movie => {
          data.push(movie[0])
        });
        console.log(data)
        await docRef.add({
          movieNightList: data,
          name: name,
        })
        
      },
      async fetchMovieNightLists(ctx, user) {
        if(user != '') {
        let collection = await db.collection(user).get();
        let respArr = [];
        collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'movieNightList')) {
            respArr.push(doc.data())
          } else {
            return
          }
      });
      ctx.commit('setMovieNightListFromDB', respArr)
      }
    },
    async deleteMovieNightList(ctx, name) {
      await db.collection(ctx.getters.getUser).where('name', '==', name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).delete()
        );
      })
    },
    async updateMovieNightList(ctx, payload) {
      await db.collection(ctx.getters.getUser).where('name', '==', payload.name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).set(payload.list)
        );
      })
    }
  }