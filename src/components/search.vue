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

<style lang="scss">
    @import "../scss/variables";

    .search-bar {
    display: flex;
    background: #cbcbcb;
    flex-direction: column;
    max-width: 40rem;
    border-radius: .5rem;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    margin-top: 1rem;
  
    .search-bar-search {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
  
      .search-bar-search-div {
        display: flex;
        align-items: center;
  
        .fa-search {
          color: #878787;
          margin: .2rem .5rem;
          font-size: 1.5rem;
          cursor: pointer;
        }
  
        .search-bar-input {
          background: none;
          border: 0;
          font-size: 20px;
        }
      }
  
      .fa-times {
        color: #878787;
        font-size: 1.5rem;
        margin: 0 0.5rem;
        cursor: pointer;
      }
  
      &.search-bar-add {
        width: 100%;
      }
    }
  }


.specific {
  max-width: 40rem;

  .search-bar-search {
    
    .search-bar-year-selector {
      background: #cbcbcb;
      border: none;
      border-bottom-right-radius: 0.5rem;
    }
  }
  .home-search-button {
    background: #282828;
    color: $main-colour;
    border: none;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: .5rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      opacity: .9;
    }
  }
}
</style>