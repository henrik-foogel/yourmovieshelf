<template>
  <section>
    <div class="selected-movie-custom-container">
              <div class="add-component">
              <h4>Composer:</h4>
              <input type="text" class="selected-movie-custom-soundtrack" placeholder="Composer" v-model="customInput.customSoundtrack">
              <h4>Custom shelf:</h4>
              <select type="text" class="selected-movie-custom-shelf" placeholder="Shelf" v-model="customInput.customShelf">
                <option v-for="shelf in customShelfs" :key="shelf" >{{ shelf }}</option>
              </select>
              <h4>Personal rating:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customRating">
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
              </div>
              <div class="add-component">
              <h4>Format:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customFormat">
                <option v-for="format in formats" :key="format">{{ format }}</option>
            </select>
              <h4>Edition:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customEdition">
                <option v-for="edition in editions" :key="edition">{{ edition }}</option>
            </select>
              </div>
            </div>
            <div class="button-container">
              <div class="selected-movie-card-back button" @click="setChosen">BACK</div>
              <div class="add-movie-button button" @click="addToCollection(selectedMovie.imdbID)">ADD</div>
            </div>
            </section>
</template>

<script>
export default {
    name: 'add-selected-movie',
    props: ['selectedMovie'],
    data() {
        return {
        customInput: {
            customSoundtrack: '',
            customShelf: '',
            customRating: '',
            customFormat: '',
            customEdition: ''
        },
        ratings: false
        }
    },
    computed: {   
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
    setChosen() {
      this.$store.commit('setChosen', false);
      this.$store.commit('setInCollection', false);
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
    },
    async addToCollection(id) {
        await this.checkList();
        let payload = {
            id: id,
            shelf: this.customInput.customShelf,
            soundtrack: this.customInput.customSoundtrack,
            rating: this.customInput.customRating,
            format: this.customInput.customFormat,
            edition: this.customInput.customEdition
        }
        await this.$store.dispatch('addToCollection', payload);
        this.$store.commit('setFirstTimeUser', false);
        this.$store.commit('setChosen', false);
    },
  },
}
</script>

<style lang="scss">
  .button-container {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0 !important;
    width: 100%;

    .button {
      margin: 1.5rem 0 .5rem !important;
    }
  }
</style>