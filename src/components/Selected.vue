<template>
    <article class="selected">
      <section class="selected-movie-container">
          <div class="selected-movie-card">
          <div class="selected-movie-card-back button" @click="setChosen">Back</div>
            <img class="selected-movie-img" :src="selectedMovie.Poster" :alt="selectedMovie.Title+' poster'">
            <div class="selected-movie-title"  alt="Title: ">{{ selectedMovie.Title }} (<span alt="Year: ">{{ selectedMovie.Year }}</span>)</div>
            <div class="selected-movie-director" alt="Director: ">{{ selectedMovie.Director }}</div>
            <div class="selected-movie-writers" alt="Writers: ">( {{ selectedMovie.Writer }} )</div>
            <div class="selected-movie-genre" alt="Genre: ">{{ selectedMovie.Genre }}</div>
            <div class="selected-movie-shelf" v-show="inCollection" alt="Shelf: ">({{ selectedMovie.shelf }})</div>
            <div class="selected-movie-actors" alt="Actors: ">{{ selectedMovie.Actors }}</div>
            <div class="selected-movie-plot plot" alt="Plot: ">{{ selectedMovie.Plot }}</div>
            <div class="more-info-button" @click="moreInfo = !moreInfo" v-show="inCollection">More Info &#8691;</div>
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
            <addSelectedMovie :selectedMovie='selectedMovie' v-show="!inCollection"/>
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
            customEdition: ''
        },
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
    max-width: 40rem;

    .selected-movie-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(0, 0, 0, 0.842);
      border-radius: 1rem;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
      margin: 3rem 4rem;
      padding-bottom: 2rem;

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

        &.more-info-button {
          color: #fff;
          cursor: pointer;
        }

        &.more-info-button {
          color: $main-colour;
          font-weight: 700;
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
</style>