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
        <div class="add-shelf-button button" @click="editOn = true;">Edit</div>
      </div>
    </section>
    <section class="customize-user-custom-container" v-if="editOn == true">
      <div>
      <h2 class="customize-user-custom-title">Your Shelfs:</h2>
      <input type="text" class="customize-user-custom-container-content edit" v-for="(shelf, index) in shelfs" :key="shelf" @change="change($event, index)" v-model="shelfs[index]">
        <div class="add-shelf-button button" @click="editOn = false; saveShelfs()">Save</div>
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
          editOn: false,
          shelfs: null,
          editShelf: '',
          previousShelf: [],
          savedShelfs: false
      }
  },
  computed: {
      getCustomShelfs() {
          return this.$store.getters.getCustomShelfs;
      }
  },
  watch: {
    getCustomShelfs() {
      this.shelfs = this.getCustomShelfs;
    }
  },
  methods: {
      async addShelfToCustomShelfs() {
        await this.$store.dispatch('addShelfToCustomShelfs', this.customShelf);   
        this.customShelf = '';
      },
      
      async saveShelfs() {
        if(this.getCustomShelfs != null) {
          for (let i = 0; i < this.getCustomShelfs.length; i++) {
            if(this.getCustomShelfs[i] != this.$store.getters.getUneditedShelfs[i]) {
              this.$store.commit('setBeforeEditShelfs', this.$store.getters.getUneditedShelfs[i]);
            this.$store.commit('setEditedShelfs', this.getCustomShelfs[i])
          }
        }
          await this.$store.dispatch('editShelfs', this.shelfs);
          this.shelfs = this.getCustomShelfs;
        }
      },

      change(e, i) {
        e.target.parentNode.children[i+1].focus()
      }
  },
  mounted() {
    if(this.$store.getters.getUser == '') {
      this.$router.push('/');
    } else {
      this.shelfs = this.getCustomShelfs;
    }
  }
}
</script>