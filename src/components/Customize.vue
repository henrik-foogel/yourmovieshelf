<template>
  <article class="customize-comp">
    <section class="customize-container" v-show="getShelfEditOnOff == false" >
        <h1 class="customize-container-input-text">Custom shelf:</h1>
        <input class="customize-container-input-shelf" placeholder="Shelf" v-model="customShelf" @keyup.enter="addShelfToCustomShelfs()" label="Add custom shelf input">
        <div class="add-shelf-button button" @click="addShelfToCustomShelfs">Add</div>
    </section>
      <div class="in-use-container" v-show="getShelfInUse" @click="inUseBoxOff"><h3>The shelf is being used<br>you need to edit the movies in question first</h3></div>
    <editOff v-show="getShelfEditOnOff == false" />
    <editOn v-show="getShelfEditOnOff == true" />
  </article>
</template>

<script>
import editOff from '@/components/customizeEditOff'
import editOn from '@/components/customizeEditOn'
export default {
    name: 'customize',
    components: {
      editOff,
      editOn
    },
    data() {
      return {
          customShelf: ''
      }
  },
  computed: {
      getCustomShelfs() {
          return this.$store.getters.getCustomShelfs;
      },
      getShelfInUse() {
        return this.$store.getters.getShelfInUse;
      },
      getShelfEditOnOff() {
        return this.$store.getters.getShelfEditOnOff
      }
  },
  methods: {
      async addShelfToCustomShelfs() {
        await this.$store.dispatch('addShelfToCustomShelfs', this.customShelf);   
        this.customShelf = '';
      },
      inUseBoxOff() {
        this.$store.commit('setShelfInUse', false);
      }
  },
  async mounted() {
    this.$store.commit('setShelfInUse', false);
    this.$store.commit('setShelfEditOnOff', false);
    window.scrollTo(0, 0);
  }
}
</script>