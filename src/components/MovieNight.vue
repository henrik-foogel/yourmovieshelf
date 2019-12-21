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
  
  async mounted() {
    window.scrollTo(0, 0)
  }
}
</script>

