<template>
  <div id="app">
    <nav class="nav-bar">
      <div class="menu-bars" @click="dropdown = !dropdown">&#9776;</div>
      <router-link to="/">
        <img class="nav-logo" src="./assets/images/Logo.png" alt="Your Movie Shelf" />
      </router-link>
      <div class="nav-lock" alt="Sign In" @click="signIn = !signIn" v-show="checkSignedIn == false">&#9919;</div>
      <div
        class="nav-lock" alt="Sign Out" title="Sign Out" v-show="checkSignedIn == true" @click="userSignOut">X</div>
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
    <div class="sign-in-container" v-show="signIn">
      <div class="sign-in">
        <h4 class="username-text">E-Mail:</h4>
        <input type="text" class="sign-in-email" v-model="email" />
        <h4 class="username-text">Password:</h4>
        <input
          type="password"
          class="sign-in-password"
          v-model="password"
          @keyup.enter="userSignIn"
        />
        <h4 class="username-text" v-show="register">Verify Password:</h4>
        <input
          type="password"
          class="sign-in-password-confirmation"
          v-model="passwordConfirmation"
          v-show="register"
        />
        <button
          class="register-button button"
          @click="registerWithFirebase"
          v-show="register"
        >Register</button>
        <button class="sign-in-button button" @click="userSignIn" v-show="!register">Sign In</button>
        <h6 class="login-failure-message" v-show="loginFailure" alt="Failure to login message">{{ failureMessage }}</h6>
        <h6 class="register-message" v-show="!register" alt="Need to register message">
          If you don't have an account, please register
          <span @click="register = true; loginFailure = false">HERE</span>
        </h6>
        <h6 class="register-message" v-show="register">
          If you already have an account, please sign in
          <span @click="register = false; loginFailure = false">HERE</span>
        </h6>
      </div>
    </div>
    <router-view class="router-view" />
  </div>
</template>

<script>
// import { fb } from "../firebase-config";
// import { db } from "./firebase-config";
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
      signedInStorage: "",
      spin: true,
      payload: []
    };
  },
  computed: {
    checkSignedIn() {
      return this.$store.getters.getSignedIn
    },
    loginFailure() {
      return this.$store.getters.getLoginFailure;
    },
    failureMessage() {
      return this.$store.getters.getFailureMessage;
    },
  },
  methods: {
    async registerWithFirebase() {
      this.payload.push(this.email);
      this.payload.push(this.password);
      this.payload.push(this.passwordConfirmation);
      await this.$store.dispatch('registerWithFirebase', this.payload);
      if(this.checkSignedIn == true) {
        this.email = "";
        this.password = "";
        this.signIn = false;
      }
    },
    async userSignIn() {
      this.payload.push(this.email);
      this.payload.push(this.password);
      await this.$store.dispatch('userSignIn', this.payload);
      if(this.checkSignedIn == true) {
        this.email = "";
        this.password = "";
        this.signIn = false;
      }
    },
    async userSignOut() {
      await this.$store.dispatch('userSignOut');
      if(this.checkSignedIn == false) {
          this.$router.go();
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem("loggedIn") != null) {
      this.$store.commit("setSignedIn", true);
      this.$store.dispatch("fetchUserCollection", localStorage.getItem("loggedIn"));
      this.$store.commit("setUser", localStorage.getItem("loggedIn"));
    } 
  }
}
</script>

<style lang="sass">
  @import './scss/main.scss';
</style>
