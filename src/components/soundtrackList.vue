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
    },
    mounted() {
        if (localStorage.getItem("loggedIn") != null) {
        this.$store.commit("setSignedIn", true);
        this.$store.dispatch("fetchUserCollection", localStorage.getItem("loggedIn"));
        this.$store.commit("setUser", localStorage.getItem("loggedIn"));
        } else if(sessionStorage.getItem('loggedIn') != null) {
        this.$store.commit("setSignedIn", true);
        this.$store.dispatch("fetchUserCollection", sessionStorage.getItem("loggedIn"));
        this.$store.commit("setUser", sessionStorage.getItem("loggedIn"));
        }
    }
}
</script>
<style lang="scss">
.soundtracks-comp {
    display: flex;
    flex-direction: column;
    align-items: center;
    .soundtrack-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;

        img {
            border-radius: .5rem;
            min-width: 20rem;
            max-width: 20rem;
            cursor: pointer;
        }

        div {
            margin: .5rem;
        }
    }
}
    
</style>