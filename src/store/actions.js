// import {state} from './state';
import axios from "axios";
import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";
import { auth } from "../../firebase-config";
import { key } from "../../omdb-config";
import { token } from "../../discogs-config";
import router from "../router/index.js"

export const actions = {
    async registerWithFirebase(ctx, payload) {
      if (payload[1] == payload[2]) {
        fb.auth()
        .createUserWithEmailAndPassword(payload[0], payload[1])
        .then(response => {
          ctx.dispatch("createUserCollection", response);
          ctx.dispatch('userSignIn', payload);
        })
        .catch(error => {
          console.log(error);
          ctx.commit('setLoginFailure', true);
          ctx.commit('setFailureMessage', error.message);
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
          ctx.commit('setSignInBox', false);
          if(payload[2] == true) {
            ctx.commit('setKeepSignedIn', true);
            localStorage.setItem("loggedIn", response.user.uid);
          } else {
            ctx.commit('setKeepSignedIn', false);
            sessionStorage.setItem('loggedIn', response.user.uid);
          }
          ctx.dispatch("fetchCustomShelfs");
          ctx.dispatch('fetchMovieNightLists', response.user.uid);
        })
        .catch(error => {
          ctx.commit('setLoginFailure', true);
          ctx.commit('setFailureMessage', error.message);
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
            localStorage.removeItem('userCollection')
            localStorage.removeItem('userCustomShelfs')
            localStorage.removeItem('userSoundtracks')
            ctx.commit('setSignedInStorage', "");
            ctx.commit('setUserCollection', []);
            router.push('/');
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
          if(result == undefined) {
            ctx.commit('setSearchResponse', false);
          }
        },
        async fetchSpecificMovie(ctx, payload) {
          let specificSearchResult = [];
          let result = [];
          await axios.get('http://www.omdbapi.com/?apiKey='+ key.key + '&t='+ payload.searchReplaced + '&y=' + payload.year).then((response) => { specificSearchResult = response.data });
          result.push(specificSearchResult);
        ctx.commit('setSearchResult', result);
        ctx.commit('setSearchResponse', result[0].Response);
      },
      async fetchMovieById(ctx, payload) {
        let  movie = [];
        await axios.get('http://www.omdbapi.com/?i=' + payload.id + '&apikey='+ key.key).then((response) => { movie = response.data });
          movie.shelf = payload.movieArr.shelf;
          movie.soundtrack = payload.movieArr.soundtrack;
          movie.rating = payload.movieArr.rating;
          movie.format = payload.movieArr.format;
          movie.edition = payload.movieArr.edition;
          ctx.commit('setSelectedMovie', movie);
      },
      async addToCollection(ctx, payload) {
        if(payload.id != false) {
          let movieArr = [];
          await axios.get('http://www.omdbapi.com/?i=' + payload.id + '&apikey='+key.key).then((response) => { movieArr = response.data });
          if(movieArr.Ratings == '') {
            movieArr.Ratings.push({none: 'none'})
          }
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
          await db.collection(auth.currentUser.uid).add({
              movie: movie
          })

        } else {
          let movie = {
            Title: payload.title,
            Director: payload.director,
            Writer: payload.writer,
            Actors: payload.actors,
            Plot: payload.plot,
            shelf: payload.shelf,
            soundtrack: payload.soundtrack,
            rating: payload.rating,
            format: payload.format,
            edition: payload.edition,
            Genre: payload.genre,
            Ratings: payload.ratings,
            Year: payload.year,
            Runtime: payload.runtime,
            imdbID: payload.imdbID,
            Poster: payload.poster
          }
          await db.collection(auth.currentUser.uid).add({
              movie: movie
          })

        }
        ctx.dispatch('fetchUserCollection', auth.currentUser.uid)
      },
      async deleteFromCollection(ctx, movie) {
        let collection = await db.collection(auth.currentUser.uid).get();
        let number = 0;
        await collection.forEach(doc => {
          Object.keys(doc.data()).forEach(function(key) {     
            if(doc.data()[key].Actors == movie.Actors && doc.data()[key].Director == movie.Director && 
            doc.data()[key].Genre == movie.Genre && doc.data()[key].Plot == movie.Plot && 
            doc.data()[key].Title == movie.Title && doc.data()[key].edition == movie.edition && 
            doc.data()[key].format == movie.format && doc.data()[key].shelf == movie.shelf && 
            doc.data()[key].rating == movie.rating && doc.data()[key].Poster == movie.Poster && 
            doc.data()[key].Runtime == movie.Runtime) {
              if(number == 0) {
                db.collection(auth.currentUser.uid).doc(doc.id).delete()
                number = 1;
              }
            }      
          });
        });
        number = 0;
        await ctx.dispatch('fetchUserCollection', auth.currentUser.uid);
        await ctx.commit('setInCollection', false);
      },
      async editMovieInCollection(ctx, movie) {
        let collection = await db.collection(auth.currentUser.uid).get();
        let number = 0;
        let film = ctx.getters.getSelectedMovie;
        await collection.forEach(doc => {
          Object.keys(doc.data()).forEach(function(key) {     
            if(doc.data()[key].Actors == film.Actors && doc.data()[key].Director == film.Director && 
            doc.data()[key].Genre == film.Genre && doc.data()[key].Plot == film.Plot && 
            doc.data()[key].Title == film.Title && doc.data()[key].edition == film.edition && 
            doc.data()[key].format == film.format && doc.data()[key].shelf == film.shelf && 
            doc.data()[key].rating == film.rating) {
              if(number == 0) {
                db.collection(auth.currentUser.uid).doc(doc.id).set({
                  movie
                  });
                number = 1;
              }
            }      
          });
        });
        number = 0;
        await ctx.dispatch('fetchUserCollection', auth.currentUser.uid);
        ctx.commit('setEditMovie', false);
      },
      async fetchUserCollection(ctx) {
        if(auth.currentUser.uid != null) {
        let collection = await db.collection(auth.currentUser.uid).get();
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
        if(respArr == '') {
          ctx.commit('setFirstTimeUser', true)
        }
        ctx.dispatch('fetchCustomShelfs');
        ctx.dispatch('fetchYourSoundtracks');
        localStorage.setItem('userCollection', JSON.stringify(ctx.getters.getUserCollection));
      }
      },
      async fetchCustomShelfs(ctx) {
        let shelfs = '';
        shelfs = await db.collection(auth.currentUser.uid).get();
        let respArr = [];
        shelfs.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            respArr.push(doc.data())
          } else {
            return
          }
        })
        let customShelfs = [];
        if(respArr[0].customShelf != null) {
            if(Array.isArray(respArr[0].customShelf)) {
              customShelfs = respArr[0].customShelf.sort((a, b) => (a > b) ? 1 : -1);
            } else {              
              customShelfs.push(respArr[0].customShelf);
            }
          ctx.commit('setCustomShelfs', customShelfs);
          localStorage.setItem('userCustomShelfs', JSON.stringify(customShelfs));
          if(ctx.getters.getUneditedShelfs) {
          if(ctx.getters.getUneditedShelfs.length == 0) {
            ctx.commit('setUneditedShelfs', customShelfs);
            ctx.commit('setEditShelfModeOn', false);
          } else if(ctx.getters.getEditShelfModeOn == true) {
            ctx.commit('setUneditedShelfs', customShelfs);
            ctx.commit('setEditShelfModeOn', false);
          }
        }
      }
      },
      async addShelfToCustomShelfs(ctx, newShelf) {
        var docRef = await db.collection(auth.currentUser.uid).doc(ctx.getters.getEmailDocumentId);
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
              ctx.commit('setBeforeEditShelfs', newShelf);
              ctx.dispatch('fetchCustomShelfs');
          } else {
              let data = [];
              data.push(shelf);
              docRef.update({customShelf: shelf});
              console.log("No such document!");
              ctx.dispatch('fetchUserCollection', auth.currentUser.uid);
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
        
      },
      async editShelfs(ctx, shelfs) {
          var docRef = await db.collection(auth.currentUser.uid).doc(ctx.getters.getEmailDocumentId);
          docRef.update({customShelf: shelfs});
          ctx.commit('setCustomShelfs', shelfs);
          ctx.dispatch('editShelfsInMovies', shelfs);
      },
      async editShelfsInMovies(ctx) {
        var docRef = await db.collection(auth.currentUser.uid).get();
       await docRef.forEach(movie => {
          if(hasOwnProperty.call(movie.data(), 'movie')) {
            for (let i = 0; i < ctx.getters.getBeforeEditShelfs.length; i++) {
              if(movie.data().movie.shelf == ctx.getters.getBeforeEditShelfs[i]) {
                db.collection(auth.currentUser.uid).doc(movie.id).update({movie: {
                  Actors: movie.data().movie.Actors,
                  Director: movie.data().movie.Director,
                  Genre: movie.data().movie.Genre,
                  Plot: movie.data().movie.Plot,
                  Poster: movie.data().movie.Poster,
                  Ratings: movie.data().movie.Ratings,
                  Runtime: movie.data().movie.Runtime,
                  Title: movie.data().movie.Title,
                  Writer: movie.data().movie.Writer,
                  Year: movie.data().movie.Year,
                  edition: movie.data().movie.edition,
                  format: movie.data().movie.format,
                  imdbID: movie.data().movie.imdbID,
                  rating: movie.data().movie.rating,
                  shelf: ctx.getters.getEditedShelfs[i],
                  soundtrack: movie.data().movie.soundtrack
                }})
              }
              ctx.commit('setEditShelfModeOn', true);
              ctx.dispatch('fetchUserCollection');
            } 
          }
        });
        ctx.commit('setBeforeEditShelfs', []);
        ctx.commit('setEditedShelfs', []);
      },
      async deleteShelf(ctx, shelf) {
        var exists = false;
        var oldShelfList = ctx.getters.getCustomShelfs;
        var docRef = await db.collection(auth.currentUser.uid).get();
        var docShelf = await db.collection(auth.currentUser.uid).doc(ctx.getters.getEmailDocumentId);
        await docRef.forEach(movie => {
          if(hasOwnProperty.call(movie.data(), 'movie')) {
            if(movie.data().movie.shelf == shelf) {  
              exists = true
            }
          } 
        });
        if(exists == false) {
          let index = oldShelfList.indexOf(shelf)
            oldShelfList.splice(index, 1);
            docShelf.update({
              customShelf: oldShelfList 
            });
            ctx.commit('setShelfInUse', exists);
        }else {
          ctx.commit('setShelfInUse', exists);
        }

      },
      async addMovieNightList(ctx, payload) {
        var docRef = await db.collection(auth.currentUser.uid);
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
      async fetchMovieNightLists(ctx) {
        if(auth.currentUser.uid != null) {
        let collection = await db.collection(auth.currentUser.uid).get();
        let respArr = [];
        collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'movieNightList')) {
            respArr.push(doc.data())
          } else {
            return
          }
      });
      ctx.commit('setMovieNightListFromDB', respArr);
      localStorage.setItem('userMovieNightLists', JSON.stringify(respArr));
      }
    },
    async deleteMovieNightList(ctx, name) {
      await db.collection(auth.currentUser.uid).where('name', '==', name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(auth.currentUser.uid).doc(doc.id).delete()
        );
      })
      ctx.dispatch('fetchMovieNightLists');
    },
    async updateMovieNightList(ctx, payload) {
      await db.collection(auth.currentUser.uid).where('name', '==', payload.name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(auth.currentUser.uid).doc(doc.id).set(payload.list)
        );
      })
    },
    async findSoundtrack(ctx, payload) {
      let music = [];
      if(payload.title != '' && payload.artist != '') {
        music = await axios.get('https://api.discogs.com/database/search?release_title='+payload.title+'&genre=Stage+&+Screen&artist='+payload.artist+'&token='+token.token)
      } else if(payload.title == '' && payload.artist != '') {
        music = await axios.get('https://api.discogs.com/database/search?genre=Stage+&+Screen&artist='+payload.artist+'&token='+token.token)
      } else if(payload.title != '' && payload.artist == '') {
        music = await axios.get('https://api.discogs.com/database/search?release_title='+payload.title+'&genre=Stage+&+Screen&token='+token.token)
      }
      let list = music.data.results.slice(music.data.results[0]);
      ctx.commit('setSoundtrackSearchResult', list);
    },
    async addSoundtrackToDB(ctx, soundtrack) {
      if(ctx.getters.getSoundtracksId == '') {
        let docRef = await db.collection(auth.currentUser.uid);
        let data = {
          0: soundtrack,
          soundtracks: true
        }
        docRef.add(data);
      } else {
        let docRef = await db.collection(auth.currentUser.uid).doc(ctx.getters.getSoundtracksId);
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
      ctx.dispatch('fetchUserCollection', auth.currentUser.uid);
      ctx.dispatch('fetchYourSoundtracks');
    },
    async fetchYourSoundtracks(ctx) {
      let docRef = await db.collection(auth.currentUser.uid).doc(ctx.getters.getSoundtracksId);
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
        localStorage.setItem('userSoundtracks', JSON.stringify(resultArray));
    },
    async deleteSoundtrack(ctx, soundtrack) {
      let list = [];
      let obj = [];
      let number = 0;
      await ctx.getters.getSoundtrackList.forEach(album => {
        if(album[1].soundtrackTitle == soundtrack.soundtrackTitle && 
          album[1].soundtrackImg == soundtrack.soundtrackImg && 
          album[1].soundtrackFormat == soundtrack.soundtrackFormat && number == 0) {
            number = 1;
          } else {
            list.push(album[1])
          }
        })
        obj = Object.assign({}, list, {'soundtracks': true});
        db.collection(auth.currentUser.uid).doc(ctx.getters.getSoundtracksId).set(obj);
        ctx.dispatch('fetchYourSoundtracks');
    }
  }