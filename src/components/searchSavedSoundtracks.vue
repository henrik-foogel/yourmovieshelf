<template>
    <section class="search-bar specific">
      <div class="search-bar-search search-bar-saved-soundtrack">
        <div class="search-bar-search-div">
          <i class="fa fa-search" @click="searchSoundtracks"></i>
          <input  class="search-bar-input artist" type="text" placeholder="search" v-model="search" @keyup.enter="searchSoundtracks"/>
          <font-awesome-icon class="search-remove" icon="times" @click="search = ''"/>
        </div>
      <input type="button" class="home-search-button soundtrack-button" @click="searchSoundtracks" value="Search" alt="Search button">
      </div>
    </section>
</template>

<script>
export default {
    name: 'search-saved',
    data() {
        return {
            search: ''
        }
    },
    computed: {
        getSearch() {
            return this.search;
        }
    },
    watch: {
        getSearch() {
            this.$store.commit('setSearchSavedSoundtracks', this.search)
        }
    },
    methods: {
        searchSoundtracks() {
            this.$store.commit('setSelectedTrueFalse', false);
            this.$store.dispatch('findSoundtrack', this.search);
        }
    }
}
</script>

<style lang="scss">
    .search-bar-saved-soundtrack {
        flex-direction: column;

        .soundtrack-button {
            width: 100%;
        }
    }
</style>