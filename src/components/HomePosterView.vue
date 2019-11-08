<template>
    <article class="home-comp">
        <section class="search-bar">
      <div class="search-bar-search">
      <div class="search-bar-search-div">
        <i class="fa fa-search"></i>
        <input class="search-bar-input" type="text" v-model="search" placeholder="search" label="Search input field" @change="searchChange(); movieNightListChangeDom()">
      </div>
      <i class="fa fa-times" aria-hidden="true" @click="search = ''; filterCriteria = 'all'"></i>
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
        <select class="home-search-criteria" v-model="search" label="Search criteria dropdown select"  @change="filterChange">
          <option value="" disabled selected label="Criteria">Criteria</option>
          <option value="" label="All" data-foo="all">All</option>
          <option value="" disabled selected alt="Shelfs">Your shelfs &#8659;</option>
          <option class="shelfs" v-for="shelf in getShelfs" :value="shelf" :key="shelf" :label="shelf" :alt="shelf" data-foo="shelf">{{ shelf }}</option>
          <option value="" disabled selected alt="Formats">Formats &#8659;</option>
          <option class="formats"  v-for="format in getFormats" :value="format" :key="format" :label="format" :alt="format" ref="format" data-foo="format">{{ format }}</option>
          <option value="" disabled selected alt="Editions">Editions &#8659;</option>
          <option class="editions" v-for="edition in getEditions" :value="edition" :key="edition" :label="edition" :alt="edition" ref="edition"  data-foo="edition">{{ edition }}</option>
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
      <input type="button" class="home-movie-night-button poster-button button" label="Create a Movie Night List" value="Create a Movie Night List" @click="movieNightButton = !movieNightButton; movieNight(); movieNightButtonChange()">
    <section class="home-collection poster" v-show="!movieNightButton">
      <div class="home-collection-movie" v-for="movie in filterCollection" :key="movie.movie.imdbID">
        <img :src="movie.movie.Poster" alt="Movie poster" @click="imdbID = movie.movie.imdbId; selectMovie(movie.movie)">
      </div>
    </section>
    <section class="home-collection poster" v-show="movieNightButton">
      <div class="home-collection-movie" v-for="movie in filterCollection" :key="movie.movie.imdbID">
        <img :id="movie.movie.imdbID+'poster'" :src="movie.movie.Poster" alt="Movie poster" @click="imdbID = movie.movie.imdbId; chooseMovieForMovieNight(movie.movie)">
      </div>
    </section>
    </article>
</template>

<script>
export default {
    name: 'home-poster-comp',
    components: {
      
    },
  data() {
    return { 
      search: '',
      searchResult: '',
      signedInStorage: '',
      movieNightButton: false,
      movieNightList: [],
      filterCriteria: ''
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
        if(this.filterCriteria == 'shelf') {
        return this.getCollection.filter((movie) => {
          return movie.movie.shelf.toLowerCase()===(this.search.toLowerCase()) 
        });
      } else if(this.filterCriteria == 'format') {
        return this.getCollection.filter((movie) => {
          return movie.movie.format.toLowerCase()===(this.search.toLowerCase()) 
        });
      } else if(this.filterCriteria == 'edition') {
        return this.getCollection.filter((movie) => {
          return movie.movie.edition.toLowerCase()===(this.search.toLowerCase()) 
        });
      } else if(this.filterCriteria.toLowerCase == 'all') {
        return this.getCollection
      }
          return this.getCollection.filter((movie) => {
          return movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Director.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Actors.toLowerCase().includes(this.search.toLowerCase()) || 
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) ||  
          movie.movie.soundtrack.toLowerCase().includes(this.search.toLowerCase())
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
      },
      getSearchResult() {
        return this.$store.getters.getSearchResult;
      },
      getFilterCriteria() {
        return this.$store.getters.getFilterCriteria;
      },
      getMovieNightList() {
        return this.$store.getters.getMovieNightList;
      }, 
      getSearch() {
        return this.search;
      },
      getMovieNightButton() {
        return this.$store.getters.getMovieNightButton;
      }
  },
  watch: {
    getSearchResult() {
      this.search = this.$store.getters.getSearchResult;
    },
    getFilterCriteria() {
      this.filterCriteria = this.$store.getters.getFilterCriteria;
    },
    getSearch() {
      this.movieNightListChangeDom();
    },
    getMovieNightList() {
      this.movieNightListChangeDom();
    },
    getMovieNightButton() {
        this.movieNightButton = this.$store.getters.getMovieNightButton;
        this.movieNight();
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
        this.$store.commit('setSearchResult', this.search);
        this.$store.commit('setPosterViewTrueFalse', view);
    },
    movieNight() {
      if(this.movieNightButton == true) {
        document.querySelector('.poster-button').style.background = "#7DC2AF"
        document.querySelector('.poster-button').style.color = "#282828"
        document.querySelector('.poster-button').style.boxShadow = "inset 0 0 10px #000000"
        document.querySelector('.poster-button').value = "Save";
      } else if(this.movieNightButton == false) {
        document.querySelector('.poster-button').style.background = "#282828"
        document.querySelector('.poster-button').style.color = "#7DC2AF"
        document.querySelector('.poster-button').style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.25)"
        document.querySelector('.poster-button').value = "Create a Movie Night List";

      }
    },
    chooseMovieForMovieNight(movie) {
      if(document.querySelector('#'+movie.imdbID+'poster').style.opacity != '0.5') {
        this.movieNightList.push(movie);
        this.$store.commit('setMovieNightList', this.movieNightList);
        document.querySelector('#'+movie.imdbID+'poster').style.opacity = '.5';
        document.querySelector('#'+movie.imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000";
      } else {
        for(var i = this.movieNightList.length; i >= 0; i--) {
          if(this.movieNightList[i] == movie) {
            this.movieNightList.splice(i, 1)
          }
        }
        document.querySelector('#'+movie.imdbID+'poster').style.opacity = '1.0';
        document.querySelector('#'+movie.imdbID+'poster').style.boxShadow = 'none';
      }
    },
    searchChange() {
      this.$store.commit('setSearchResult', this.search);
    },
    filterChange(e) {
      this.filterCriteria = e.target.options[e.target.options.selectedIndex].dataset.foo;
      this.$store.commit('setFilterCriteria', this.filterCriteria)
    },
    movieNightButtonChange() {
      this.$store.commit('setMovieNightButton', this.movieNightButton);
    },
    movieNightListChangeDom() {
      if(this.movieNightButton == true) {
        this.movieNightList.forEach((movie) => {
          if(document.querySelector('#'+movie.imdbID+'poster') != null) {
            document.querySelector('#'+movie.imdbID+'poster').style.opacity = '.5';
            document.querySelector('#'+movie.imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000";
          }
          if(document.querySelector('#'+movie.imdbID) != null) {
            document.querySelector('#'+movie.imdbID).style.opacity = '.5';
            document.querySelector('#'+movie.imdbID).style.boxShadow = "inset 0 0 10px #000000";
          }
        });
      }

    }
  }
}
</script>