<template>
    <article class="soundtracks-comp">
        <section class="soundtrack-section">
            <img :src="soundtrack[1].soundtrackImg" :alt="soundtrack[1].soundtrackTitle+' soundtrack'" @click="selectSoundtrack(soundtrack[1])">
        </section>
    </article>
</template>
<script>
export default {
    name: 'soundtracks-comp',
    props: ['soundtrack'],
    methods: {
        selectSoundtrack(soundtrack) {
            this.$store.commit('setSelectedSoundtrack', soundtrack);
            this.$store.commit('setSelectedTrueFalse', true);
            this.$store.commit('setSoundtrackInCollection', true);
        }
    }
}
</script>