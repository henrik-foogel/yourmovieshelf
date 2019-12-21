<template>
  <article class="home-movie">
    <section class="home-not-signed-in" v-if="signedIn == false">
      <div class="home-not-signed-in-container">
        <h2 class="home-not-signed-in-container-header">Page Under Construction</h2>
        <p>-Some things may not work or design is not implemented-</p>
        <h3 class="home-not-signed-in-container-header">Please <span @click="signInBox(true)">REGISTER</span> or <span @click="signInBox(false)">SIGN IN</span></h3>
      </div>
    </section>
    <section class="home-search-section" v-if="signedIn == true">
      <Search class="search" />
    </section>
    <section class="button-container" v-show="!getFirstTimeUser">
      <div v-show="getState == 'row'" v-if="signedIn == true" class="home-movie-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch()" label="View" value="POSTER VIEW"></div>
      <div v-show="getState == 'poster'" v-if="signedIn == true" class="home-movie-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch()" label="View" value="REGULAR VIEW"></div>
    <div class="home-movie-night-button-container">
      <input v-if="signedIn == true" type="button" class="home-movie-night-button button" label="Create a Movie Night List" value="CREATE A MOVIE NIGHT LIST" @click="movieNightButton = !movieNightButton; movieNight(); movieNightButtonChange()">
      <font-awesome-icon icon="times" v-show="movieNightButton" class="fa fa-times" aria-hidden="true" @click="movieNightClose = true; movieNightButtonClose()"></font-awesome-icon>
    </div>
      <input class="home-movie-night-name" v-show="movieNightButton" type="text" v-model="movieNightName" placeholder="Name your movie night list">
      <p v-show="movieNightSaveFail" class="home-movie-night-name-failure" style="color=red">Make sure you've chosen at least one movie and given your list a name
        <br>and that it's name is not already in use</p>
    <section v-if="signedIn == true" class="home-criteria-section">
      <Criteria />
    </section>
    <div v-show="signedIn == true && !movieNightButton"  class="home-movie-random button" @click="randomMovie">Random movie from whole list or from a criteria </div>
    </section>
    <section class="home-movie-section" >
      <Movie
        v-for="(movie, index) in filterCollection"
        :key="index"
        :movie="movie"
        :state="state"
      />
    </section>
    <selected class="selected-movie" v-show="getInCollection"/>
    <editSelectedMovie class="selected-movie" v-show="getEditMovie"/>
    <section v-show="getFirstTimeUser" class="first-time-user-section">
      <img src="../assets/images/Howtouse1.jpg">
      <img src="../assets/images/Howtouse2.jpg">
    </section>
  </article>
</template>

