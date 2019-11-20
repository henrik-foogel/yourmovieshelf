<template>
  <article class="add">
    <section class="search-bar specific">
      <div class="search-bar-search search-bar-add">
        <div class="search-bar-search-div">
          <font-awesome-icon icon="search" class="fa fa-search" @click="fetchMovies"></font-awesome-icon>
          <input  class="search-bar-input specific" type="text" v-model="specificSearch" placeholder="specific search" @keyup.enter="fetchMovies"/>
        </div>
        <select class="search-bar-year-selector" v-model.number="specificSearchYear">
          <option class="search-bar-input year-placeholder" value disabled selected>Year</option>
          <option
            class="search-bar-input year"
            v-for="year in getCurrentYear"
            :key="year"
          >{{ year }}</option>
        </select>
      </div>
      <input type="button" class="home-search-button" @click="fetchMovies" value="Search" alt="Search button">
    </section>
  <addMovieSearch v-show="!getChosen"/> 
  <Selected v-show="getChosen"/> 
  </article>
</template>
<script>
import addMovieSearch from '@/components/addMovieSearch.vue'
import Selected from '@/components/selected.vue'

export default {
  components: {
    addMovieSearch,
    Selected
  },
  data() {
    return {
      search: '',
      specificSearch: '',
      specificSearchYear: '',
      }
    },
    computed: {
        searchResult() {
        return this.$store.getters.getSearchResult;
        },
        getCurrentYear() {
            const year = new Date().getFullYear()
            return Array.from({length: year - 1900}, (value, index) => 1901 + index)
        },
        getChosen() {
          return this.$store.getters.getChosen;
        }
    },
    methods: {
    async fetchMovies() {
      let searchReplaced = '';
      
      searchReplaced = this.specificSearch.replace(/ /g, "+");

      if(this.specificSearchYear == 'Year' || this.specificSearchYear == '') {
        await this.$store.dispatch('fetchMovies', searchReplaced);
      } else {
        let year = this.specificSearchYear;
        let payload = {searchReplaced, year};
        await this.$store.dispatch('fetchSpecificMovie', payload);
      }

      this.$store.commit('setChosen', false);

      if(this.$store.getters.getSearchResult == undefined) {
        this.$store.commit('setAlertWindowClosed', false);

      } else {
        this.$store.commit('setAlertWindowClosed', true);
      }
    },
    
    },
    mounted() {
      if(this.$store.getters.getUser == '') {
        this.$router.push('/');
      }
    }
};
</script>