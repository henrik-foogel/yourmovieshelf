<template>
    <article class="selected">
      <section class="selected-movie-container">
          <div class="selected-movie-card">
            <section class="poster-title-director-container">
              <img v-show="selectedMovie.Poster != 'N/A'" class="selected-movie-img" :src="selectedMovie.Poster" :alt="selectedMovie.Title+' poster'">
              <img v-show="selectedMovie.Poster == 'N/A'" class="selected-movie-img" src="./../assets/images/noposter.png" alt="Movie poster">
            <div class="title-director-container">
              <div class="selected-movie-title"  alt="Title: ">{{ selectedMovie.Title }} (<span alt="Year: ">{{ selectedMovie.Year }}</span>)</div>
              <div class="selected-movie-director" alt="Director: ">{{ selectedMovie.Director }}</div>
              <div class="selected-movie-writers" alt="Writers: ">( {{ selectedMovie.Writer }} )</div>
              <div class="selected-movie-actors" alt="Actors: ">{{ selectedMovie.Actors }}</div>
              <div class="selected-movie-genre" alt="Genre: ">{{ selectedMovie.Genre }}</div>
              <div class="selected-movie-shelf" v-show="inCollection" alt="Shelf: ">({{ selectedMovie.shelf }})</div>
              <div class="selected-movie-plot plot" alt="Plot: ">{{ selectedMovie.Plot }}</div>
            </div>
            </section>
            
            <div class="selected-movie-more-info" v-if="inCollection && moreInfo == true" alt="More info dropdown">
              <div class="more-container">
              <h4>Music:</h4>
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
              <div class="selected-movie-card-back button" @click="moreInfo = false; setChosen()">BACK</div>
              <div class="more-info-button button" @click="moreInfo = !moreInfo" v-show="inCollection">MORE INFO &#8691;</div>
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
    async deleteFromList() {
      await this.$store.dispatch('deleteFromCollection', this.selectedMovie);
      this.deleteBox = false;
      this.$router.go();
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
    justify-content: center;
    background: rgba(37, 37, 37, 0.7);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    width: 100vw;
    height: 100vh;
    margin: -5rem 0 0;
    padding-bottom: 5rem;

    .selected-movie-card {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 1);
      border-radius: 1rem;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
      width: 31rem;
      max-width: 100vw;
      padding: 1.5rem 0;
      

      .selected-movie-card-back {
        margin-top: 1rem;
        color: #282828 !important;
      }

        .poster-title-director-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 100vw;

          .selected-movie-img {
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.500);
            border-radius: .5rem;
            max-width: 10rem;
            margin-left: .5rem;
          }

          .title-director-container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin: 0 .5rem;
            padding-left: .5rem;
            height: 22rem;
            border-left: 1px solid $main-colour;

            div {
              text-align: left;
              margin: 0 0 .2rem;

                &:nth-child(odd) {
                  color: #fff;
                }
            }

            .selected-movie-title {
              font-size: 1.2rem;
              font-weight: 700;
            }

            .selected-movie-director {
              font-size: 1.1rem;
            }
        
            .selected-movie-writers {
              font-size: .8rem;
            }

            .selected-movie-actors {
              font-weight: 600;
              font-size: .8rem;
            }
            .selected-movie-genre {
              font-size: .8rem;
            }
            .selected-movie-shelf {
              font-weight: 700;
            }
            .selected-movie-plot {
              margin-bottom: .8rem;
              font-weight: 700;
              font-size: .8rem;
            }
          }
  
        }
      div {
        margin: .5rem 3rem .8rem;
        color: $main-colour;

        &.delete-container {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin: 1rem 0 0;

            .trash-button {
              padding-left: .5rem;
              padding-right: .5rem;
              font-size: 1.3rem;
            }
            .button {
              margin: 0 0 .5rem;
              color: #282828;
              font-weight: 700;
              cursor: pointer;
            }
          }

        &.more-info-button {
          margin: .5rem 0;
          color: #282828;
          font-weight: 700;
          cursor: pointer;
          padding: .3rem .5rem;
        }

        &.selected-movie-more-info {
          color: rgb(192, 192, 192);
          display: flex;
          justify-content: center;
          width: 100%;
          border-top: 1px solid $main-colour;
          border-bottom: 1px solid $main-colour;
          margin: 0;
          max-width: 100%;

          .more-container {
            display: flex;
            flex-direction: column;
            margin: 0;
            align-items: center;
            text-align: center;
 
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
            }          
          }
        }

        &.selected-movie-custom-container {
          display: flex;
          margin: 0;
          max-width: 100vw;
          .add-component {
            margin: 0 .5rem;
          }
          input, select {
            padding: .1rem .2rem;
            border-radius: .5rem;
            max-width: 12rem;
            
            option {
              border-radius: .5rem;
              font-size: 1rem;
              font-weight: 700;
            }
          }
          
          h4 {
            color: #fff;
            margin: .2rem 0 .5rem;
            padding: 0;
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