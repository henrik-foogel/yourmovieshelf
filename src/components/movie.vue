<template>
  <article :class="movie">
    <section class="row" v-show="state=='row'" :id="movie.movie.imdbID" @click="selectMovie(movie.movie)">
      <figure>
        <div class="home-collection-movie-poster">
          <img :src="movie.movie.Poster" :alt="movie.movie.Title+' poster'" />
        </div>
      </figure>
      <aside>
        <div class="home-collection-movie-text">
          <h4 :alt="'Movie title: '+movie.movie.Title">
            {{ movie.movie.Title }} (<span :alt="'year: '+movie.Year">{{movie.movie.Year}}</span>)
          </h4>
          <p :alt="'What genre: '+movie.movie.Genre+' and on what shelf: '+movie.movie.shelf">
            {{movie.movie.Genre}} (<span>{{ movie.movie.shelf }}</span>)
          </p>
          <h5 :alt="'Director: '+movie.movie.Director">{{ movie.movie.Director }}</h5>
          <p :alt="'Actors: '+movie.movie.Actors">{{ movie.movie.Actors }}</p>
        </div>
      </aside>
    </section>
    <section class="poster" v-show="state=='poster'" @click="selectMovie(movie.movie)">
      <figure>
        <img :src="movie.movie.Poster" :id="movie.movie.imdbID+'poster'" :alt="movie.movie.Title + ' poster'" />
      </figure>
    </section>
  </article>
</template>

<script>
export default {
  name: "movie",
  props: ["movie", "state"],
  data() {
    return {
      movieNightList: [],
      list: []
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
    }
  },
  watch: {
    getMovieNightListChange() {
        this.$store.commit('setMovieNightListPush', this.movieNightList);
    },
    getMovieNightList() {
        this.list = this.$store.getters.getMovieNightList;
    },
    getSearchResult() {
        this.list.forEach(m => {
                if(document.querySelector('#'+m[0].imdbID) != null || document.querySelector('#'+m[0].imdbID+'poster') != null) {
                    document.querySelector('#'+m[0].imdbID).style.opacity = '.5'
                    document.querySelector('#'+m[0].imdbID).style.boxShadow = "inset 0 0 10px #000000"
                    document.querySelector('#'+m[0].imdbID+'poster').style.opacity = '.5'
                    document.querySelector('#'+m[0].imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000"
                }
        });
    },
    getMovieNightButton() {
        if(this.$store.getters.getMovieNightButton == false) {
            this.list.forEach(m => {
                document.querySelector('#'+m[0].imdbID).style.opacity = '1.0'
                document.querySelector('#'+m[0].imdbID).style.boxShadow = 'none'
                document.querySelector('#'+m[0].imdbID+'poster').style.opacity = '1.0'
                document.querySelector('#'+m[0].imdbID+'poster').style.boxShadow = 'none'
            });
            this.list = []
            this.$store.commit('setMovieNightList', this.list);
        }
    }
  },
  methods: {
    async selectMovie(movie) {
        if(this.getMovieNightButton == false) {
            this.$store.commit('setInCollection', true);
            await this.$store.commit('setSelectedMovie', movie);
            this.$router.push('/selected');
        } 
        if(this.getMovieNightButton == true) {
            if(document.querySelector('#'+movie.imdbID).style.opacity != '0.5' || document.querySelector('#'+movie.imdbID+'poster').style.opacity != '0.5') {
            this.movieNightList.push(movie);
            document.querySelector('#'+movie.imdbID).style.opacity = '.5'
            document.querySelector('#'+movie.imdbID).style.boxShadow = "inset 0 0 10px #000000"
            document.querySelector('#'+movie.imdbID+'poster').style.opacity = '.5'
            document.querySelector('#'+movie.imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000"
        } else {
            
            this.list.forEach((m, index) => {
                if(m[0] == movie) {
                    this.list.splice(index)
                    this.$store.commit('setMovieNightList', this.list);
                }
            });
        document.querySelector('#'+movie.imdbID).style.opacity = '1.0'
        document.querySelector('#'+movie.imdbID).style.boxShadow = 'none'
        document.querySelector('#'+movie.imdbID+'poster').style.opacity = '1.0'
        document.querySelector('#'+movie.imdbID+'poster').style.boxShadow = 'none'
      }
        }
    },
  }
};
</script>
<style lang="scss">
.movie {
  max-width: 35rem !important;
  min-width: 15rem !important;
  border-bottom: none;
  margin: 0 -1.5rem;

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    background: #fff;
    border: 1px solid #000;
    
    figure {
        margin: 1rem 1.5rem;

        .home-collection-movie-poster {
            img {
                max-width: 5rem;
      }
    }
    }
    aside {
      display: flex;
      flex-direction: row;
      border-radius: 0;
      margin: 0;
      padding: 0.5rem 0.5rem 0.5rem 0;
      align-items: flex-start;
      max-width: 50rem;
      min-width: 10rem;
      cursor: pointer;

      .home-collection-movie-text {
        display: flex;
        flex-direction: column;

        h4,
        h5 {
          margin: 0.2rem 0;
          padding: 0;
          text-align: left;
        }

        p {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          text-align: left;

          span {
            font-weight: 700;
          }
        }

        h5 {
          font-size: 1rem;
        }

        h4 {
          font-size: 1.2rem;
        }
      }
    }
  }

  .poster {
    justify-content: space-evenly;

    figure {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 9rem;
        position: relative;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
        border-radius: 0.5rem;
        cursor: pointer;
      }
    }
  }
}
</style>