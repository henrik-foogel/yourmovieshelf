<template>
  <article class="home-movie">
    <section class="home-not-signed-in" v-if="signedIn == false">
      <div class="home-not-signed-in-container">
        <h2 class="home-not-signed-in-container-header">Page Under Construction</h2>
        <p>-Some things may not work or design is not implemented-</p>
        <h3 class="home-not-signed-in-container-header">Please register or sign in</h3>
      </div>
    </section>
    <section class="home-search-section" v-if="signedIn == true">
      <Search />
    </section>
    <section class="button-container" v-show="!getInCollection">
      <div v-show="getState == 'row'" v-if="signedIn == true" class="home-movie-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch()" label="View" value="Poster View"></div>
      <div v-show="getState == 'poster'" v-if="signedIn == true" class="home-movie-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch()" label="View" value="Regular View"></div>
    <h1 v-if="signedIn == true">Your Collection:</h1>
    <div class="home-movie-night-button-container">
      <input v-if="signedIn == true" type="button" class="home-movie-night-button button" label="Create a Movie Night List" value="Create a Movie Night List" @click="movieNightButton = !movieNightButton; movieNight(); movieNightButtonChange()">
      <i v-show="movieNightButton" class="fa fa-times" aria-hidden="true" @click="movieNightClose = true; movieNightButtonClose()"></i>
    </div>
      <input class="home-movie-night-name" v-show="movieNightButton" type="text" placeholder="Name your movie night list" v-model="movieNightName">
      <p v-show="movieNightSaveFail" class="home-movie-night-name-failure" style="color=red">Make sure you've chosen at least one movie and given your list a name</p>
    <section v-if="signedIn == true" class="home-criteria-section">
      <Criteria />
    </section>
    <div v-show="signedIn == true && !movieNightButton"  class="home-movie-random button" @click="randomMovie">Random movie from whole list or from a criteria </div>
    </section>
    <section class="home-movie-section" v-show="!getInCollection">
      <movie
        v-for="(movie, index) in filterCollection"
        :key="index"
        :movie="movie"
        :state="state"
      />
    </section>
    <Selected v-show="getInCollection"/>
  </article>
</template>

<script>
import Movie from "@/components/movie.vue";
import Search from "@/components/search.vue";
import Criteria from "@/components/searchCriteria.vue";
import Selected from '@/components/selected.vue'
export default {
  name: "home",
  components: {
    Movie,
    Search,
    Criteria,
    Selected
  },
  data() {
    return {
      state: "",
      search: "",
      filterCriteria: "",
      movieNightButton: false,
      movieNightName: '',
      movieNightSaveFail: false,
      movieNightClose: false
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
            .includes(this.search.toLowerCase())
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
    }
  },
  methods: {
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
    movieNight() {
      if(this.movieNightButton == true) {
        document.querySelector('.home-movie-night-button').style.background = "#7DC2AF"
        document.querySelector('.home-movie-night-button').style.color = "#282828"
        document.querySelector('.home-movie-night-button').style.boxShadow = "inset 0 0 10px #000000"
        document.querySelector('.home-movie-night-button').value = "Save";
      } else if(this.movieNightButton == false) {
        if(!Array.isArray(this.$store.getters.getMovieNightList) || this.movieNightName != '') {
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
          this.$store.dispatch('addMovieNightList', payload[0]);
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
    this.state = this.$store.getters.getStateFlex;
    if(this.state == 'row') {
      document.querySelector('.home-movie-section').style.flexDirection = 'column';
      } else {
      document.querySelector('.home-movie-section').style.flexDirection = 'row';
    }
  }
};
</script>
<style lang="scss">
.home-movie-night-name-failure {
  color: rgb(134, 1, 1);
  font-weight: 700;
}
</style>