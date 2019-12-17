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