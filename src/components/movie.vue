<template>
  <article :class="movie">
    <section class="row" v-show="state=='row'" :id="movie.movie.imdbID" @click="selectMovie(movie.movie)">
      <figure :ref="'figure'+movie.movie.imdbID" class="figure">
        <div class="home-collection-movie-poster">
          <img v-if="movie.movie.Poster != 'N/A'" :src="movie.movie.Poster" :alt="movie.movie.Title+' poster'" />
          <img v-else src="../assets/images/noposter.png" :alt="movie.movie.Title+' poster'" />
        </div>
      </figure>
      <aside :ref="'aside'+movie.movie.imdbID" class="aside">
        <div class="home-collection-movie-text">
          <h4 :alt="'Movie title: '+movie.movie.Title">
            {{ movie.movie.Title }} (<span :alt="'year: '+movie.Year">{{movie.movie.Year}}</span>)
          </h4>
          <p :alt="'What genre: '+movie.movie.Genre+' and on what shelf: '+movie.movie.shelf">
            {{movie.movie.Genre}} (<span>{{ movie.movie.shelf }}</span>)
          </p>
          <h5 :alt="'Director: '+movie.movie.Director">{{ movie.movie.Director }}</h5>
          <p class="home-collection-movie-text-actors" :alt="'Actors: '+movie.movie.Actors">{{ movie.movie.Actors }}</p>
          <p class="home-collection-movie-text-plot" :alt="'Plot: '+movie.movie.Plot">{{ movie.movie.Plot }}</p>
        </div>
      </aside>
    </section>
    <section class="poster" v-show="state=='poster'" @click="selectMovie(movie.movie)">
      <figure>
        <img v-if="movie.movie.Poster != 'N/A'" :src="movie.movie.Poster" :id="movie.movie+'poster'" :alt="movie.movie.Title + ' poster'" />
        <img v-else src="../assets/images/noposter.png" :alt="movie.movie.Title+' poster'" />
      </figure>
    </section>
  </article>
</template>

<script>
export default {
  name: "movie",
  props: ["movie", "state", "index"],
  data() {
    return {
      movieNightList: [],
      list: [],
      inList: false,
    };
  },
  computed: {
    getPosterViewTrueFalse() {
      return this.$store.getters.getPosterViewTrueFalse;
    },
    getStateFlex() {
        return this.$store.getters.getStateFlex;
    },
    getCollection() {
      return this.$store.getters.getUserCollection;
    },
    getMovieNightButton() {
        return this.$store.getters.getMovieNightButton;
    },
    getMovieNightListChange() {
        return this.movieNightList;
    },
    getMovieNightList() {
        return this.$store.getters.getMovieNightList;
    },
    getSearchResult() {
        return this.$store.getters.getSearchResult;
    },
    getFilterChange() {
      return this.$store.getters.getFilterChange
    },
  },
  methods: {
    async selectMovie(movie) {
        if(this.getMovieNightButton == false) {
          await this.$store.commit('setSelectedMovie', movie);
          this.$store.commit('setInCollection', true);
        } else if (this.getMovieNightButton == true) {
          await this.$store.getters.getMovieNightList.forEach(m => {
            if(m == movie) {
              this.inList = true
            }
          });
          if(this.inList == false) {
            await this.$store.commit('setMovieNightListPush', movie);
          } else {
            this.inList = false;
          }
        }
    },
  }
};
</script>