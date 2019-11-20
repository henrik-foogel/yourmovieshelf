<template>
    <article class="selected">
      <section class="selected-movie-container">
          <div class="selected-movie-card">
            <img class="selected-movie-img" :src="selectedMovie.Poster" :alt="selectedMovie.Title+' poster'">
            <div class="selected-movie-title"  alt="Title: ">{{ selectedMovie.Title }} (<span alt="Year: ">{{ selectedMovie.Year }}</span>)</div>
            <div class="selected-movie-director" alt="Director: ">{{ selectedMovie.Director }}</div>
            <div class="selected-movie-writers" alt="Writers: ">( {{ selectedMovie.Writer }} )</div>
            <div class="selected-movie-genre" alt="Genre: ">{{ selectedMovie.Genre }}</div>
            <div class="selected-movie-shelf" v-show="inCollection" alt="Shelf: ">({{ selectedMovie.shelf }})</div>
            <div class="selected-movie-actors" alt="Actors: ">{{ selectedMovie.Actors }}</div>
            <div class="selected-movie-plot plot" alt="Plot: ">{{ selectedMovie.Plot }}</div>
            <div class="more-info-button button" @click="moreInfo = !moreInfo" v-show="inCollection">More Info &#8691;</div>
            <div class="selected-movie-more-info" v-if="inCollection && moreInfo == true" alt="More info dropdown">
              <h4>Music:</h4>
              <div class="selected-movie-Music" alt="Soundtrack: ">{{ selectedMovie.soundtrack }}</div>
              <h4>Format / Edition:</h4>
              <div class="selected-movie-shelf" alt="Format: ">{{ selectedMovie.format }} / {{ selectedMovie.edition }}</div>              
              <h4>Your Rating:</h4>
              <div class="custom-rating" alt="Your rating: ">{{ selectedMovie.rating }}</div>
              <h4>{{selectedMovie.Ratings[0].Source}}:</h4>
              <div class="custom-rating" alt="Imdb rating: ">{{selectedMovie.Ratings[0].Value}}</div>
            </div>
            
            <div class="delete-container" v-show="inCollection">
              <div class="selected-movie-card-back button" @click="setChosen">Back</div>
              <div class="delete-button button" @click="deleteBox = true">Delete</div>
            </div>
            <addSelectedMovie :selectedMovie='selectedMovie' v-show="!inCollection"/>
          </div>
      </section>
      <section v-show="deleteBox" class="delete-movie-question-section">
        <div class="delete-container">
          <h5 class="delete-question-title">Are you sure you want to delete this movie?</h5>
          <div class="delete-button-container">
            <div class="delete-button" @click="deleteBox = false">Cancel</div>
            <div class="delete-button" @click="deleteFromList">Yes</div>
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
        ratings: false
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
    deleteFromList() {
      this.$store.dispatch('deleteFromCollection', this.selectedMovie);
      this.deleteBox = false;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/variables";

  .selected {
  display: flex;
  justify-content: center;

  .selected-movie-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
    margin: 1rem;
    width: 40rem;
    max-width: 100vw;

    .selected-movie-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(0, 0, 0, 0.842);
      border-radius: 1rem;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
      margin: 3rem 4rem;
      min-width: 25rem;

      .selected-movie-card-back {
        margin-top: 1rem;
        color: #282828 !important;
      }

      .selected-movie-img {
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.500);
        border-radius: .5rem;
      }

      div {
        margin: 0 3rem .8rem;
        color: $main-colour;
        text-align: center;
        
        &.selected-movie-title {
          font-size: 2rem;
          margin-top: .5rem;
          margin-bottom: 0;
          font-weight: 700;
          text-align: center;
        }

        &:nth-child(odd) {
          color: #fff;
        }
        
        &.selected-movie-director {
          margin-top: .5rem;
          font-size: 1.3rem;
        }

        &.selected-movie-writers {
          font-size: .8rem;
        }

        &.selected-movie-shelf {
          font-weight: 700;
        }

        &.selected-movie-actors {
          font-weight: 600;
        }
        
        &.selected-movie-plot {
          margin-bottom: 1rem;
          text-align: justify;
          font-weight: 700;
        }

        &.delete-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 0;
            .button {
              color: #8d0000;
              padding-left: .7rem;
              padding-right: .7rem;
              margin: 1rem;
            }
          }

        &.more-info-button {
          margin: .5rem 0;
          color: #282828;
          font-weight: 700;
          cursor: pointer;
        }

        &.selected-movie-more-info {
          color: rgb(192, 192, 192);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;

          div {
            margin: .5rem;
          }
          
          h4 {
            margin: .5rem;
            color: #fff;
          }

          .selected-movie-ratings-button {
            color: $main-colour;
          }

          .selected-movie-ratings {
            background: rgb(44, 44, 44);
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        &.selected-movie-custom-container {
          input, select {
            padding: .5rem .2rem;
            border-radius: .5rem;
            width: 12rem;
            
            option {
              border-radius: .5rem;
              font-size: 1rem;
              font-weight: 700;
            }
          }

          h4 {
            color: #fff;
            margin-bottom: .5rem;
          }
        }
        
      }

      .add-movie-button {
        z-index: 7;
        margin: 1rem;
        color: #282828 !important;
    }
    }
  }
}

.delete-movie-question-section {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  padding: 11rem;
  color: #282828;

  h5 {
    font-size: 1rem;
  }

  .delete-container {
    background: $main-colour;
    padding: 1rem;
    border-radius: .5rem;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .delete-button-container {
      display: flex;
      justify-content: flex-end;

      .delete-button {
        background: #282828;
        color: $main-colour;
        padding: .5rem;
        border-radius: .5rem;
        margin: .5rem;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
        cursor: pointer;
      }
    }
  }
}

</style>