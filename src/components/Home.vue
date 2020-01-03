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
      <input v-if="signedIn == true" v-show="!movieNightButton" type="button" class="home-movie-night-button button" label="Create a Movie Night List" value="CREATE A MOVIE NIGHT LIST" @click="movieNightButton = !movieNightButton; movieNightButtonChange()">
        <div class="home-movie-night-list-list" v-show="movieNightButton">
        <div class="movie-night-save-back-container" v-show="movieNightButton">
          <input class="home-movie-night-name" type="text" v-model="movieNightName" placeholder="Name your movie night list">
          <font-awesome-icon icon="save" class="fa fa-times" aria-hidden="true" @click="movieNight(); movieNightButtonChange()"></font-awesome-icon>
          <font-awesome-icon icon="times" class="fa fa-times" aria-hidden="true" @click="movieNightClose = true; movieNightButtonClose()"></font-awesome-icon>
        </div>
          <h4 @click="movieNightListOpen = !movieNightListOpen">Chosen movies ({{getMovieNightList.length}}): &#8691;</h4>
          <div v-show="movieNightListOpen" class="home-movie-night-list-movies" v-for="(movie, index) in getMovieNightList" :key="index">
           <img :src="movie.Poster" alt=""> {{movie.Title}}
          <font-awesome-icon icon="times" class="movie-night-list-movie-remove" aria-hidden="true" @click="removeFromMovieNightList(movie)"/>
          </div>
        </div>
    </div>
      <p v-show="movieNightSaveFail" @click="movieNightSaveFail = false" class="home-movie-night-name-failure" style="color=red">Make sure you've chosen at least one movie and given your list a name
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
        :index="index"
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
      firstTimeUser: true,
      movieNightListOpen: true,
      criteriaForSearch: ''
    };
  },
  computed: {
    signedIn() {
      return this.$store.getters.getSignedIn;
    },
    getCollection() {
      return this.$store.getters.getUserCollection;
    },
    getCollectionFilteredByShelf() {
      return this.$store.getters.getUserCollection.filter(movie => {
          return movie.movie.shelf.toLowerCase() === this.criteriaForSearch.toLowerCase();
        });
    },
    getCollectionFilteredByFormat() {
      return this.$store.getters.getUserCollection.filter(movie => {
          return movie.movie.format.toLowerCase() === this.criteriaForSearch.toLowerCase();
        });
    },
    getCollectionFilteredByEdition() {
      return this.$store.getters.getUserCollection.filter(movie => {
          return movie.movie.edition.toLowerCase() === this.criteriaForSearch.toLowerCase();
        });
    },
    getSearchResult() {
      return this.$store.getters.getSearchResult;
    },
    getFilterCriteria() {
      return this.$store.getters.getFilterCriteria;
    },
    getCriteriaForSearch() {
      return this.$store.getters.getCriteriaForSearch;
    },
    filterCollection() {
      if (this.filterCriteria == "shelf") {
        return this.getCollectionFilteredByShelf.filter(movie => {
          return movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.Director.toLowerCase().includes(
            this.search.toLowerCase()
          )  ||
          movie.movie.Actors.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.soundtrack
            .toLowerCase()
            .includes(this.search.toLowerCase()
          ) ||
          String(movie.movie.Year).includes(this.search) ||
          movie.movie.Plot.toLowerCase().includes(
            this.search.toLowerCase()
          )
        });
      } else if (this.filterCriteria == "format") {
        return this.getCollectionFilteredByFormat.filter(movie => {
          return movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.Director.toLowerCase().includes(
            this.search.toLowerCase()
          )  ||
          movie.movie.Actors.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.soundtrack
            .toLowerCase()
            .includes(this.search.toLowerCase()
          ) ||
          String(movie.movie.Year).includes(this.search) ||
          movie.movie.Plot.toLowerCase().includes(
            this.search.toLowerCase()
          )
        });
      } else if (this.filterCriteria == "edition") {
        return this.getCollectionFilteredByEdition.filter(movie => {
          return movie.movie.Title.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.Director.toLowerCase().includes(
            this.search.toLowerCase()
          )  ||
          movie.movie.Actors.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          movie.movie.Genre.toLowerCase().includes(this.search.toLowerCase()) ||
          movie.movie.soundtrack
            .toLowerCase()
            .includes(this.search.toLowerCase()
          ) ||
          String(movie.movie.Year).includes(this.search) ||
          movie.movie.Plot.toLowerCase().includes(
            this.search.toLowerCase()
          )
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
          String(movie.movie.Year).includes(this.search) ||
          movie.movie.Plot.toLowerCase().includes(
            this.search.toLowerCase()
          )
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
    },
    getMovieNightList() {
      return this.$store.getters.getMovieNightList;
    }
  },
  watch: {
    filterCollection() {
      this.$store.commit('setFilteredCollection', this.filterCollection);
      this.$store.commit('setFilterChange', !this.$store.getters.getFilterChange);
    },
    getSearchResult() {
      this.search = this.$store.getters.getSearchResult;
    },
    getCriteriaForSearch() {
      this.criteriaForSearch = this.$store.getters.getCriteriaForSearch;
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
      this.movieNightButton = this.$store.getters.getMovieNightButton;
      if(!this.$store.getters.getMovieNightButton) {
        this.movieNightSaveFail = false
      }
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
        for (let i = 0; i < this.$store.getters.getMovieNightListFromDB.length; i++) {
          if(this.$store.getters.getMovieNightListFromDB[i].name == this.movieNightName) {
            this.movieNightSaveFail = true;
            this.movieNightButton = true;
            return
          }   
        if(this.$store.getters.getMovieNightList[0] != null && this.movieNightName != '') {
            let payload = [];
            payload.push({
              list: this.$store.getters.getMovieNightList,
              name: this.movieNightName
            });
            await this.$store.dispatch('addMovieNightList', payload[0]);
            payload = [];
            this.$store.commit('setMovieNightList', []);
            this.movieNightName = ''
            this.movieNightClose = true;
            this.movieNightButton = false;
            this.movieNightSaveFail = false;
            this.$store.commit('setMovieNightButton', false);
        } else if(this.movieNightClose == true) {
          this.movieNightSaveFail = false;
          this.movieNightClose = false;
        } else {
          this.movieNightSaveFail = true;
        }
      }
    },
    movieNightButtonChange() {
      this.$store.commit('setMovieNightButton', this.movieNightButton);
    },
    movieNightButtonClose() {
      this.movieNightButton = false;
      this.$store.commit('setMovieNightButton', false);
      this.$store.commit('setMovieNightList', []);
      this.movieNight();
    },
    async removeFromMovieNightList(movie) {
        this.$store.dispatch('movieNightRemoveFromList', movie);
    },
    async randomMovie() {
      let random = Math.floor(Math.random() * this.filterCollection.length);
      let movie = this.filterCollection[random];
      await this.$store.commit('setSelectedMovie', movie.movie);
      this.$store.commit('setInCollection', true);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.movieNightButton = false;
    this.state = this.$store.getters.getStateFlex;
    if(this.state == 'row') {
      document.querySelector('.home-movie-section').style.flexDirection = 'column';
      } else {
      document.querySelector('.home-movie-section').style.flexDirection = 'row';
    }
  }
};
</script>