<script>
import Movie from "@/components/movie.vue";
import Search from "@/components/search.vue";
import Criteria from "@/components/searchCriteria.vue";
import selected from '@/components/selected.vue'
import editSelectedMovie from '@/components/editSelectedMovie.vue'
export default {
  name: "home",
  components: {
    Movie,
    Search,
    Criteria,
    selected,
    editSelectedMovie
  },
  data() {
    return {
      state: "",
      search: "",
      filterCriteria: "",
      movieNightButton: false,
      movieNightName: '',
      movieNightSaveFail: false,
      movieNightClose: false,
      firstTimeUser: true
    };
  },
  computed: {
    signedIn() {
      return this.$store.getters.getSignedIn;
    },
    getCollection() {
      return this.$store.getters.getUserCollection;
    },
    getSearchResult() {
      return this.$store.getters.getSearchResult;
    },
    getFilterCriteria() {
      return this.$store.getters.getFilterCriteria;
    },
    filterCollection() {
      if (this.filterCriteria == "shelf") {
        return this.getCollection.filter(movie => {
          return movie.movie.shelf.toLowerCase() === this.search.toLowerCase();
        });
      } else if (this.filterCriteria == "format") {
        return this.getCollection.filter(movie => {
          return movie.movie.format.toLowerCase() === this.search.toLowerCase();
        });
      } else if (this.filterCriteria == "edition") {
        return this.getCollection.filter(movie => {
          return (
            movie.movie.edition.toLowerCase() === this.search.toLowerCase()
          );
        });
      } else if (this.filterCriteria.toLowerCase == "all") {
        return this.getCollection;
      }
      return this.getCollection.filter(movie => {
        return (
          movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.Director.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          movie.movie.Actors.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.soundtrack
            .toLowerCase()
            .includes(this.search.toLowerCase()
          ) ||
          String(movie.movie.Year).includes(this.search)
        );
      });
    },
    getState() {
      return this.$store.getters.getStateFlex;
    },
    getMovieNightButton() {
      return this.movieNightButton;
    },
    getInCollection() {
      return this.$store.getters.getInCollection;
    },
    getFirstTimeUser() {
      return this.$store.getters.getFirstTimeUser;
    },
    getEditMovie() {
      return this.$store.getters.getEditMovie;
    }
  },
  watch: {
    getSearchResult() {
      this.search = this.$store.getters.getSearchResult;
    },
    getFilterCriteria() {
      this.filterCriteria = this.$store.getters.getFilterCriteria;
    },
    getState() {
      if(this.getState == 'row') {
        document.querySelector('.home-movie-section').style.flexDirection = 'column'
      } else {
        document.querySelector('.home-movie-section').style.flexDirection = 'row'
      }
    },
    getMovieNightButton() {
      this.MovieNightButton = this.$store.getters.getMovieNightButton;
    },
  },
  methods: {
    signInBox(register) {
      if(register == true) {
        this.$store.commit('setRegisterBox', true);
        this.$store.commit('setSignInBox', true);
        } else if(register == false) {
        this.$store.commit('setSignInBox', true);
        this.$store.commit('setRegisterBox', false);
      }
    },
    viewSwitch() {
        this.$store.commit('setSearchResult', this.search);
        if(this.state == 'row') {
            this.state = 'poster';
            document.querySelector('.home-poster-view-button').value = 'Regular View'
            document.querySelector('.home-movie-section').style.flexDirection = 'column'
        } else {
            this.state = 'row'
            document.querySelector('.home-poster-view-button').value = 'Poster View'
            document.querySelector('.home-movie-section').style.flexDirection = 'row'
        }
        this.$store.commit('setStateFlex', this.state)
    },
    async movieNight() {
      if(this.movieNightButton == true) {
        document.querySelector('.home-movie-night-button').style.background = "#7DC2AF"
        document.querySelector('.home-movie-night-button').style.color = "#282828"
        document.querySelector('.home-movie-night-button').style.boxShadow = "inset 0 0 10px #000000"
        document.querySelector('.home-movie-night-button').value = "SAVE";
      } else if(this.movieNightButton == false) {
        for (let i = 0; i < this.$store.getters.getMovieNightListFromDB.length; i++) {
          if(this.$store.getters.getMovieNightListFromDB[i].name == this.movieNightName) {
            this.movieNightSaveFail = true;
            this.movieNightButton = true;
            return
          }    
        }
        if(this.$store.getters.getMovieNightList[0] != null && this.movieNightName != '') {
            document.querySelector('.home-movie-night-button').style.background = "#282828"
            document.querySelector('.home-movie-night-button').style.color = "#7DC2AF"
            document.querySelector('.home-movie-night-button').style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.25)"
            document.querySelector('.home-movie-night-button').value = "Create a Movie Night List";
            let payload = [];
            payload.push({
              list: this.$store.getters.getMovieNightList,
              name: this.movieNightName
            });
            this.movieNightSaveFail = false;
            await this.$store.dispatch('addMovieNightList', payload[0]);
            payload = [];
            this.$store.commit('setMovieNightList', []);
            this.movieNightName = ''
        } else if(this.movieNightClose == true) {
          document.querySelector('.home-movie-night-button').style.background = "#282828"
          document.querySelector('.home-movie-night-button').style.color = "#7DC2AF"
          document.querySelector('.home-movie-night-button').style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.25)"
          document.querySelector('.home-movie-night-button').value = "Create a Movie Night List";
          this.movieNightSaveFail = false;
          this.movieNightClose = false;
        } else {
          this.movieNightSaveFail = true;
          this.movieNightButton = true;
        }
      }
    },
    movieNightButtonChange() {
      this.$store.commit('setMovieNightButton', this.movieNightButton);
    },
    movieNightButtonClose() {
      this.movieNightButton = false;
      this.$store.commit('setMovieNightButton',   false);
      this.movieNight();
    },
    async randomMovie() {
      let random = Math.floor(Math.random() * this.filterCollection.length);
      let movie = this.filterCollection[random];
      await this.$store.commit('setSelectedMovie', movie.movie);
      this.$store.commit('setInCollection', true);
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.state = this.$store.getters.getStateFlex;
    if(this.state == 'row') {
      document.querySelector('.home-movie-section').style.flexDirection = 'column';
      } else {
      document.querySelector('.home-movie-section').style.flexDirection = 'row';
    }
  }
};
</script>