<template>
  <article class="customize-comp">
        <section class="edit-shelf-container" >
          <input type="text" class="customize-user-custom-container-content edit" v-model="shelf">
          <div class="add-shelf-button button" @click="saveShelf">Save</div>
        </section>
  </article>
</template>

<script>
export default {
    name: 'customize-edit-on',
    data() {
      return {
          customShelf: '',
          shelf: '',
          editShelf: '',
          previousShelf: [],
          savedShelfs: false
      }
  },
  computed: {
      getShelfInUse() {
        return this.$store.getters.getShelfInUse;
      },
      getBeforeEditShelf() {
        return this.$store.getters.getBeforeEditShelf;
      }
  },
  watch: {
    getBeforeEditShelf() {
      this.shelf = this.$store.getters.getBeforeEditShelf;
    }
  },
  methods: {
      async saveShelf() {
        this.$store.commit('setEditedShelf', this.shelf);
        this.$store.commit('setShelfEditOnOff', false)
        this.$store.dispatch('editShelfs');
      }
  }
}
</script>