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
    .movie-night-section {
        max-width: 80vw;
        flex-direction: column;
        display: flex;
        align-items: center;

        .movie-night-title-div {
            display: flex;
            align-items: center;

            h1 {
                font-size: 1.5rem;  
                background: #282828;
                color: #7DC2AF;
                cursor: pointer;
            }

            .movie-night-trash {
                font-size: 2rem;
                color: #282828;
                cursor: pointer;
            }
        }

        .movie-night-list {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;

            .movie-night-list-div {
                display: none;
                flex-direction: column;
                align-items: center;
                background: #282828;
                padding: 0 0 .5rem;
                border-radius: .5rem;
                margin: .5rem;

                img{
                    width: 9rem;
                    border-top-left-radius: .5rem;
                    border-top-right-radius: .5rem;
                    margin: 0;
                    cursor: pointer;
                }

                    input[type='checkbox']{
                    width: 2rem;
                    height: 2rem;
                    margin: .5rem 0 0;
                    cursor: pointer;
                }
            }
        }
    }    
</style>