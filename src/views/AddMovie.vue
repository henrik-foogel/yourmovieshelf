<template>
  <main class="add">
    <AddMovie/>
  </main>
</template>
<script>
// @ is an alias to /src
import AddMovie from '@/components/AddMovie.vue'

export default {
  name: 'addmovie',
  components: {
    AddMovie
  }
}
</script>