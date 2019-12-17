<template>
    <section class="search-bar">
      <div class="search-bar-search">
      <div class="search-bar-search-div">
        <font-awesome-icon icon="search" class="fa fa-search"></font-awesome-icon>
        <input class="search-bar-input" type="text" v-model="search" placeholder="search" label="Search input field" @change="searchChange" @keyup.enter="changeView">
      </div>
      <font-awesome-icon icon="times" class="fa fa-times" aria-hidden="true" @click="removeSearchCriteria"></font-awesome-icon>
      </div>
    </section>
</template>

<script>
export default {
    name: 'search',
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
            this.$store.commit('setSearchResult', this.search);
            this.$store.getters.getMovieNightList.forEach(m => {
                if(document.querySelector('#'+m[0].imdbID) != null || document.querySelector('#'+m[0].imdbID+'poster') != null) {
                    document.querySelector('#'+m[0].imdbID).style.opacity = '.5'
                    document.querySelector('#'+m[0].imdbID).style.boxShadow = "inset 0 0 10px #000000"
                    document.querySelector('#'+m[0].imdbID+'poster').style.opacity = '.5'
                    document.querySelector('#'+m[0].imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000"
                }
        });
        }
    },
    methods: {
      searchChange() {
        this.$store.getters.getMovieNightList.forEach(m => {
           if(document.querySelector('#'+m[0].imdbID) != null || document.querySelector('#'+m[0].imdbID+'poster') != null) {
            document.querySelector('#'+m[0].imdbID).style.opacity = '.5'
            document.querySelector('#'+m[0].imdbID).style.boxShadow = "inset 0 0 10px #000000"
            document.querySelector('#'+m[0].imdbID+'poster').style.opacity = '.5'
            document.querySelector('#'+m[0].imdbID+'poster').style.boxShadow = "inset 0 0 10px #000000"
          }
        });
      },
      changeView() {
        this.$store.commit('setInCollection', false);
      },
      removeSearchCriteria() {
        this.search = '';
        this.filterCriteria = 'all'
        window.scrollTo(0, 0);
      }
    }
}
</script>
