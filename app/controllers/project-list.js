import Controller from '@ember/controller';
import firebase from 'firebase'


export default Controller.extend({

actions: {
    upVote(objectID, pop) {
      firebase.database().ref('projects/' + objectID).update({
        popularity: pop + 1
      });
    },
    downVote(objectID, pop) {
      if (pop > 0)
      {
        firebase.database().ref('projects/' + objectID).update({
          popularity: pop - 1
        });
      }
    }
  }

});
