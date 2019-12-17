<template>
    <section class="search-bar specific">
      <div class="search-bar-search search-bar-add-soundtrack">
        <div class="search-bar-search-div soundtrack-input">
          <div class="input">
          <font-awesome-icon icon="search" class="fa fa-search" @click="fetchSoundtracks"></font-awesome-icon>
          <input  class="search-bar-input artist" type="text" placeholder="artist" v-model="artist" @keyup.enter="fetchSoundtracks"/>
          <font-awesome-icon class="search-remove" icon="times" @click="artist = ''"/>
          </div>
          <div class="input">
          <font-awesome-icon icon="search" class="fa fa-search" @click="fetchSoundtracks"></font-awesome-icon>
          <input  class="search-bar-input title" type="text" placeholder="title" v-model="title" @keyup.enter="fetchSoundtracks"/>
          <font-awesome-icon class="search-remove" icon="times" @click="title = ''"/>
          </div>
        </div>
      <input type="button" class="home-search-button" @click="fetchSoundtracks" value="Search" alt="Search button">
      </div>
    </section>
</template>

<script>
export default {
    name: 'search-soundtrack',
    data() {
        return {
            artist: '',
            title: ''
        }
    },
    methods: {
      fetchSoundtracks() {
            if(this.artist == '' && this.title == '') {
                this.$store.commit('setSearchFailure', true);
            } else {
                this.$store.commit('setSearchFailure', false);

                let artistReplaced = this.artist.replace(/ /g, "+");
                let titleReplaced = this.title.replace(/ /g, "+");

                let payload = {artist: artistReplaced, title: titleReplaced};
                this.$store.commit('setSelectedTrueFalse', false);
                this.$store.dispatch('findSoundtrack', payload);
            }
        }
    }
}
</script>