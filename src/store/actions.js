// import {state} from './state';
import axios from "axios";
import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";
import { key } from "../../omdb-config";
import { token } from "../../discogs-config";

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
      async deleteFromCollection(ctx, movie) {
        let collection = await db.collection(ctx.getters.getUser).get();

        await collection.forEach(doc => {
          Object.keys(doc.data()).forEach(function(key) {     
            if(doc.data()[key].Actors == movie.Actors && doc.data()[key].Director == movie.Director && 
            doc.data()[key].Genre == movie.Genre && doc.data()[key].Plot == movie.Plot && 
            doc.data()[key].Title == movie.Title && doc.data()[key].edition == movie.edition && 
            doc.data()[key].format == movie.format && doc.data()[key].shelf == movie.shelf) {
              db.collection(ctx.getters.getUser).doc(doc.id).delete()
            }      
          });
        });
        ctx.dispatch('fetchUserCollection', ctx.getters.getUser);
        ctx.commit('setInCollection', false);
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
      async fetchCustomShelfs(ctx) {
        let shelfs = '';
          shelfs = await db.collection(ctx.getters.getUser).get();
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
      ctx.commit('setMovieNightListFromDB', respArr);
      }
    },
    async deleteMovieNightList(ctx, name) {
      await db.collection(ctx.getters.getUser).where('name', '==', name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).delete()
        );
      })
      ctx.dispatch('fetchMovieNightLists', ctx.getters.getUser);
    },
    async updateMovieNightList(ctx, payload) {
      await db.collection(ctx.getters.getUser).where('name', '==', payload.name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).set(payload.list)
        );
      })
    },
    async findSoundtrack(ctx, payload) {
      let music = [];
      if(payload.title != '' && payload.artist != '') {
        music = await axios.get('https://api.discogs.com/database/search?release_title='+payload.title+'&style=soundtrack&artist='+payload.artist+'&token='+token.token)
      } else if(payload.title == '' && payload.artist != '') {
        music = await axios.get('https://api.discogs.com/database/search?style=soundtrack&artist='+payload.artist+'&token='+token.token)
      } else if(payload.title != '' && payload.artist == '') {
        music = await axios.get('https://api.discogs.com/database/search?release_title='+payload.title+'&style=soundtrack&token='+token.token)
      }
      let list = music.data.results.slice(music.data.results[0]);
      ctx.commit('setSoundtrackSearchResult', list);
    },
    async addSoundtrackToDB(ctx, soundtrack) {
      if(ctx.getters.getSoundtracksId == '') {
        console.log(ctx.getters.getSoundtracksId)
        let docRef = await db.collection(ctx.getters.getUser);
        let data = {
          0: soundtrack,
          soundtracks: true
        }
        docRef.add(data);
      } else {
        let docRef = await db.collection(ctx.getters.getUser).doc(ctx.getters.getSoundtracksId);
        let data = []
        await docRef.get().then(e => {
          data.push(e.data())
        });
        if(Object.keys(data[0]).length == 0) {
          await docRef.update({[Object.keys(data[0]).length+1]:soundtrack})
        } else {
          await docRef.update({[Object.keys(data[0]).length]:soundtrack})
        }
      }
      ctx.dispatch('fetchUserCollection', fb.auth().currentUser.uid);
      ctx.dispatch('fetchYourSoundtracks');
    },
    async fetchYourSoundtracks(ctx, user) {
      let docRef = await db.collection(user).doc(ctx.getters.getSoundtracksId);
      let data = []
        await docRef.get().then(e => {
            data.push(e.data())
        });
        delete data[0].soundtracks;
        let resultArray = Object.keys(data[0]).map(function(key) {
          return [Number(key), data[0][key]];
        });
        resultArray.sort((a, b) => (a[1].soundtrackTitle > b[1].soundtrackTitle) ? 1 : -1)
        ctx.commit('setSoundtrackList', resultArray);
    },
    async deleteSoundtrack(ctx, soundtrack) {
      let list = [];
      let obj = [];
      await ctx.getters.getSoundtrackList.forEach(album => {
        if(album[1].soundtrackTitle == soundtrack.soundtrackTitle && 
          album[1].soundtrackImg == soundtrack.soundtrackImg && 
          album[1].soundtrackFormat == soundtrack.soundtrackFormat) {
            console.log(album[1])
          } else {
            list.push(album[1])
          }
        })
        obj = Object.assign({}, list, {'soundtracks': true});
        db.collection(ctx.getters.getUser).doc(ctx.getters.getSoundtracksId).set(obj);
        ctx.dispatch('fetchYourSoundtracks', ctx.getters.getUser);
    }
  }