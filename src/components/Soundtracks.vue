<template>
    <article class="soundtracks-comp">
        <searchSavedSoundtrack/>
            <div class="home-movie-random button" @click="randomSoundtrack" v-show="!getSelectedTrueFalse">Random soundtrack</div>
        <section class="soundtracks-list-container">
            <SoundtrackList v-show="!getSelectedTrueFalse" v-for="(soundtrack, index) in filterSoundtracks" :key="index" :soundtrack="soundtrack" />
        </section>
        <selectedSoundtrack v-show="getSelectedTrueFalse"/>
    </article>
</template>
<script>
import SoundtrackList from '@/components/soundtrackList.vue'
import searchSavedSoundtrack from '@/components/searchSavedSoundtracks.vue'
import selectedSoundtrack from '@/components/selectedSoundtrack'

export default {
    name: 'soundtracks-comp',
    components: {
      SoundtrackList,
      searchSavedSoundtrack,
      selectedSoundtrack  
    },
    computed: {
        getSoundtracks() {
            return this.$store.getters.getSoundtrackList;
        },
        filterSoundtracks() {
          return this.getSoundtracks.filter((album) => {
                return album[1].soundtrackTitle.toLowerCase().includes(this.getSearchSavedSoundtracks.toLowerCase());
            });
        },
        getSearchSavedSoundtracks() {
            return this.$store.getters.getSearchSavedSoundtracks;
        },
        getSelectedTrueFalse() {
            return this.$store.getters.getSelectedTrueFalse;
        },
    },
    methods: {
        async randomSoundtrack() {
            let random = Math.floor(Math.random() * Object.keys(this.getSoundtracks).length);
            let soundtrack = this.getSoundtracks[random];
            this.$store.commit('setSelectedSoundtrack', soundtrack[1]);
            this.$store.commit('setSelectedTrueFalse', true);
            this.$store.commit('setSoundtrackInCollection', true);
        },
    },
    async beforeMount() {
      if(this.$store.getters.getUser == '') {
        this.$router.push('/');
      }
      await this.$store.dispatch('fetchYourSoundtracks', this.$store.getters.getUser);
    },
}
</script>

<style lang="scss">
    .soundtracks-comp {
        min-width: 0 !important;
        .soundtracks-list-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>