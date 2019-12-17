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
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
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
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/myshelfs',
    name: 'customize',
    component: Customize,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
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
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
          next()
        } else {
          console.log('Not signed in');   
          next('/')
        }
      });
    }
  },
  {
    path: '/addsoundtracks',
    name: 'addsoundtracks',
    component: AddSoundtracks,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.commit("setSignedIn", true);
          store.commit("setUser", user.uid);
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
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
          store.dispatch("fetchUserCollection");
          store.dispatch('fetchCustomShelfs');
          store.dispatch('fetchMovieNightLists');
          store.dispatch('fetchCustomShelfs');
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
