<template>
    <article class="soundtracks-comp">
        <searchSavedSoundtrack class="search-soundtrack"/>
            <div class="home-movie-random button" @click="randomSoundtrack" >Random soundtrack</div>
        <section class="soundtracks-list-container">
            <soundtrackList v-for="(soundtrack, index) in filterSoundtracks" :key="index" :soundtrack="soundtrack" />
        </section>
        <selectedSoundtrack class="soundtracks-selected" v-show="getSelectedTrueFalse"/>
    </article>
</template>
<script>
import soundtrackList from '@/components/soundtrackList.vue'
import searchSavedSoundtrack from '@/components/searchSavedSoundtracks.vue'
import selectedSoundtrack from '@/components/selectedSoundtrack'

export default {
    name: 'soundtracks-comp',
    components: {
      soundtrackList,
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
    async mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
