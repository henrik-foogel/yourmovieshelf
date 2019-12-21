<template>
    <article class="manually-add">
    <h3 v-show="wrongInput">You have to add all the information with *</h3>
      <section class="manually-add-card">
          <div class="manually-add-card-section">
              <h4>Title: *</h4>
              <input type="text" class="add-manually-input" placeholder="title" v-model="customInput.customTitle">
              <h4>Year: *</h4>
            <select class="add-manually-input" v-model.number="customInput.customYear">
                <option class="add-manually-input-option" value selected>Year</option>
                <option class="add-manually-input-option" v-for="year in getCurrentYear" :key="year">{{ year }}</option>
            </select>
              <h4>Poster Link:</h4>
              <input type="text" class="add-manually-input" placeholder='poster image link "https://..."' v-model="customInput.customPoster">
              <h4>Director: *</h4>
              <input type="text" class="add-manually-input" placeholder="director, director..." v-model="customInput.customDirector">
              <h4>Writers: *</h4>
              <input type="text" class="add-manually-input" placeholder="writer, writer, writer..." v-model="customInput.customWriter">
              <h4>Actors: *</h4>
              <input type="text" class="add-manually-input" placeholder="actor, actor, actor..." v-model="customInput.customActors">
              <h4>Genre: *</h4>
              <input type="text" class="add-manually-input" placeholder="genre, genre, genre..." v-model="customInput.customGenre">
              <div class="add-manually-card-back button" @click="manuallyAddOnOff">BACK</div>
            </div>
            <div class="manually-add-card-section">
              <h4>Plot: *</h4>
              <input type="text" class="add-manually-input" placeholder="plot" v-model="customInput.customPlot">
              <h4>Runtime:</h4>
              <input type="text" class="add-manually-input" placeholder="ex. 105 min" v-model="customInput.customRuntime">
              <h4>Music composer:</h4>
              <input type="text" class="add-manually-input" placeholder="composer, composer..." v-model="customInput.customSoundtrack">
              <h4>Custom shelf:</h4>
              <select type="text" class="add-manually-input" placeholder="shelf" v-model="customInput.customShelf">
                <option v-for="shelf in customShelfs" :key="shelf" >{{ shelf }}</option>
              </select>
              <h4>Personal rating:</h4>
              <select class="add-manually-input" v-model.number="customInput.customRating">
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
              <select class="add-manually-input" v-model.number="customInput.customFormat">
                <option v-for="format in formats" :key="format">{{ format }}</option>
            </select>
              <h4>Edition:</h4>
              <select class="add-manually-input" v-model.number="customInput.customEdition">
                <option v-for="edition in editions" :key="edition">{{ edition }}</option>
            </select>
              </div>
              <div class="add-movie-button button" @click="addToCollection(false)">ADD</div>
              </div>
      </section>
  </article>
</template>

<script>
export default {
    name: 'manually-add',
    data() {
        return {
        customInput: {
            customPoster: '',
            customTitle: '',
            customYear: '',
            customDirector: '',
            customActors: '',
            customWriter: '',
            customGenre: '',
            customPlot: '',
            customRuntime: '',
            customSoundtrack: '',
            customShelf: '',
            customRating: '',
            customFormat: '',
            customEdition: ''
        },
        ratings: false,
        wrongInput: false
        }
    },
    computed: {  
        getCurrentYear() {
            const year = new Date().getFullYear()
            return Array.from({length: year - 1900}, (value, index) => 1901 + index)
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
    methods: {
        manuallyAddOnOff() {
            this.wrongInput = false;
            this.$store.commit('setManuallyAdd', false);
        },
        checkList() {
            if(this.customInput.customShelf == '') {
                this.customInput.customShelf = 'none'
            } 
            if(this.customInput.customSoundtrack == undefined || this.customInput.customSoundtrack == '') {
                this.customInput.customSoundtrack = 'none'
            }
            if(this.customInput.customRating == undefined || this.customInput.customRating == '') {
                this.customInput.customRating = '-'
            }
            if(this.customInput.customFormat == undefined || this.customInput.customFormat == '') {
                this.customInput.customFormat = 'none'
            }
            if(this.customInput.customEdition == undefined || this.customInput.customEdition == '') {
                this.customInput.customEdition = 'none'
            }
            if(this.customInput.customRuntime == undefined || this.customInput.customRuntime == '') {
                this.customInput.customRuntime = 'none'
            } if(this.customInput.customPoster == undefined || this.customInput.customPoster == '' || !this.customInput.customPoster.includes('https://') ) {
                this.customInput.customPoster = 'N/A'
            }
        },

        checkInput() {
            if(this.customInput.customDirector == '' || this.customInput.customTitle == '' ||
            this.customInput.customYear == '' || this.customInput.customActors == '' || this.customInput.customWriter == '' ||
            this.customInput.customGenre == '' || this.customInput.customPlot == '') {
                this.wrongInput = true;
            } else {
                this.wrongInput = false;
            }   
        },
        async addToCollection(id) {
            await this.checkInput();
            await this.checkList();

            if(this.wrongInput == false) {
                let payload = {
                    id: id,
                    poster: this.customInput.customPoster,
                    director: this.customInput.customDirector,
                    title: this.customInput.customTitle,
                    year: this.customInput.customYear,
                    actors: this.customInput.customActors,
                    writer: this.customInput.customWriter,
                    genre: this.customInput.customGenre,
                    plot: this.customInput.customPlot,
                    shelf: this.customInput.customShelf,
                    soundtrack: this.customInput.customSoundtrack,
                    rating: this.customInput.customRating,
                    format: this.customInput.customFormat,
                    edition: this.customInput.customEdition,
                    runtime: this.customInput.customRuntime,
                    imdbID: 'none',
                    ratings: 'none'
                }
                await this.$store.dispatch('addToCollection', payload);
                this.$store.commit('setFirstTimeUser', false);
                this.$store.commit('setManuallyAdd', false);
                this.$router.go();
            }
        },
    }
}
</script>