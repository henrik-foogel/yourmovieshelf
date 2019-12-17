<template>
    <article class="selected">
      <section class="selected-movie-container">
          <div class="selected-movie-card">
            <section class="poster-title-director-container">
              <div class="poster-container">
                <img v-show="selectedMovie.Poster != 'N/A'" class="selected-movie-img" :src="selectedMovie.Poster" :alt="selectedMovie.Title+' poster'">
                <img v-show="selectedMovie.Poster == 'N/A'" class="selected-movie-img" src="./../assets/images/noposter.png" alt="Movie poster">
              </div>
            <div class="title-director-container">
              <div class="selected-movie-title-div">Title:</div>
              <div class="selected-movie-title"  alt="Title: ">{{ selectedMovie.Title }} (<span alt="Year: ">{{ selectedMovie.Year }}</span>)</div>
              <div class="selected-movie-title-div">Director:</div>
              <div class="selected-movie-director" alt="Director: ">{{ selectedMovie.Director }}</div>
              <div class="selected-movie-title-div">Writers:</div>
              <div class="selected-movie-writers" @click="writersWhole = true" alt="Writers: ">{{ selectedMovie.Writer }}</div>
              <div class="selected-movie-title-div">Actors:</div>
              <div class="selected-movie-actors" alt="Actors: ">{{ selectedMovie.Actors }}</div>
              <div class="selected-movie-title-div">Genre:</div>
              <div class="selected-movie-genre" alt="Genre: ">{{ selectedMovie.Genre }}</div>
              <div class="selected-movie-title-div">Shelf:</div>
              <div class="selected-movie-shelf" v-show="inCollection" alt="Shelf: ">{{ selectedMovie.shelf }}</div>
              <div class="selected-movie-title-div">Plot:</div>
              <div class="selected-movie-plot plot" @click="plotWhole = true" alt="Plot: ">{{ selectedMovie.Plot }}</div>
              <div v-if="plotWhole" class="whole-plot-conatiner">
                <div class="selected-movie-plot-whole" @click="plotWhole = false">{{ selectedMovie.Plot }}</div>
              </div>
              <div v-if="writersWhole" class="whole-writers-conatiner">
                <div class="selected-movie-writers-whole" @click="writersWhole = false">{{ selectedMovie.Writer }}</div>
              </div>
            </div>
            </section>
            
            <div class="selected-movie-more-info" v-if="inCollection && moreInfo == true" alt="More info dropdown">
              <div class="more-container">
              <h4>Composer:</h4>
              <div class="selected-movie-Music" alt="Soundtrack: ">{{ selectedMovie.soundtrack }}</div>
              </div>
              <div class="more-container">
              <h4>Format / Edition:</h4>
              <div class="selected-movie-shelf" alt="Format: ">{{ selectedMovie.format }} / {{ selectedMovie.edition }}</div>              
              </div>
              <div class="more-container">
              <h4>Your Rating:</h4>
              <div class="custom-rating" alt="Your rating: ">{{ selectedMovie.rating }}</div>
              </div>
              <div class="more-container">
              <h4>{{selectedMovie.Ratings[0].Source}}:</h4>
              <div class="custom-rating" alt="Imdb rating: ">{{selectedMovie.Ratings[0].Value}}</div>
              </div>
            </div>
            
            <div class="delete-container" v-show="inCollection">
              <div class="selected-movie-card-back button" @click="moreInfo = false; writersWhole = false; plotWhole = false; setChosen()">BACK</div>
              <div class="more-info-button button" @click="moreInfo = !moreInfo" v-show="inCollection">MORE INFO &#8691;</div>
              <div class="more-info-button button" @click="editOn">EDIT</div>
              <font-awesome-icon icon="trash-alt" class="trash-button button" @click="deleteBox = true">Delete</font-awesome-icon>
            </div>
            <addSelectedMovie :selectedMovie='selectedMovie' v-show="!inCollection"/>
          </div>
      </section>
      <section v-show="deleteBox" class="delete-movie-question-section">
        <div class="delete-container">
          <h5 class="delete-question-title">Are you sure you want to delete this movie?</h5>
          <div class="delete-button-container">
            <div class="delete-button" @click="deleteBox = false">CANCEL</div>
            <div class="delete-button" @click="deleteFromList">YES</div>
          </div>
        </div>
      </section>
  </article>
</template>

<script>
import addSelectedMovie from '@/components/addSelectedMovie.vue'

export default {
    name: 'selected',
    components: {
      addSelectedMovie
    },
    data() {
        return {
        customInput: {
            customSoundtrack: '',
            customShelf: '',
            customRating: '',
            customFormat: '',
            customEdition: '',
        },
        deleteBox: false,
        moreInfo: false,
        ratings: false,
        writersWhole: false,
        plotWhole: false
        }
    },
    computed: {
      selectedMovie() {
        return this.$store.getters.getSelectedMovie;
      },
      inCollection() {
        return this.$store.getters.getInCollection;
      },
      formats() {
        return this.$store.getters.getFormats;
      },
      editions() {
        return this.$store.getters.getEditions;
      }
    },
  methods: {
    setChosen() {
      this.$store.commit('setChosen', false);
      this.$store.commit('setInCollection', false);
    },
    async deleteFromList() {
      await this.$store.dispatch('deleteFromCollection', this.selectedMovie);
      this.deleteBox = false;
      this.$router.go();
    },
    editOn() {
      this.$store.commit('setInCollection', false);
      this.$store.commit('setEditMovie', true);
    }
  },
}
</script>
