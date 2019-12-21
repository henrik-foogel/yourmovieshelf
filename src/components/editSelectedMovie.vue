<template>
    <article class="edit-movie">
    <h3 v-show="wrongInput">You have to add all the information with *</h3>
      <section class="edit-movie-card">
          <div class="edit-movie-card-section">
              <h4>Title *:</h4>
              <input type="text" class="edit-movie-input" placeholder="title" v-model="eMovie.Title">
              <h4>Year:</h4>
            <select class="edit-movie-input" v-model.number="customInput.customYear">
                <option class="edit-movie-input-option" value selected >{{eMovie.Year}}</option>
                <option class="edit-movie-input-option" v-for="year in getCurrentYear" :key="year">{{ year }}</option>
            </select>
              <h4>Poster Link:</h4>
              <input type="text" class="edit-movie-input" placeholder='poster image link "https://..."' v-model="eMovie.Poster">
              <h4>Director *:</h4>
              <input type="text" class="edit-movie-input" placeholder="director" v-model="eMovie.Director">
              <h4>Writers *:</h4>
              <input type="text" class="edit-movie-input" placeholder="writer, writer, writer..." v-model="eMovie.Writer">
              <h4>Actors *:</h4>
              <input type="text" class="edit-movie-input" placeholder="actor, actor, actor..." v-model="eMovie.Actors">
              <h4>Genre *:</h4>
              <input type="text" class="edit-movie-input" placeholder="genre, genre, genre..." v-model="eMovie.Genre">
              <div class="edit-movie-card-back button" @click="editOnOff">BACK</div>
            </div>
            <div class="edit-movie-card-section">
              <h4>Plot *:</h4>
              <input type="text" class="edit-movie-input" placeholder="plot" v-model="eMovie.Plot">
              <h4>Runtime:</h4>
              <input type="text" class="edit-movie-input" placeholder="ex. 105 min" v-model="eMovie.Runtime">
              <h4>Music composer:</h4>
              <input type="text" class="edit-movie-input" placeholder="composer" v-model="eMovie.soundtrack">
              <h4>Custom shelf:</h4>
              <select type="text" class="edit-movie-input" placeholder="shelf" v-model="customInput.customShelf">
                <option value selected >{{ eMovie.shelf }}</option>
                <option v-for="(shelf, index) in customShelfs" :key="index">{{ shelf }}</option>
              </select>
              <h4>Personal rating:</h4>
              <select class="edit-movie-input" v-model.number="customInput.customRating">
                <option class="edit-movie-input-option" value selected >{{eMovie.rating}}</option>
                <option>-</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
              <div class="add-component">
              <h4>Format:</h4>
              <select class="edit-movie-input" v-model.number="customInput.customFormat">
                <option class="edit-movie-input-option" value selected >{{eMovie.format}}</option>
                <option v-for="format in formats" :key="format">{{ format }}</option>
            </select>
              <h4>Edition:</h4>
              <select class="edit-movie-input" v-model.number="customInput.customEdition">
                <option class="edit-movie-input-option" value selected >{{eMovie.edition}}</option>
                <option v-for="edition in editions" :key="edition">{{ edition }}</option>
            </select>
              </div>
              <div class="add-movie-button button" @click="checkCustomInput(eMovie)">Save</div>
              </div>
      </section>
  </article>
</template>

