<template>
  <div id="app">
    <nav class="nav-bar">
      <div class="menu-bars" @click="dropdown = !dropdown">&#9776;</div>
      <router-link to="/">
        <img class="nav-logo" @click="home" src="./assets/images/Logo.png" alt="Your Movie Shelf" />
      </router-link>
      <div class="nav-lock" alt="Sign In" @click="signIn = !signIn" v-show="checkSignedIn == false">&#9919;</div>
    </nav>
    <div class="dropdown-container" v-show="dropdown == true">
      <div class="dropdown">
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/">Home</router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/addmovie">Add Movie</router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/customize">Customize</router-link>
        </div>
      </div>
    </div>
    <router-view class="router-view" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: false,
      signIn: false,
      register: false,
      email: "test@test.com",
      password: "testing",
      passwordConfirmation: "",
      userIsSignedIn: false,
      loginFailure: false,
      failureMessage: "",
      signedInStorage: "",
      spin: true
    };
  },
  computed: {
    checkSignedIn () {
      return this.$store.state.checkSignedIn
    }
  },
  methods: {
    home() {
      this.$router.push("/");
    },
  }
}
</script>

<style lang="sass">
  @import './scss/main.scss';
</style>
