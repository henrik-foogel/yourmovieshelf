<template>
  <div id="app">
    <nav class="nav-bar">
      <div v-if="!dropdown && checkSignedIn" class="menu-bars" @click="dropdown = !dropdown; signIn = false">&#9776;</div>
      <div v-show="!dropdown && !checkSignedIn" class="menu-bars menu-not-signed-in">&#9776;</div>
      <font-awesome-icon v-show="dropdown" class="menu-close" icon="times" @click="dropdown = !dropdown;"/>
      <router-link to="/">
        <img class="nav-logo" src="./assets/images/Logo.png" alt="Your Movie Shelf" @click="closeSelectedMovie(); dropdown = false" />
      </router-link>
      <div class="nav-lock" alt="Sign In" @click="signIn = !signIn; dropdown = false; register = false" v-if="signIn== false" v-show="checkSignedIn == false"><span>SIGN</span><span>IN</span></div>
      <div class="nav-lock darker" alt="Sign In" @click="closeLoginBox" v-show="signIn == true"><font-awesome-icon icon="times"/></div>
      <div
        class="nav-lock" alt="Sign Out" title="Sign Out" v-show="checkSignedIn == true" @click="userSignOut(); dropdown = false"><span>SIGN</span><span>OUT</span></div>
    </nav>
    <div class="dropdown-container" v-show="dropdown">
      <div class="dropdown">
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/"><span @click="closeSelectedMovie" >My Movie Collection</span></router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/addmovie"><span @click="closeSelectedMovie">Add Movie</span></router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/myshelves">My Shelves</router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/movienight">Movie Night Lists</router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/soundtracks">My Soundtracks</router-link>
        </div>
        <div class="dropdown-link-container" @click="dropdown = !dropdown">
          <router-link to="/addsoundtrack">Add Soundtrack</router-link>
        </div>
      </div>
    </div>
    <div class="sign-in-container" v-show="signIn">
      <div class="sign-in">
        <h4 class="username-text">E-Mail:</h4>
        <input type="e-mail" class="sign-in-email" v-model="email" />
        <h4 class="username-text">Password:</h4>
        <input
          type="password"
          class="sign-in-password"
          v-model="password"
          @keyup.enter="loading = true; userSignIn()"
        />
        <h4 class="username-text" v-show="register">Verify Password:</h4>
        <input
          type="password"
          class="sign-in-password-confirmation"
          v-model="passwordConfirmation"
          v-show="register" @keyup.enter="loading = true; registerWithFirebase()"
        />
        <button
          class="register-button button"
          @click="loading = true; registerWithFirebase()"
          v-show="register"
        >Register</button>
        <button class="sign-in-button button" @click="loading = true; userSignIn()" v-show="!register">Sign In</button>
        <h6 class="login-failure-message" v-show="loginFailure" alt="Failure to login message">{{ failureMessage }}</h6>
        <h6 class="register-message" v-show="!register" alt="Need to register message">
          If you don't have an account, please register
          <span @click="register = true; loginFailureSetter(false)">HERE</span>
        </h6>
        <h6 class="register-message" v-show="register">
          If you already have an account, please sign in
          <span @click="register = false; loginFailureSetter(false)">HERE</span>
        </h6>
        <div class="loading-message" v-show="loading">Signing in...</div>
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
      payload: [],
      email: "",
      password: "",
      passwordConfirmation: "",
      userIsSignedIn: false,
      signedInStorage: "",
      spin: true,
      loading: false
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
    getSignInBox() {
      return this.$store.getters.getSignInBox;
    },
    getRegisterBox() {
      return this.$store.getters.getRegisterBox;
    },
    getSignIn() {
      return this.signIn;
    },
    getRegister() {
      return this.register;
    },
    getMenuDropdown() {
      return this.$store.getters.getMenuDropdown;
    }
  },
  watch: {
    getSignInBox() {
      this.signIn = this.$store.getters.getSignInBox;
    },
    getRegisterBox() {
      this.register = this.$store.getters.getRegisterBox;
    },
    getSignIn() {
      this.$store.commit('setSignInBox', this.signIn);
    },
    getRegister() {
      this.$store.commit('setRegisterBox', this.register);
    },
    getMenuDropdown() {
      this.dropdown = this.$store.getters.getMenuDropdown;
    },
    loginFailure() {
        this.loading = false;
    }
  },
  methods: {
    closeSelectedMovie() {
      this.$store.commit('setInCollection', false);
      this.$store.commit('setChosen', false);
      this.$store.commit('setCloseSelectedMoreWindows', !this.$store.getters.getCloseSelectedMoreWindows);
    },
    loginFailureSetter(e) {
      this.$store.commit('setLoginFailure', e);
    },
    closeLoginBox() {
      this.signIn = !this.signIn; 
      this.register = false; 
      this.dropdown = false;
      this.email = "";
      this.password = "";
      this.$store.commit('setLoginFailure', false);
      this.passwordConfirmation = '';
    },
    async registerWithFirebase() {
      if(this.email.charAt(this.email.length-1) == ' ') {
        this.email = this.email.slice(0, -1);
      }
      await this.payload.push(this.email);
      await this.payload.push(this.password);
      await this.payload.push(this.passwordConfirmation);
      await this.$store.dispatch('registerWithFirebase', this.payload);
      if(this.checkSignedIn == true) {
        this.email = "";
        this.password = "";
        this.signIn = false;
        this.register = false
        this.$store.commit('setSignInBox', false);
      }
    },
    async userSignIn() {
      if(this.email.charAt(this.email.length-1) == ' ') {
        this.email = this.email.slice(0, -1);
      }
      let payload = [];
      payload.push(this.email);
      payload.push(this.password);
      await this.$store.dispatch('userSignIn', payload);
      if(this.checkSignedIn == true) {
        this.email = "";
        this.password = "";
        this.signIn = false;
      } else {
          this.loading = false;
      }
        payload = [];
    },
    async userSignOut() {
      await this.$store.dispatch('userSignOut');
    }
  }
}
</script>

<style lang="sass">
  @import './scss/main.scss';
</style>
