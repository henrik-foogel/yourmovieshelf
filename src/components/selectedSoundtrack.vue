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
                <div class="add-button-container">
                    <div class="selected-soundtrack-button button" @click="setSelectedTrueFalse">BACK</div>
                    <div class="add-soundtrack-button button" @click="saveSoundtrack()">ADD</div>
                </div>
            </div>
            <div class="delete-soundtrack-container" v-show="getInCollection">
            <div class="selected-soundtrack-button button" @click="setSelectedTrueFalse">BACK</div>
              <font-awesome-icon icon="trash-alt" class="trash-button button" @click="deleteBox = true">DELETE</font-awesome-icon>
            </div>
        </section>
        <section v-show="deleteBox" class="delete-soundtrack-question-section">
        <div class="delete-container">
          <h5 class="delete-question-title">Are you sure you want to delete this soundtrack?</h5>
          <div class="delete-button-container">
            <div class="delete-button" @click="deleteBox = false">CANCEL</div>
            <div class="delete-button" @click="deleteSoundtrackFromList">YES</div>
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
            this.$store.commit('setInCollection', false);
        },
        saveSoundtrack() {
            let data = {
                soundtrackImg: this.getSelectedSoundtrack.cover_image,
                soundtrackTitle: this.getSelectedSoundtrack.title,
                soundtrackFormat: this.customMusicFormat
            }
            this.$store.dispatch('addSoundtrackToDB', data);
            this.$store.commit('setSelectedTrueFalse', false);

            this.customMusicFormat = '';
        },
        deleteSoundtrackFromList() {
            this.$store.dispatch('deleteSoundtrack', this.getSelectedSoundtrack);   
            this.deleteBox = false;
            this.setSelectedTrueFalse();
        }
    },
    mounted() {
        this.$store.commit('setSelectedTrueFalse', false);
        this.$store.commit('setInCollection', false);
    }
}
</script>
