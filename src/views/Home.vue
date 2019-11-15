<template>
  <main class="home">
    <Home v-show="!getPosterViewTrueFalse"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'home',
  components: {
    Home
  },
  computed: {
    getPosterViewTrueFalse() {
      return this.$store.getters.getPosterViewTrueFalse;
    }
  }
}
</script>
