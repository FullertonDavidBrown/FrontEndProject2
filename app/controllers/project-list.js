import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    upVote(){
      this.incrementProperty('popularity');
    }
  }
});
