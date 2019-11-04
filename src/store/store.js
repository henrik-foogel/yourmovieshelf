import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";
import { key } from "../../omdb-config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    checkSignedIn: false
  },
  mutations: {},
  actions: {
    async fetchMovies(ctx) {
      let result = [];
      await axios
        .get(
          "http://www.omdbapi.com/?apiKey=" + key.key + "&s=" + 'the+thing' + "&page=1"
        )
        .then(response => {
          console.log(response);
          result = response.data.Search;
        });
      ctx.commit("setSearchResult", result);
      console.log(ctx.checkSignedIn)
    },
    async fetchCollection(ctx) {
      console.log(db)
      console.log(fb)
      console.log(ctx.checkSignedIn)
    }
  },
  modules: {}
});
