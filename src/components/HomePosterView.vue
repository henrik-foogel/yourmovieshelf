<template>
    <article class="home-comp">
        <section class="search-bar">
      <div class="search-bar-search">
      <div class="search-bar-search-div">
        <i class="fa fa-search"></i>
        <input class="search-bar-input" type="text" v-model="search" placeholder="search" label="Search input field">
      </div>
      <i class="fa fa-times" aria-hidden="true" @click="search = ''"></i>
      </div>
    </section>
    <section class="home-not-signed-in" v-if="signedIn == false">
         <div class="home-not-signed-in-container">
        <h2 class="home-not-signed-in-container-header">Page Under Construction</h2>
        <p>-Some things may not work or design is not implemented-</p>
        <h3 class="home-not-signed-in-container-header">Please register or sign in</h3>
      </div>
    </section>
    <div class="home-movie-title" v-show="signedIn == true">
      <div class="home-movie-poster-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch(false)" label="Poster View" value="Regular View"></div>
      <h1>Your Collection:</h1>
      <div class="home-search-criteria-container">
        <select class="home-search-criteria" v-model="search" label="Search criteria dropdown select">
          <option value="" disabled selected label="Criteria">Criteria</option>
          <option v-for="shelf in getShelfs" :key="shelf" :label="shelf">{{ shelf }}</option>
          <option value="" disabled selected label="-">-</option>
          <option v-for="format in getFormats" :key="format" :label="format">{{ format }}</option>
          <option value="" disabled selected label="-">-</option>
          <option v-for="edition in getEditions" :key="edition" :label="edition">{{ edition }}</option>
        </select>
      </div>
    </div>
    <section class="home-not-signed-in" v-show="signedIn == false"> 
      <div class="home-not-signed-in-container">
        <h2 class="home-not-signed-in-container-header">Page Under Construction</h2>
        <p>-Some things may not work or design is not implemented-</p>
        <h3 class="home-not-signed-in-container-header">Please register or sign in</h3>
      </div>
    </section>
    <section class="home-collection poster">
      <div class="home-collection-movie" v-for="movie in filterCollection" :key="movie.movie.imdbID" @click="imdbID = movie.movie.imdbId; selectMovie(movie.movie)">
        <img :src="movie.movie.Poster" alt="Movie poster">
      </div>
    </section>
    </article>
</template>

<script>
export default {
    name: 'home',
  data() {
    return { 
      search: '',
      searchResult: '',
      signedInStorage: '',
    }
  },
  computed: {
    signedIn() {
      return this.$store.getters.getSignedIn;
    },
    getCollection() {
        return this.$store.getters.getUserCollection;
    },
    filterCollection() {
         return this.getCollection.filter((movie) => {
          return movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Director.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Actors.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.format.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.edition.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.soundtrack.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.shelf.toLowerCase().includes(this.search.toLowerCase());
        });
      },
      getShelfs() {
          return this.$store.getters.getCustomShelfs;
      },
      getFormats() {
        return this.$store.getters.getFormats;
      },
      getEditions() {
        return this.$store.getters.getEditions;
      }
  },
  methods: {
    async selectMovie(movie) {
      let inCollection = true;
      this.$store.commit('setInCollection', inCollection);
      await this.$store.commit('setSelectedMovie', movie);
      this.$router.push('/selected');
    },
    viewSwitch(view) {
        this.$store.commit('setSearch', this.search);
        this.$store.commit('setPosterViewTrueFalse', view);
    }
  }
}
</script>