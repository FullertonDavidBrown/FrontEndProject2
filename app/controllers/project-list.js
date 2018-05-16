import Controller from '@ember/controller';
//import firebase from 'firebase' //this works but is it where i need it??

//var popRating = document.getElementById("popId");
//var firebasePopularityRef = firebase.database().ref().child("popularity")

export default Controller.extend({
  actions: {
    upVote(){

      //var blogPost = this.get('store').findRecord('blog-post', 1); // => GET /blog-posts/1
      //this.store.findAll('project');
      var popUp = this.store.peekRecord('popularity',1); //output message, "Null"
      //var popUp = this.store.findAll('project') //output a message, "<DS.PromiseArray:ember483>" the number after ember is a allocated value that has nothing to do with the databse from what i can tell.
      //firebase.initializeApp(); //does not give me an undefines message. :)
      alert(popUp); //this still comes up as null.
      alert("upVote");
      this.incrementProperty('popularity');

    },

    downVote(){
      alert("downVote")
      //alert({{project.popularity}})
      this.deincrementProperty('popularity');
    },
  }
});
