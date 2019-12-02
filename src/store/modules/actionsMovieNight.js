import { db } from "../../../firebase-config";
import { fb } from "../../../firebase-config";

export const actions = {    
    async addMovieNightList(ctx, payload) {
        var docRef = await db.collection(fb.auth().currentUser.uid);
        var data = [];
        var name = payload.name
        payload.list.map(movie => movie[0].seen = false);
        payload.list.forEach(movie => {
          data.push(movie[0])
        });
        await docRef.add({
          movieNightList: data,
          name: name,
        })
        
      },
      async fetchMovieNightLists(ctx, user) {
        if(user != '') {
        let collection = await db.collection(user).get();
        let respArr = [];
        collection.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'movieNightList')) {
            respArr.push(doc.data())
          } else {
            return
          }
      });
      ctx.commit('setMovieNightListFromDB', respArr)
      }
    },
    async deleteMovieNightList(ctx, name) {
      await db.collection(ctx.getters.getUser).where('name', '==', name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).delete()
        );
      })
    },
    async updateMovieNightList(ctx, payload) {
      await db.collection(ctx.getters.getUser).where('name', '==', payload.name).get().then(snap => {
        snap.forEach(doc => 
          db.collection(ctx.getters.getUser).doc(doc.id).set(payload.list)
        );
      })
    },
}