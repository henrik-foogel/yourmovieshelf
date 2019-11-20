<template>
    <article class="selected-sountrack">
         <section class="sountrack-card">
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
            <div class="delete-soundtrack-container" v-show="getInCollection">
            <div class="selected-soundtrack-button button" @click="setSelectedTrueFalse">Back</div>
              <div class="delete-button button" @click="deleteBox = true">Delete</div>
            </div>
        </section>
        <section v-show="deleteBox" class="delete-soundtrack-question-section">
        <div class="delete-container">
          <h5 class="delete-question-title">Are you sure you want to delete this soundtrack?</h5>
          <div class="delete-button-container">
            <div class="delete-button" @click="deleteBox = false">Cancel</div>
            <div class="delete-button" @click="deleteSoundtrackFromList">Yes</div>
          </div>
        </div>
      </section>
    </article>
</template>
<script>
export default {
    name: 'selected-soundtrack',
    data() {
        return {
            customMusicFormat: '',
            deleteBox: false
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
        },
        deleteSoundtrackFromList() {
            this.$store.dispatch('deleteSoundtrack', this.getSelectedSoundtrack);   
            this.deleteBox = false;
            this.setSelectedTrueFalse();
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
        margin: 2rem 10rem;
        padding: 2rem 0;
        background: #fff;
        color: #fff;
        border-radius: 1rem;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
        width: 30rem !important;
        max-width: 100vw !important;
        min-width: 0 !important;


        .sountrack-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 1rem 1rem;
            background: rgba(29, 29, 29, 0.842);
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.30);
            border-radius: 1rem;
            width: 23rem;
            
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
                .delete-soundtrack-container {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                        .delete-button {
                        color: #8d0000;
                        padding-left: .7rem;
                        padding-right: .7rem;
                    }
                }
            
        }
    }
    .delete-soundtrack-question-section {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        width: 100vw;
        padding: 0 0 40rem;

        .delete-container {
            background: $main-colour;
            padding: 1rem;
            border-radius: .5rem;
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            color: #282828;

            h5 {
                font-size: 1rem;
            }

            .delete-button-container {
            display: flex;
            justify-content: flex-end;

            .delete-button {
                background: #282828;
                color: $main-colour;
                padding: .5rem;
                border-radius: .5rem;
                margin: .5rem;
                box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
                cursor: pointer;
            }
        }
    }
}
</style>