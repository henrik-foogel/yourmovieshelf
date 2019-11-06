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
      <div class="home-movie-poster-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch(true)" label="Poster View" value="Poster View"></div>
      <h1>Your Collection:</h1>
    </div>
    <div class="home-search-criteria-container" v-show="signedIn == true">
        <select class="home-search-criteria" v-model="search" label="Search criteria dropdown select">
          <option value="" disabled selected label="Criteria">Criteria</option>
          <option value="" disabled selected alt="Format">Your shelfs &#8659;</option>
          <option v-for="shelf in getShelfs" :key="shelf" :label="shelf" :alt="shelf">{{ shelf }}</option>
          <option value="" disabled selected alt="Formats">Formats &#8659;</option>
          <option v-for="format in getFormats" :key="format" :label="format" :alt="format">{{ format }}</option>
          <option value="" disabled selected alt="Editions">Editions &#8659;</option>
          <option v-for="edition in getEditions" :key="edition" :label="edition" :alt="edition">{{ edition }}</option>
        </select>
      </div>
      <input type="button" class="home-movie-night-button button" label="Create a Movie Night List" value="Create a Movie Night List" @click="movieNightButton = !movieNightButton; movieNight()">
    <section class="home-collection" v-show="!movieNightButton">
      <div class="home-collection-movie" v-for="movie in filterCollection" :key="movie.movie.imdbID" @click="imdbID = movie.movie.imdbId; selectMovie(movie.movie)">
        <div class="home-collection-movie-poster">
            <img :src="movie.movie.Poster" :alt="movie.movie.Title+' poster'">
        </div>
        <div class="home-collection-movie-text">
        <h4 :alt="'Movie title: '+movie.movie.Title">{{ movie.movie.Title }}(<span :alt="'year: '+movie.Year">{{movie.movie.Year}}</span>)</h4>
        <p :alt="'On what shelf: '+movie.movie.shelf">{{ movie.movie.shelf }}</p>
        <h5 :alt="'Director: '+movie.movie.Director">{{ movie.movie.Director }}</h5>
        <p :alt="'Director: '+movie.movie.Actors">{{ movie.movie.Actors }}</p>
        </div>
      </div>
    </section>
    <section class="home-collection" v-show="movieNightButton">
      <div class="home-collection-movie" v-for="movie in filterCollection" :id="movie.movie.imdbID" :key="movie.movie.imdbID" @click="chooseMovieForMovieNight(movie.movie)">
        <div class="home-collection-movie-poster">
            <img :src="movie.movie.Poster" :alt="movie.movie.Title+' poster'">
        </div>
        <div class="home-collection-movie-text">
        <h4 :alt="'Movie title: '+movie.movie.Title">{{ movie.movie.Title }}(<span :alt="'year: '+movie.Year">{{movie.movie.Year}}</span>)</h4>
        <p :alt="'On what shelf: '+movie.movie.shelf">{{ movie.movie.shelf }}</p>
        <h5 :alt="'Director: '+movie.movie.Director">{{ movie.movie.Director }}</h5>
        <p :alt="'Director: '+movie.movie.Actors">{{ movie.movie.Actors }}</p>
        </div>
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
      movieNightButton: false,
      movieNightList: []
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
      this.$store.commit('setInCollection', true);
      await this.$store.commit('setSelectedMovie', movie);
      this.$router.push('/selected');
    },
    viewSwitch(view) {
        this.$store.commit('setSearch', this.search);
        this.$store.commit('setPosterViewTrueFalse', view);
    },
    movieNight() {
      if(this.movieNightButton == true) {
        document.querySelector('.home-movie-night-button').style.background = "#7DC2AF"
        document.querySelector('.home-movie-night-button').style.color = "#282828"
        document.querySelector('.home-movie-night-button').style.boxShadow = "inset 0 0 10px #000000"
        document.querySelector('.home-movie-night-button').value = "Save";
      } else {
        document.querySelector('.home-movie-night-button').style.background = "#282828"
        document.querySelector('.home-movie-night-button').style.color = "#7DC2AF"
        document.querySelector('.home-movie-night-button').style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.25)"
        document.querySelector('.home-movie-night-button').value = "Create a Movie Night List";

      }
    },
    chooseMovieForMovieNight(movie) {
      if(document.querySelector('#'+movie.imdbID).style.opacity != '0.5') {
        this.movieNightList.push(movie);
        document.querySelector('#'+movie.imdbID).style.opacity = '.5'
        document.querySelector('#'+movie.imdbID).style.boxShadow = "inset 0 0 10px #000000"
      } else {
        for(var i = this.movieNightList.length; i >= 0; i--) {
          if(this.movieNightList[i] == movie) {
            this.movieNightList.splice(i, 1)
          }
        }
        document.querySelector('#'+movie.imdbID).style.opacity = '1.0'
        document.querySelector('#'+movie.imdbID).style.boxShadow = 'none'
      }
    }
  }
}
</script>

