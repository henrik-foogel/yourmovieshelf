<template>
    <article :class="lists" >
        <section class="movie-night-section">
            <div class="movie-night-title-div">
                <h1 class="button" @click="openList(lists.name)">{{lists.name}} &#8691;</h1>
                <font-awesome-icon class="movie-night-trash" icon="trash-alt" @click="deleteList(lists.name)" />
            </div>
            <section class="movie-night-list">
            <div :ref="lists.name" class="movie-night-list-div" v-for="(li, index) in lists.movieNightList" :key="index">
                <img :src="li.Poster" alt="" @click="selectMovie(li)">
                    <input class="movie-night-checkbox" type="checkbox" :checked="li.seen" @click="seen(lists.name, lists, index)">
            </div>
            </section>
        </section>
    </article>
</template>

<script>
export default {
    name: 'movie-night-list',
    props: ['lists'],

    data() {
        return {
            openListVar: false,
            listName: '',
        }
    },
    computed: {
       getLists() {
        return this.lists
       }
    },
    methods: {
        openList(info) {
            var refName = this.$refs[info];
            
            if(this.$refs[info][0].style.display != 'flex') {
                refName.forEach(el => {
                    el.style.display = 'flex'
                });
            } else {
                refName.forEach(el => {
                    el.style.display = 'none'
                });
            }
        },
        deleteList(name) {
            this.$store.dispatch('deleteMovieNightList', name);
            this.$store.dispatch('fetchMovieNightLists');
        },
        seen(name, list, index) {
            list.movieNightList[index].seen = !list.movieNightList[index].seen;
            this.$store.dispatch('updateMovieNightList', {name: name, list: list})
        },
        async selectMovie(movie) {
            this.$store.commit('setInCollection', true);
            await this.$store.commit('setSelectedMovie', movie);
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
@import "../scss/variables.scss";
    
</style>