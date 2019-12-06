<template>
  <article class="movie-night-comp">
    <section class="movie-night-section">
      <movieNightList v-for="lists in getMovieNightList" :key="lists.id" :lists="lists"/>
    </section>
  </article>
</template>

<script>
import movieNightList from '@/components/movieNightList.vue'
export default {
  name: 'movie-night',
  components: {
    movieNightList
  },

  computed: {
    getMovieNightList() {
      return this.$store.getters.getMovieNightListFromDB;
    }
  },
  
  methods: {
    async fetchMovieNightList() {
    await this.$store.dispatch('fetchMovieNightLists', this.$store.getters.getUser)
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    if(this.$store.getters.getUser == '') {
      this.$router.push('/');
    }
    this.fetchMovieNightList()
  }
}
</script>

