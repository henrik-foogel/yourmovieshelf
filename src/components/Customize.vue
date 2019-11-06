<template>
  <article class="customize-comp">
    <section class="customize-container">
        <h1 class="customize-container-input-text">Custom shelf:</h1>
        <input class="customize-container-input-shelf" placeholder="Shelf" v-model="customShelf" @keyup.enter="addShelfToCustomShelfs()" label="Add custom shelf input">
        <div class="add-shelf-button button" @click="addShelfToCustomShelfs()">Add</div>
    </section>
    <section class="customize-user-custom-container" v-if="editOn == false">
      <div>
      <h2 class="customize-user-custom-title">Your Shelfs:</h2>
      <div class="customize-user-custom-container-content" v-for="shelf in getCustomShelfs" :key="shelf">
        {{shelf}}
      </div>
        <div class="add-shelf-button button" @click="editOn = true, editShelf">Edit</div>
      </div>
    </section>
    <section class="customize-user-custom-container" v-if="editOn == true">
      <div>
      <h2 class="customize-user-custom-title">Your Shelfs:</h2>
      <input type="text" class="customize-user-custom-container-content edit" v-for="shelf in getCustomShelfs" :key="shelf" :value="shelf">
        <div class="add-shelf-button button" @click="editOn = false, editShelf">Save</div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
    name: 'customize',
    data() {
      return {
          customShelf: '',
          editOn: false
      }
  },
  computed: {
      getCustomShelfs() {
          return this.$store.getters.getCustomShelfs;
      }
  },
  methods: {
      async addShelfToCustomShelfs() {
        await this.$store.dispatch('addShelfToCustomShelfs', this.customShelf);
          
        this.customShelf = '';
      },
      
      editShelf(shelf) {
          console.log(shelf);
      }
  }
}
</script>