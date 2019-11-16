<template>
    <section class="selected-sountrack">
         <section class="sountrack-card">
            <div class="selected-soundtrack-button button" @click="setSelectedTrueFalse">Back</div>
            <div class="soundtrack-in-collection soundtrack-collection" v-show="getInCollection">
            <img :src="getSelectedSoundtrack.soundtrackImg" alt="" v-show="getInCollection">
            <h3 class="selected-sountrack-title">
                {{getSelectedSoundtrack.soundtrackTitle}}
            </h3>
            <h4 class="soundtrack-format">{{getSelectedSoundtrack.soundtrackFormat}}</h4>
            </div>
            <div class="soundtrack-not-in-collection soundtrack-collection" v-show="!getInCollection">
            <img :src="getSelectedSoundtrack.cover_image" alt="" v-show="!getInCollection">
            <h3 class="selected-sountrack-title">
                {{getSelectedSoundtrack.title}}
            </h3>
            <h4>Format:</h4>
                <select class="selected-soundtrack-custom-format" v-model="customMusicFormat">
                <option v-for="format in getMusicFormats" :key="format">{{ format }}</option>
            </select>
            <div class="add-soundtrack-button button" @click="saveSoundtrack()">Add</div>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: 'selected-soundtrack',
    data() {
        return {
            customMusicFormat: ''
        }
    },
    computed: {
        getSelectedSoundtrack() {
            return this.$store.getters.getSelectedSoundtrack;
        },
        getMusicFormats() {
            return this.$store.getters.getMusicFormats;
        },
        getInCollection() {
            return this.$store.getters.getSoundtrackInCollection;
        }
    },
    methods: {
        setSelectedTrueFalse() {
            this.$store.commit('setSelectedTrueFalse', false);
        },
        saveSoundtrack() {

            let data = {
                soundtrackImg: this.getSelectedSoundtrack.cover_image,
                soundtrackTitle: this.getSelectedSoundtrack.title,
                soundtrackFormat: this.customMusicFormat
            }
            this.$store.dispatch('addSoundtrackToDB', data);
            this.$store.commit('setSelectedTrueFalse', false);
        }
    }
}
</script>

<style lang="scss">
    @import "@/scss/variables";
    
    .selected-sountrack {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        margin: 2rem;
        padding: 2rem 2rem 2rem;
        background: #fff;
        color: #fff;
        border-radius: 1rem;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
        max-width: 50rem;


        .sountrack-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 1rem 1rem;
            background: rgba(29, 29, 29, 0.842);
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
            border-radius: 1rem;
            
            .selected-soundtrack-button {
                max-width: 2rem;
            }

            .soundtrack-collection {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 20rem;
                    border-radius: .5rem;
                }

                h3 {
                    margin-bottom: 0;
                    max-width: 30rem;
                    text-align: center;
                }

                h4 {
                    margin-bottom: 1rem;
                    text-align: center;
                    color: $main-colour;
                }

                .selected-soundtrack-custom-format {
                    padding: .5rem .2rem;
                    border-radius: .5rem;
                    width: 12rem;
                }
                
            }
            
        }
    }
</style>