import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddMovie from '../views/AddMovie.vue'
import Customize from '../views/Customize.vue'
import MovieNight from '../views/MovieNight.vue'
import AddSoundtracks from '../views/AddSoundtracks.vue'
import Soundtracks from '../views/Soundtracks.vue'
import { fb } from "../../firebase-config";
import store from '../store/store'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));
          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next()
        }
      });
    }
  },
  {
    path: '/addmovie',
    name: 'addmovie',
    component: AddMovie,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));
          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/myshelves',
    name: 'customize',
    component: Customize,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));
          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/movienight',
    name: 'movienight',
    component: MovieNight,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));
          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/addsoundtrack',
    name: 'addsoundtrack',
    component: AddSoundtracks,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));

          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/soundtracks',
    name: 'soundtracks',
    component: Soundtracks,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          if(localStorage.getItem('userCollection')){
            store.commit('setUserCollection', JSON.parse(localStorage.getItem('userCollection')));
            store.commit('setEmailDocumentId', JSON.parse(localStorage.getItem('emailId')));
            store.commit('setSavedMovieNightLists', JSON.parse(localStorage.getItem('movieNightId')));
            store.commit('setSoundtracksId', JSON.parse(localStorage.getItem('soundtrackId')));
          } else {
            store.dispatch("fetchUserCollection");
          }
          if(localStorage.getItem('userCustomShelfs')){
            store.commit('setCustomShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
            store.commit('setBeforeEditShelfs', JSON.parse(localStorage.getItem('userCustomShelfs')))
          } else {
            store.dispatch("fetchCustomShelfs");
            store.commit('setBeforeEditShelfs', store.getters.getCustomShelfs)
          }
          if(localStorage.getItem('userMovieNightLists')){
            store.commit('setMovieNightListFromDB', JSON.parse(localStorage.getItem('userMovieNightLists')))
          } else {
            store.dispatch("fetchMovieNightLists");
          }
          if(localStorage.getItem('userSoundtracks')){
            store.commit('setSoundtrackList', JSON.parse(localStorage.getItem('userSoundtracks')))
          } else {
            store.dispatch("fetchYourSoundtracks");
          }
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
]

const router = new VueRouter({
  routes
});

export default router
