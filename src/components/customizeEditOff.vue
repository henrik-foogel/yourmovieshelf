<template>
  <article class="customize-comp">
      <section class="shelf-container">
        <div class="customize-user-custom-container-content" v-for="(shelf, index) in getCustomShelfs" :key="index">
          <div class="shelf-container-shelf">{{shelf}}</div>
          <div class="button-container">
            <font-awesome-icon icon="edit" class="awesome-button" @click="editOn(shelf)"/>
            <font-awesome-icon icon="trash-alt" class="awesome-button" @click="deleteShelf(shelf)"/>
          </div>
        </div>
      </section>
  </article>
</template>

<script>
export default {
    name: 'customize-edit-off',
    data() {
      return {
          customShelf: '',
          editShelf: '',
          previousShelf: [],
          savedShelfs: false
      }
  },
  computed: {
      getCustomShelfs() {
          return this.$store.getters.getCustomShelfs;
      },
      getShelfInUse() {
        return this.$store.getters.getShelfInUse;
      }
  },
  methods: {
      async editOn(shelf) {
        await this.$store.commit('setBeforeEditShelf', shelf);
        this.$store.commit('setShelfEditOnOff', true);
        window.scrollTo(0, 0);
      },
      deleteShelf(shelf) {
        this.$store.commit('setShelfInUse', false);
        this.$store.dispatch('deleteShelf', shelf);
      }
  }
}
</script>