<script>
export default {
    name: 'edit-movie',
    data() {
        return {
        customInput: {
            customPoster: '',
            customYear: '',
            customShelf: '',
            customRating: '',
            customFormat: '',
            customEdition: ''
        },
        eMovie: [],
        ratings: false,
        wrongInput: false
        }
    },
    computed: {  
      getCurrentYear() {
          const year = new Date().getFullYear()
          return Array.from({length: year - 1900}, (value, index) => 1901 + index)
      }, 
      getUneditedMovie() {
          return this.$store.getters.getUneditedMovie;
      },
      getSelectedMovie() {
          return this.$store.getters.getSelectedMovie;
      },
      formats() {
        return this.$store.getters.getFormats;
      },
      editions() {
        return this.$store.getters.getEditions;
      },
      customShelfs() {
        let shelfs = []
        if (typeof this.$store.getters.getCustomShelfs === 'string' || this.$store.getters.getCustomShelfs instanceof String) {
          shelfs.push(this.$store.getters.getCustomShelfs);
          return shelfs;
        } else {
          return this.$store.getters.getCustomShelfs;
        }     
      },
    },
    watch: {
        getSelectedMovie() {
            this.eMovie = Object.assign({}, this.$store.getters.getSelectedMovie)
        }
    },
    methods: {
        editOnOff() {
            this.$store.commit('setEditMovie', false);
            this.$store.commit('setInCollection', true);
        },
        checkCustomInput(updatedMovie) {
            if(this.customInput.customEdition == '') {
                this.customInput.customEdition = updatedMovie.edition;
            }
            if(this.customInput.customFormat == '') {
                this.customInput.customFormat = updatedMovie.format;
            }
            if(this.customInput.customShelf == '') {
                this.customInput.customShelf = updatedMovie.shelf;
            }
            if(this.customInput.customYear == '') {
                this.customInput.customYear = updatedMovie.Year;
            }
            if(this.customInput.customRating == '') {
                this.customInput.customRating = updatedMovie.rating;
            }
            if(this.customInput.customPoster == '') {
                this.customInput.customPoster = updatedMovie.Poster;
            }
            this.checkInput(updatedMovie);
        },
        checkInput(updatedMovie) {
            if(updatedMovie.Director == '' || updatedMovie.Title == '' || updatedMovie.Actors == '' || updatedMovie.Writer == '' ||
            updatedMovie.Genre == '' || updatedMovie.Plot == '') {
                this.wrongInput = true;
            } else {
                this.checkList(updatedMovie);
            }   
        },
        checkList(updatedMovie) {
            if(updatedMovie.shelf == '') {
                this.customInput.customShelf = 'none'
            } 
            if(updatedMovie.soundtrack == '') {
                updatedMovie.soundtrack = 'none'
            }
            if(updatedMovie.rating == '') {
                this.customInput.customRating = '-'
            }
            if(updatedMovie.format == '') {
                this.customInput.customEdition = 'none'
            }
            if(updatedMovie.edition == '') {
                this.customInput.customEdition = 'none'
            }
            if(this.customInput.customPoster == undefined || this.customInput.customPoster == '' || !this.customInput.customPoster.includes('https://') ) {
                this.customInput.customPoster = 'N/A'
            }
            this.saveEditedMovie(updatedMovie)
        },
        async saveEditedMovie(updatedMovie) { 
            await this.checkInput;
            await this.checkList;
            let newMovie = await {
                    Title: updatedMovie.Title,
                    Director: updatedMovie.Director,
                    Writer: updatedMovie.Writer,
                    Actors: updatedMovie.Actors,
                    Plot: updatedMovie.Plot,
                    shelf: this.customInput.customShelf,
                    soundtrack: updatedMovie.soundtrack,
                    rating: this.customInput.customRating,
                    format: this.customInput.customFormat,
                    edition: this.customInput.customEdition,
                    Genre: updatedMovie.Genre,
                    Ratings: updatedMovie.Ratings,
                    Year: this.customInput.customYear,
                    Runtime: updatedMovie.Runtime,
                    imdbID: updatedMovie.imdbID,
                    Poster: this.customInput.customPoster
                  };
            await this.$store.dispatch('editMovieInCollection', newMovie);
            this.customInput.customPoster = '';
            this.customInput.customYear = '';
            this.customInput.customShelf = '';
            this.customInput.customRating = '';
            this.customInput.customFormat = '';
            this.customInput.customEdition = '';
        },
    }
}
</script>
