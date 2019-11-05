<template>
  <main class="home">
    <Home v-show="!getPosterViewTrueFalse"/>
    <HomePosterView v-show="getPosterViewTrueFalse"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import HomePosterView from '@/components/HomePosterView.vue'

export default {
  name: 'home',
  components: {
    Home,
    HomePosterView
  },
  computed: {
    getPosterViewTrueFalse() {
      return this.$store.getters.getPosterViewTrueFalse;
    }
  }
}
</script>
