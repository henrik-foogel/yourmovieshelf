<template>
  <article class="home-movie">
    <section class="home-search-section">
      <Search />
    </section>
      <div class="home-movie-view-check"><p></p><input type="button" class="home-poster-view-button button" @click="viewSwitch()" label="View" value="Poster View"></div>
    <h1>Your Collection:</h1>
    <input type="button" class="home-movie-night-button button" label="Create a Movie Night List" value="Create a Movie Night List" @click="movieNightButton = !movieNightButton; movieNight(); movieNightButtonChange()">
    <section class="home-criteria-section">
      <Criteria />
    </section>
    <section class="home-movie-section">
      <movie
        v-for="movie in filterCollection"
        :key="movie.movie.imdbID"
        :movie="movie"
        :state="state"
      />
    </section>
  </article>
</template>

<script>
import Movie from "@/components/movie.vue";
import Search from "@/components/search.vue";
import Criteria from "@/components/searchCriteria.vue";
export default {
  name: "home",
  components: {
    Movie,
    Search,
    Criteria
  },
  data() {
    return {
      state: "",
      search: "",
      filterCriteria: "",
      movieNightButton: false,
    };
  },
  computed: {
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
        document.querySelector('.home-movie-night-button').style.background = "#282828"
        document.querySelector('.home-movie-night-button').style.color = "#7DC2AF"
        document.querySelector('.home-movie-night-button').style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.25)"
        document.querySelector('.home-movie-night-button').value = "Create a Movie Night List";
      }
    },
    movieNightButtonChange() {
      this.$store.commit('setMovieNightButton', this.movieNightButton);
    }
  },
  mounted() {
    this.state = this.$store.getters.getStateFlex;

    if(this.state == 'row') {
      document.querySelector('.home-movie-section').style.flexDirection = 'column'
      } else {
      document.querySelector('.home-movie-section').style.flexDirection = 'row'
    }
  }
};
</script>
<style lang="scss">
 @import "../scss/variables";
.home-movie {
    padding: 0;
    margin: 0;

  .home-movie-view-check {
        display: flex;
        align-items: center;

        .home-poster-view-button, .home-movie-night-button {
          border: none;
          background: #282828;
          color: $main-colour;
        }
      }
      .home-movie-night-button {
          border: none;
          background: #282828;
          color: $main-colour;
        }

  h1 {
    font-weight: 800;
    color: rgb(56, 56, 56);
    margin: .5rem 0 1.5rem;
  }

  .home-movie-section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>