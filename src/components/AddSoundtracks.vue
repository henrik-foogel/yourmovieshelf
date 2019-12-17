<template>
    <article class="add-soundtracks-comp">
      <searchSoundtrack/>
    <h3 class="soundtrack-search-failure" v-show="getSearchFailure">Check your search criteria and try again</h3>
    <section class="soundtracks-list-section">
        <addSoundtrackList v-show="!getSelectedTrueFalse" :list="getSearchResults"></addSoundtrackList>
    </section>
        <selectedSoundtrack class="add-soundtrack-selected" v-show="getSelectedTrueFalse"></selectedSoundtrack>
    </article>
</template>

<script>
import addSoundtrackList from '@/components/addSoundtrackList'
import selectedSoundtrack from '@/components/selectedSoundtrack'
import searchSoundtrack from '@/components/searchSoundtrack'
export default {
    name: 'add-soundtracks',
    components: {
        addSoundtrackList,
        selectedSoundtrack,
        searchSoundtrack
    },
    data() {
        return {
            artist: 'daft punk',
            title: 'tron: legacy',
            searchFailure: false
        }
    },
    computed: {
        getSearchResults() {
            return this.$store.getters.getSoundtrackSearchResult;
    },
        getSelectedTrueFalse() {
            return this.$store.getters.getSelectedTrueFalse;
        },
        getSearchFailure() {
            return this.$store.getters.getSearchFailure;
        },
        getArtistSearch() {
            return this.getSearchSoundtrackArtist;
        },
        getTitleSearch() {
            return this.getSearchSoundtrackTitle;
        }
    },
    async mounted() {
        window.scrollTo(0, 0);
        this.$store.commit('setSoundtrackSearchResult', []);
    }
}
</script>