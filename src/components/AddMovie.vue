<template>
  <article class="add">
    <section class="search-bar specific">
      <div class="search-bar-search search-bar-add">
        <div class="search-bar-search-div">
          <i class="fa fa-search" @click="fetchMovies"></i>
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
    </section>
    <section class="add-search-result-to-many-alert" v-show="!alertWindowClosed">
      <div class="add-search-result-to-many-alert-text">
        <div class="add-search-result-to-many-alert-close-div">
          <i class="fa fa-times" aria-hidden="true" @click="alertWindowClosed = true"></i>
        </div>
        <h2>Too Many Search Results</h2>
        <h4>Please choose a year to narrow down result</h4>
      </div>
    </section>
    <section class="add-search-result">
      <div class="add-search-result-movie" v-for="movie in searchResult" :key="movie.imdbID" @click="imdbID = movie.imdbID; selectMovie(movie, movie.imdbID)">
        <img :src="movie.Poster" alt="Movie poster">
        <h4>{{ movie.Title }}(<span>{{ movie.Year }}</span>)</h4>
      </div>
    </section>
  </article>
</template>

<script>
export default {
      data() {
        return {
        search: '',
        specificSearch: '',
        specificSearchYear: '',
        alertWindowClosed: true
        }
    },
    computed: {
        searchResult() {
        return this.$store.getters.getSearchResult;
        },
        getCurrentYear() {
            const year = new Date().getFullYear()
            return Array.from({length: year - 1900}, (value, index) => 1901 + index)
        }
    },
    methods: {
    async fetchMovies() {
      let searchReplaced = '';
      
        searchReplaced = this.specificSearch.replace(/ /g, "+");
        console.log(searchReplaced);


      if(this.specificSearchYear == 'Year' || this.specificSearchYear == '') {
        await this.$store.dispatch('fetchMovies', searchReplaced);
      } else {
        let year = this.specificSearchYear;
        let payload = {searchReplaced, year};
        await this.$store.dispatch('fetchSpecificMovie', payload);
      }

      this.specificSearch = '';
      this.specificSearchYear = '';
      this.search = '';

      if(this.$store.getters.getSearchResult == undefined) {
        this.alertWindowClosed = false;
      } else {
        this.alertWindowClosed = true;
      }
    },
    }
};
</script>