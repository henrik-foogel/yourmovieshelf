<template>
    <section class="home-search-criteria-container">
        <select class="home-search-criteria" v-model="search" label="Search criteria dropdown select"  @change="filterChange">
          <option value="" disabled selected label="Criteria">Criteria</option>
          <option value="" label="All" data-foo="all">All</option>
          <option value="" disabled selected alt="Shelfs">Your shelfs &#8659;</option>
          <option class="shelfs" v-for="shelf in getShelfs" :value="shelf" :key="shelf" :label="shelf" :alt="shelf" data-foo="shelf">{{ shelf }}</option>
          <option value="" disabled selected alt="Formats">Formats &#8659;</option>
          <option class="formats"  v-for="format in getFormats" :value="format" :key="format" :label="format" :alt="format" ref="format" data-foo="format">{{ format }}</option>
          <option value="" disabled selected alt="Editions">Editions &#8659;</option>
          <option class="editions" v-for="edition in getEditions" :value="edition" :key="edition" :label="edition" :alt="edition" ref="edition"  data-foo="edition">{{ edition }}</option>
        </select>
      </section>
</template>

<script>
export default {
    name: 'search-criteria',
    data() {
        return {
            search: ''
        }
    },
    computed: {
      getShelfs() {
          return this.$store.getters.getCustomShelfs;
      },
      getFormats() {
        return this.$store.getters.getFormats;
      },
      getEditions() {
        return this.$store.getters.getEditions;
      },
      getSearch() {
          return this.search;
      }
    },
    watch: {
        getSearch() {
            this.$store.commit('setSearchResult', this.search);
        }
    },
    methods: {
    filterChange(e) {
      this.filterCriteria = e.target.options[e.target.options.selectedIndex].dataset.foo;
      this.$store.commit('setFilterCriteria', this.filterCriteria)
    },
    }
}
</script>

<style lang="scss">
    @import "../scss/variables";

  .home-search-criteria-container {
    .home-search-criteria {
      width: 100%;
      border: none;
      border-radius: 0.3rem;
      background: #282828;
      color: $main-colour;
      font-size: 1rem;
      padding: .5rem;
    }
  }
</style>