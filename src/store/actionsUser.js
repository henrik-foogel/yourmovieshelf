import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";

export const actions = {
    async registerWithFirebase(ctx, payload) {
        if (payload[1] == payload[2]) {
          fb.auth()
            .createUserWithEmailAndPassword(payload[0], payload[1])
            .then(response => {
              ctx.dispatch("createUserCollection", response);
              console.log(response);
              ctx.dispatch('userSignIn', payload);
            })
            .catch(error => {
              ctx.commit('setLoginFailure', true);
              ctx.commit('setFailureMessage', error.message);
              console.log(error);
            });
        } else {
          ctx.commit('setLoginFailure', true);
          ctx.commit('setFailureMessage', "Password doesn't match, please try again");
        }
      },
      async createUserCollection(ctx, response) {
        await db.collection(response.user.uid).add({
          userEmail: response.user.email
        });
      },
      async userSignIn(ctx, payload) {
        await fb
        .auth()
        .signInWithEmailAndPassword(payload[0], payload[1])
        .then(response => {
          ctx.dispatch("fetchUserCollection", response.user.uid);
          ctx.userCollection = ctx.getters.getUserCollection;
          ctx.commit("setUser", response.user.uid);
          ctx.commit('setSignedIn', true);
          if(payload[2] == true) {
            ctx.commit('setKeepSignedIn', true);
            localStorage.setItem("loggedIn", response.user.uid);
          } else {
            ctx.commit('setKeepSignedIn', false);
            sessionStorage.setItem('loggedIn', response.user.uid);
          }
          ctx.dispatch("fetchCustomShelfs");
          ctx.dispatch('fetchMovieNightLists', response.user.uid)
        })
        .catch(error => {
          this.loginFailure = true;
          this.failureMessage = error.message;
          console.log(error);
        });
      },
      async userSignOut(ctx) {
        await fb.auth()
          .signOut()
          .then(() => {
            ctx.commit('setSignedIn', false);
            localStorage.removeItem("loggedIn");
            sessionStorage.removeItem("loggedIn");
            ctx.commit('setSignedInStorage', "");
          });
      },

}