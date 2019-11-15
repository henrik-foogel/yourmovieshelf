<template>
    <article class="selected">
      <section class="selected-movie-container">
          <div class="selected-movie-card">
            <img class="selected-movie-img" :src="selectedMovie.Poster" :alt="selectedMovie.Title+' poster'">
            <div class="selected-movie-title"  alt="Title: ">{{ selectedMovie.Title }} (<span alt="Year: ">{{ selectedMovie.Year }}</span>)</div>
            <div class="selected-movie-director" alt="Director: ">{{ selectedMovie.Director }}</div>
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
            <div class="selected-movie-custom-container" v-show="!inCollection">
              <h4>Soundtrack:</h4>
              <input type="text" class="selected-movie-custom-soundtrack" placeholder="Soundtrack" v-model="customInput.customSoundtrack">
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
          </div>
      </section>
  </article>
</template>

<script>
import {fb} from '../../firebase-config'
export default {
    name: 'selected',
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
        this.$router.push('/addmovie');
    },
  },
  beforeMount() {
    this.$store.commit('setSearchResult', '');
    this.$store.commit('setFilterCriteria', '');
    if(!fb.auth().currentUser) {
      this.$router.push('/');
    } else {
      this.$store.dispatch('fetchCustomShelfs', fb.auth().currentUser.uid);
    }
  }
}
</script>