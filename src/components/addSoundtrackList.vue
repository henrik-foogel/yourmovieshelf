<template>
    <article class="soundtrack-list">
        <div class="soundtrack-list-album" v-for="(li, index) in list" :key="index" @click="selectSoundtrack(li)">
            <img :src="li.cover_image" alt="">
            <h5>{{li.title}}</h5>
        </div>
    </article>
</template>

<script>
export default {
    name: 'soundtrack-list',
    props: ['list'],

    methods: {
        selectSoundtrack(li) {
            this.$store.commit('setSelectedSoundtrack', li);
            this.$store.commit('setSelectedTrueFalse', true);
            this.$store.commit('setSoundtrackInCollection', false);
        }
    }
}
</script>
<style lang="scss">
    .soundtrack-list {
        margin-top: 1rem;
        display: flex;
        flex-direction: row !important;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        .soundtrack-list-album {
            display: flex;
            flex-direction: column;
            margin: 1rem;
            background: #fff;
            border-radius: .5rem;
            align-items: center;
            max-width: 12rem;
            text-align: center;
            cursor: pointer;
            img {
                width: 12rem;
                border-top-right-radius: .5rem;
                border-top-left-radius: .5rem;
            }
        }
    }
</style>