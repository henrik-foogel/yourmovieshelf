import { db } from "../../firebase-config";
import { fb } from "../../firebase-config";

export const actions = {    
    async fetchCustomShelfs(ctx) {
        let shelfs = '';
          shelfs = await db.collection(ctx.getters.getUser).get();
        let respArr = [];
        shelfs.forEach(doc => {
          if(hasOwnProperty.call(doc.data(), 'userEmail')) {
            respArr.push(doc.data())
          } else {
            return
          }
      })
      let customShelfs = respArr[0].customShelf.sort((a, b) => (a > b) ? 1 : -1);
        ctx.commit('setCustomShelfs', customShelfs);
      },

      async addShelfToCustomShelfs(ctx, newShelf) {
        var docRef = await db.collection(fb.auth().currentUser.uid).doc(ctx.getters.getEmailDocumentId);
        let shelf = newShelf;
        await docRef.get().then(function(doc) {
          if (doc.data().customShelf != undefined) {
              let dataArr = [];
              if(Array.isArray(doc.data().customShelf)) {
                doc.data().customShelf.forEach(shelf => {
                  dataArr.push(shelf);
                });
              } else {
                dataArr.push(doc.data().customShelf);
              }
              dataArr.push(shelf);
              let data = {
                customShelf: dataArr
                };
              docRef.update(data);

              ctx.dispatch('fetchCustomShelfs');
          } else {
              let data = [];
              data.push(shelf);
              docRef.update({customShelf: shelf});
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
        
      },
      async editShelfs(ctx, shelfs) {
        var docRef = await db.collection(fb.auth().currentUser.uid).doc(ctx.getters.getEmailDocumentId);
        docRef.update({customShelf: shelfs});
        ctx.commit('setCustomShelfs', shelfs);
      },
}