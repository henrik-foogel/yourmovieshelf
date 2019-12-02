<template>
    <div class="selected-movie-custom-container">
              <h4>Composer:</h4>
              <input type="text" class="selected-movie-custom-soundtrack" placeholder="Composer" v-model="customInput.customSoundtrack">
              <h4>Custom shelf:</h4>
              <select type="text" class="selected-movie-custom-shelf" placeholder="Shelf" v-model="customInput.customShelf">
                <option v-for="shelf in customShelfs" :key="shelf" >{{ shelf }}</option>
              </select>
              <h4>Personal rating:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customRating">
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
              <h4>Format:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customFormat">
                <option v-for="format in formats" :key="format">{{ format }}</option>
            </select>
              <h4>Edition:</h4>
              <select class="selected-movie-custom-rating" v-model.number="customInput.customEdition">
                <option v-for="edition in editions" :key="edition">{{ edition }}</option>
            </select>
              <div class="add-movie-button button" @click="addToCollection(selectedMovie.imdbID)">Add</div>
            </div>
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
    async addToCollection(id) {
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