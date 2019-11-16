<template>
    <section class="search-bar specific">
      <div class="search-bar-search search-bar-add-soundtrack">
        <div class="search-bar-search-div">
          <i class="fa fa-search" @click="fetchSoundtracks"></i>
          <input  class="search-bar-input artist" type="text" placeholder="artist" v-model="artist" @keyup.enter="fetchSoundtracks"/>
          <font-awesome-icon class="search-remove" icon="times" @click="artist = ''"/>
          <i class="fa fa-search" @click="fetchSoundtracks"></i>
          <input  class="search-bar-input title" type="text" placeholder="title" v-model="title" @keyup.enter="fetchSoundtracks"/>
          <font-awesome-icon class="search-remove" icon="times" @click="title = ''"/>
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

<style lang="scss">
    @import "../scss/variables";

    .search-bar {
    display: flex;
    background: #cbcbcb;
    flex-direction: column;
    max-width: 40rem;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  
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
  
        input {
          width: 100%;
        }
      }
    }
  }


.specific {
  max-width: 40rem;
  border-top: 1px solid #878787;

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