<template>
    <article>
        <input type="button" @click="manuallyAdd" class="manually-input button" value="MANUAL INPUT">
        <section class="add-search-result-to-many-alert" v-show="!getAlertWindowClosed || getResponse == 'False'">
        <div class="add-search-result-to-many-alert-text">
            <div class="add-search-result-to-many-alert-close-div">
            <i class="fa fa-times" aria-hidden="true" @click="alertWindowClosed()"></i>
            </div>
            <h2>Too Many Search Results<br>or it's not part of the database</h2>
            <h4>Please choose a year to narrow down result<br>or add it manually</h4>
        </div>
        </section>
        <section v-if="getResponse != 'False'" class="add-search-result">
        <div class="add-search-result-movie" v-for="(movie, index) in searchResult" :key="index" @click="imdbID = movie.imdbID; selectMovie(movie, movie.imdbID)">
            <img v-if="movie.Poster != 'N/A'" :src="movie.Poster" alt="Movie poster">
            <img v-if="movie.Poster == 'N/A'" src="../assets/images/noposter.png" alt="Movie poster">
            <h4>{{ movie.Title }}(<span>{{ movie.Year }}</span>)</h4>
        </div>
        </section>
    </article>
</template>

<script>
export default {
    name: 'add-movie-search',
    data() {
        return {
        }
    },
    computed: {
        searchResult() {
        return this.$store.getters.getSearchResult;
        },
        getAlertWindowClosed() {
            return this.$store.getters.getAlertWindowClosed;
        },
        getResponse() {
            return this.$store.getters.getSearchResponse;
        }
    },
    methods: {
        async selectMovie(movie, id) {
        let movieArr = {
            shelf: 'none',
            soundtrack: 'somebody',
            rating: '0',
            format: 'something',
            edition: 'something'
        }
        let inCollection = false;
        let payload = {movieArr, id};
        this.$store.commit('setInCollection', inCollection);
        this.$store.dispatch('fetchMovieById', payload);
        this.$store.commit('setChosen', true);
        },
        alertWindowClosed() {
            this.$store.commit('setAlertWindowClosed', true);
        },
        manuallyAdd() {
            this.$store.commit('setManuallyAdd', true);
        }
    }
}
</script>