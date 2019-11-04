import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";
import { key } from "../../omdb-config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    checkSignedIn: false,
    searchResult: ''
  },
  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
    setSearchResult(state, search) {
      state.searchResult = search;
    },
  },
  actions: {
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
      console.log(ctx.checkSignedIn)
    },
    async fetchSpecificMovie(ctx, payload) {
      let specificSearchResult = [];
      let result = [];
      await axios.get('http://www.omdbapi.com/?apiKey='+ key.key + '&t='+ payload.searchReplaced + '&y=' + payload.year).then((response) => { console.log(response); specificSearchResult = response.data });
      result.push(specificSearchResult);
      ctx.commit('setSearchResult', result);
    },
    async fetchCollection(ctx) {
      console.log(db)
      console.log(fb)
      console.log(ctx.checkSignedIn)
    }
  },
  getters: {
    getSearch(state) {
      return state.search;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
  }
});
